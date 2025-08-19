import { useLayoutEffect, useRef, createContext, useContext } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap-trial/ScrollSmoother"; // swap to club build later

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const SmootherCtx = createContext(null);
export const useSmoother = () => useContext(SmootherCtx);

// A tiny helper so you can write <Parallax speed={0.85}>...</Parallax>
export function Parallax({ speed, lag, as: Tag = "div", children, ...rest }) {
  return (
    <Tag data-speed={speed} data-lag={lag} {...rest}>
      {children}
    </Tag>
  );
}

export default function SmoothScroll({ children }) {
  const smootherRef = useRef(null);

  useLayoutEffect(() => {
    ScrollSmoother.get()?.kill(); // hot-reload safety
    smootherRef.current = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2,
      effects: true,             // enables data-speed / data-lag
      normalizeScroll: true,
      ignoreMobileResize: true,
      // smoothTouch: false,      // uncomment to disable on touch
    });
    return () => smootherRef.current?.kill();
  }, []);

  return (
    <SmootherCtx.Provider value={smootherRef}>
      <div id="smooth-wrapper" className="overflow-hidden">
        <div id="smooth-content">{children}</div>
      </div>
    </SmootherCtx.Provider>
  );
}
