import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Minus } from "lucide-react";
import GradientText from "./GradientText";

/**
 * ChatWidget.jsx — Dark Purple Theme (GradientText avatar)
 *
 * Colors:
 * - Background: #162032
 * - Text: #ffffff
 * - Button: #8936eb
 */
export default function ChatWidget({
  agentName = "Jek",
  subtitle = "Online",
  logoText = "JT", // <-- shown in GradientText
  welcome = "Hi there! 👋 Thanks for visiting. Ask me anything about programming, web dev, or my projects.",
  placeholder = "Type a message…",
  maxChars = 1000,
  position = "right", // "right" | "left"
  storageKey = "jek_chat_session",
}) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState(() => [
    { id: nid(), who: "bot", text: welcome, at: Date.now() },
  ]);
  const [typing, setTyping] = useState(false);
  const [minimized, setMinimized] = useState(false);

  const inputRef = useRef(null);
  const logRef = useRef(null);

  useEffect(() => {
    if (open && !minimized) inputRef.current?.focus();
  }, [open, minimized]);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  const canSend = text.trim().length > 0 && text.length <= maxChars && !typing;
  const dockSide = position === "left" ? "left-5" : "right-5";

  const panelMotion = useMemo(
    () => ({
      initial: { opacity: 0, y: 24, scale: 0.98 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: 24, scale: 0.98 },
      transition: { type: "spring", stiffness: 360, damping: 32 },
    }),
    []
  );

  function nid() {
    return Math.random().toString(36).slice(2);
  }
  function stamp(t) {
    return new Date(t).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  async function sendToApi(message) {
    const r = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, session: getSessionId(storageKey) }),
    });
    const raw = await r.text();
    if (!r.ok) throw new Error(`API ${r.status}: ${raw}`);
    try {
      const data = JSON.parse(raw);
      return data.reply ?? "(No reply)";
    } catch {
      return raw || "(No reply)";
    }
  }

  async function handleSend() {
    const value = text.trim();
    if (!value) return;
    setText("");
    const now = Date.now();
    setMsgs((m) => [...m, { id: nid(), who: "user", text: value, at: now }]);
    setTyping(true);
    try {
      const reply = await sendToApi(value);
      setMsgs((m) => [
        ...m,
        { id: nid(), who: "bot", text: reply, at: Date.now() },
      ]);
    } catch (e) {
      setMsgs((m) => [
        ...m,
        { id: nid(), who: "bot", text: `Oops! ${e.message}.`, at: Date.now() },
      ]);
    } finally {
      setTyping(false);
    }
  }

  return (
    <>
      {/* Floating Launcher */}
      <button
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => {
          setOpen(true);
          setMinimized(false);
        }}
        className={`fixed bottom-5 ${dockSide} z-[9999] inline-flex items-center gap-2 rounded-full bg-[#8936eb] px-4 py-2 shadow-lg hover:scale-105 transition`}
      >
        <span className="inline-grid h-7 w-7 place-items-center rounded-full bg-white/10 text-white">
          <MessageSquare size={16} />
        </span>
        <span className="text-sm font-semibold text-white">
          Chat with {agentName}
        </span>
      </button>

      {/* Docked Panel */}
      <AnimatePresence>
        {open && (
          <motion.section
            key="panel"
            role="dialog"
            aria-label={`Chat with ${agentName}`}
            {...panelMotion}
            className={`fixed bottom-[92px] ${dockSide} z-[10000] flex h-[600px] w-[420px] flex-col overflow-hidden rounded-2xl border border-[#8936eb]/30 bg-[#162032] shadow-xl backdrop-blur-xl`}
          >
            {/* Header */}
            <header className="flex items-center justify-between border-b border-[#8936eb]/30 bg-[#162032] px-4 py-3">
              <div className="flex items-center gap-3">
                {/* GradientText "avatar" */}
                <div className="flex items-center justify-center h-9 w-9 rounded-full bg-[#10182a] ring-1 ring-[#8936eb]/30">
                  <GradientText
                    colors={[
                      "#c084fc",
                      "#ffffff",
                      "#a855f7",
                      "#ffffff",
                      "#c084fc",
                    ]}
                    animationSpeed={3}
                    className="text-base font-bold leading-none"
                  >
                    {logoText}
                  </GradientText>
                </div>

                <div className="flex flex-col">
                  <div className="text-sm font-semibold text-white">
                    Chat with {agentName}
                  </div>
                  <div className="text-[11px] font-medium text-green-400">
                    {subtitle}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  aria-label="Minimize chat"
                  onClick={() => setMinimized((v) => !v)}
                  className="rounded-md p-1.5 text-gray-400 hover:text-white"
                  title="Minimize"
                >
                  <Minus size={18} />
                </button>
                <button
                  aria-label="Close chat"
                  onClick={() => setOpen(false)}
                  className="rounded-md p-1.5 text-gray-400 hover:text-white"
                  title="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </header>

            {/* Collapsible content */}
            <AnimatePresence initial={false}>
              {!minimized && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="flex flex-1 flex-col"
                >
                  {/* Log */}
                  <div
                    ref={logRef}
                    className="flex-1 space-y-3 overflow-y-auto p-4 [scrollbar-width:thin] [scrollbar-color:#475569_transparent]"
                  >
                    {msgs.map((m) => (
                      <div
                        key={m.id}
                        className={`flex ${
                          m.who === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow ${
                            m.who === "user"
                              ? "bg-[#8936eb] text-white"
                              : "bg-[#1e293b] text-white"
                          }`}
                        >
                          <div>{m.text}</div>
                          <div className="mt-1 text-[10px] text-gray-400">
                            {stamp(m.at)}
                          </div>
                        </div>
                      </div>
                    ))}
                    {typing && (
                      <div className="flex justify-start">
                        <div className="max-w-[80%] rounded-2xl px-3 py-2 text-sm bg-[#1e293b] text-white">
                          Typing…
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="border-t border-[#8936eb]/30 bg-[#162032] p-3">
                    <div className="flex items-end gap-2">
                      <textarea
                        ref={inputRef}
                        rows={1}
                        value={text}
                        maxLength={maxChars}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            if (canSend) handleSend();
                          }
                        }}
                        placeholder={placeholder}
                        className="flex-1 resize-none rounded-xl border border-[#8936eb]/40 bg-[#162032] px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#8936eb]/50"
                      />
                      <button
                        onClick={handleSend}
                        disabled={!canSend}
                        className="rounded-xl bg-[#8936eb] px-3 py-2 text-sm font-semibold text-white shadow disabled:opacity-50"
                      >
                        <Send size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}

function getSessionId(storageKey) {
  const k = storageKey + ":id";
  let id = null;
  try {
    id = localStorage.getItem(k);
  } catch {}
  if (!id) {
    id =
      (crypto.randomUUID && crypto.randomUUID()) ||
      Math.random().toString(36).slice(2);
    try {
      localStorage.setItem(k, id);
    } catch {}
  }
  return id;
}
