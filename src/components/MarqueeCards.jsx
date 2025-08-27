import React, {
  useMemo,
  useRef,
  useEffect,
  useState,
  useLayoutEffect,
} from "react";

/**
 * Swipeable, seamless marquee with momentum.
 * Props:
 * - items: any[]
 * - renderItem: (item, index) => ReactNode
 * - speed: number  // pixels per second
 * - gap: number    // px between cards
 * - direction: 'left' | 'right'
 * - pauseOnHover: boolean
 */
const MarqueeCards = ({
  items = [],
  renderItem,
  speed = 150,
  gap = 24,
  direction = "left",
  pauseOnHover = true,
}) => {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);

  // Position of the track in px (we translateX(posPx))
  const posRef = useRef(0);
  // Velocity used for momentum when you release (px/s)
  const velRef = useRef(0);
  // Track half-width in px (the length of one full list)
  const halfWRef = useRef(0);
  // RAF bookkeeping
  const rafRef = useRef(null);
  const lastTsRef = useRef(0);
  // Drag state
  const draggingRef = useRef(false);
  const lastClientXRef = useRef(0);
  const pausedRef = useRef(false);

  const dirSign = direction === "left" ? -1 : 1;

  // duplicate list so loop looks seamless
  const doubled = useMemo(() => [...items, ...items], [items]);

  // Measure the scrollable width for one full list (half the doubled track)
  const measure = () => {
    const el = trackRef.current;
    if (!el) return;
    const full = el.scrollWidth; // total width of doubled items
    halfWRef.current = full / 2 || 0;
  };

  useLayoutEffect(() => {
    measure();
    // Re-measure when content/images/fonts settle
  }, [items, gap]);

  useEffect(() => {
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(() => measure());
    if (trackRef.current) ro.observe(trackRef.current);
    return () => {
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, []);

  // Hover pause (desktop)
  useEffect(() => {
    if (!pauseOnHover) return;
    const el = wrapperRef.current;
    if (!el) return;
    const onEnter = () => (pausedRef.current = true);
    const onLeave = () => (pausedRef.current = false);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [pauseOnHover]);

  // Pointer events for swipe/drag (works for mouse + touch)
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const onPointerDown = (e) => {
      e.preventDefault();
      el.setPointerCapture?.(e.pointerId);
      draggingRef.current = true;
      pausedRef.current = true; // pause the auto-scroll while dragging
      lastClientXRef.current = e.clientX ?? (e.touches?.[0]?.clientX || 0);
      velRef.current = 0; // reset fling vel
    };

    const onPointerMove = (e) => {
      if (!draggingRef.current) return;
      const x =
        e.clientX ?? (e.touches?.[0]?.clientX || lastClientXRef.current);
      const dx = x - lastClientXRef.current;
      lastClientXRef.current = x;

      // Update position directly by delta (drag)
      posRef.current += dx;

      // Update instantaneous velocity for momentum (px/ms => px/s)
      // We'll read dt from RAF; here we approximate based on 16ms/frame
      velRef.current = dx * 60; // ~frames per second factor
    };

    const onPointerUp = (e) => {
      draggingRef.current = false;
      // Start momentum: unpause but keep velocity; RAF loop applies friction
      pausedRef.current = false;
      el.releasePointerCapture?.(e.pointerId);
    };

    // Unify mouse/touch/pointer
    el.addEventListener("pointerdown", onPointerDown, { passive: false });
    window.addEventListener("pointermove", onPointerMove, { passive: false });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerUp, { passive: true });

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  // Main animation loop (auto-scroll + momentum + wrap-around)
  useEffect(() => {
    const step = (ts) => {
      if (!lastTsRef.current) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000; // seconds
      lastTsRef.current = ts;

      const track = trackRef.current;
      const half = halfWRef.current || 0;
      if (track && half > 0) {
        let pos = posRef.current;

        // Auto scroll (if not paused and not dragging): speed px/s
        if (!pausedRef.current && !draggingRef.current) {
          pos += dirSign * speed * dt;
        }

        // Apply momentum if we have velocity (px/s)
        if (!draggingRef.current && Math.abs(velRef.current) > 1) {
          pos += velRef.current * dt;
          // Apply friction (tweak 0.9..0.98 for feel)
          velRef.current *= 0.95;
        }

        // Wrap-around to keep pos within [-half, 0) range (or any stable range)
        // This keeps the seam invisible by using the doubled content.
        if (half > 0) {
          // Keep pos between -half and 0 (exclusive of 0 to avoid a tiny jump)
          if (pos <= -half) pos += half;
          else if (pos > 0) pos -= half;
        }

        // Commit
        posRef.current = pos;
        track.style.transform = `translateX(${pos}px)`;
        track.style.gap = `${gap}px`;
        track.style.paddingRight = `${gap}px`;
        track.style.willChange = "transform";
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [speed, gap, direction]);

  return (
    <div
      ref={wrapperRef}
      className="relative overflow-hidden w-full"
      style={{ contain: "content", touchAction: "pan-y" }} // allow vertical scroll, we handle horizontal
    >
      <div
        ref={trackRef}
        className="inline-flex"
        // transform is controlled via JS for smooth mix of auto + drag + inertia
      >
        {useMemo(
          () =>
            doubled.map((item, i) => (
              <div
                key={`${i}-${item?.title || "card"}`}
                className="shrink-0"
                style={{ marginRight: i === doubled.length - 1 ? 0 : gap }}
              >
                {renderItem ? renderItem(item, i % items.length) : null}
              </div>
            )),
          [doubled, items.length, renderItem, gap]
        )}
      </div>
    </div>
  );
};

export default MarqueeCards;
