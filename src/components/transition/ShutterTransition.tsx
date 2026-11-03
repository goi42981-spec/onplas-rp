import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const COVER_MS = 380;
const HOLD_MS = 620;
const REVEAL_MS = 420;

type Phase = "idle" | "covering" | "holding" | "revealing";

function seededRandom(seed: number) {
  let s = seed;
  return () => ((s = (s * 9301 + 49297) % 233280) / 233280);
}

export default function ShutterTransition({
  triggerKey,
  label,
  sigil,
  onMidpoint,
  onComplete,
}: {
  triggerKey: number;
  label: string;
  sigil: string;
  onMidpoint: () => void;
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [meta, setMeta] = useState({ label, sigil });

  const embers = useMemo(() => {
    const rand = seededRandom(41);
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: (rand() - 0.5) * 500,
      y: (rand() - 0.5) * 320,
      size: 1.5 + rand() * 2.5,
      delay: rand() * 0.3,
      duration: 1 + rand() * 0.8,
    }));
  }, []);

  useEffect(() => {
    if (triggerKey === 0) return;
    setMeta({ label, sigil });
  }, [triggerKey, label, sigil]);

  useEffect(() => {
    if (triggerKey === 0) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const t = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms));

    setPhase("covering");
    t(() => {
      onMidpoint();
      setPhase("holding");
    }, COVER_MS);

    t(() => setPhase("revealing"), COVER_MS + HOLD_MS);

    t(() => {
      setPhase("idle");
      onComplete();
    }, COVER_MS + HOLD_MS + REVEAL_MS);

    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerKey]);

  const active = phase !== "idle";
  const showCenter = phase === "covering" || phase === "holding";

  return (
    <div
      className="fixed inset-0 z-[300] overflow-hidden"
      style={{ pointerEvents: active ? "auto" : "none" }}
      aria-hidden
    >
      <motion.div
        className="absolute inset-0 origin-top-left"
        style={{
          background:
            "radial-gradient(ellipse 120% 120% at 0% 0%, #150921 0%, #0c0614 60%, #050209 100%)",
          boxShadow: "0 0 80px 20px rgba(255, 59, 84, 0.25)",
        }}
        initial={{ y: "-100%", opacity: 0 }}
        animate={{
          y: phase === "revealing" ? "-100%" : active ? "0%" : "-100%",
          opacity: active ? 1 : 0,
        }}
        transition={{
          duration: phase === "revealing" ? REVEAL_MS / 1000 : COVER_MS / 1000,
          ease: [0.32, 0.72, 0, 1],
        }}
      />

      <motion.div
        className="absolute inset-0 origin-bottom-right"
        style={{
          background:
            "radial-gradient(ellipse 120% 120% at 100% 100%, #180a22 0%, #0d0614 60%, #040108 100%)",
          boxShadow: "0 0 90px 25px rgba(255, 59, 84, 0.35)",
        }}
        initial={{ y: "100%", opacity: 0 }}
        animate={{
          y: phase === "revealing" ? "100%" : active ? "0%" : "100%",
          opacity: active ? 1 : 0,
        }}
        transition={{
          duration: phase === "revealing" ? REVEAL_MS / 1000 : COVER_MS / 1000,
          ease: [0.32, 0.72, 0, 1],
        }}
      />

      <motion.div
        className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,59,84,0.3) 15%, #ff4b60 50%, rgba(255,59,84,0.3) 85%, transparent)",
          boxShadow: "0 0 35px 8px rgba(255, 59, 84, 0.7)",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: active ? 1 : 0,
          opacity: active ? (phase === "revealing" ? 0 : 1) : 0,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      <AnimatePresence>
        {showCenter && (
          <motion.div
            key="centerpiece"
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center select-none"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.06, filter: "blur(12px)" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative mb-6 flex h-24 w-24 items-center justify-center">
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255, 60, 80, 0.35) 0%, rgba(180, 20, 40, 0.12) 55%, transparent 75%)",
                  filter: "blur(14px)",
                }}
                animate={{ scale: [0.95, 1.12, 0.95], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />

              <motion.svg
                viewBox="0 0 100 100"
                className="absolute inset-0 h-full w-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              >
                <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255, 120, 135, 0.32)" strokeWidth="0.8" strokeDasharray="4 6" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255, 90, 110, 0.2)" strokeWidth="0.5" />
                <circle cx="50" cy="4" r="1.8" fill="#ff7280" />
                <circle cx="50" cy="96" r="1.8" fill="#ff7280" />
              </motion.svg>

              <div
                className="relative flex h-14 w-14 items-center justify-center rounded-full border border-[#ff5c70]/40"
                style={{
                  background:
                    "radial-gradient(circle at 35% 35%, rgba(120, 20, 36, 0.6) 0%, rgba(20, 5, 12, 0.9) 80%)",
                  boxShadow: "0 0 25px rgba(255, 59, 84, 0.4), inset 0 0 15px rgba(255, 140, 150, 0.15)",
                }}
              >
                <motion.span
                  className="font-display text-2xl text-[#ffd8dc]"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.35, delay: 0.1 }}
                  style={{ textShadow: "0 0 18px rgba(255, 90, 110, 0.85)" }}
                >
                  {meta.sigil}
                </motion.span>
              </div>

              {embers.map((e) => (
                <motion.span
                  key={e.id}
                  className="absolute left-1/2 top-1/2 rounded-full"
                  style={{
                    width: e.size,
                    height: e.size,
                    background: "#ff9da7",
                    boxShadow: "0 0 6px rgba(255, 80, 100, 0.8)",
                  }}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                  animate={{
                    x: e.x,
                    y: e.y,
                    opacity: [0, 0.9, 0],
                    scale: [0.5, 1.2, 0.2],
                  }}
                  transition={{
                    duration: e.duration,
                    delay: e.delay,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>

            <div className="flex items-center justify-center gap-3">
              <motion.span
                className="h-px w-16 origin-right bg-gradient-to-l from-[#ff7a88]/70 to-transparent sm:w-28"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.45, delay: 0.12 }}
              />
              <motion.span
                className="h-1.5 w-1.5 rotate-45 bg-[#ff4d62]"
                style={{ boxShadow: "0 0 14px rgba(255, 77, 98, 0.95)" }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.18 }}
              />
              <motion.span
                className="h-px w-16 origin-left bg-gradient-to-r from-[#ff7a88]/70 to-transparent sm:w-28"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.45, delay: 0.12 }}
              />
            </div>

            <h2
              className="font-display mt-5 flex flex-wrap justify-center text-[clamp(1.8rem,5.2vw,3.6rem)] leading-none text-[#f8f2e8] uppercase"
              style={{ letterSpacing: "0.22em" }}
            >
              {meta.label.split("").map((ch, i) => (
                <motion.span
                  key={`${meta.label}-${i}`}
                  className="inline-block"
                  style={{ textShadow: "0 0 35px rgba(255, 70, 90, 0.45)" }}
                  initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.4,
                    delay: 0.18 + i * 0.035,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {ch === " " ? "\u00A0\u00A0" : ch}
                </motion.span>
              ))}
            </h2>

          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === "revealing" && (
          <motion.div
            key="corona-flash"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(255, 220, 215, 0.45) 0%, rgba(255, 90, 110, 0.18) 35%, transparent 70%)",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: [0, 1, 0], scale: [0.9, 1.12, 1.2] }}
            exit={{ opacity: 0 }}
            transition={{ duration: REVEAL_MS / 1000, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
