import { motion } from "framer-motion";

export default function MapCrossingOverlay({
  targetMap,
  direction,
}: {
  targetMap: "north" | "west";
  direction: "to-west" | "to-north";
}) {
  const isWest = targetMap === "west";

  const title = isWest ? "ПЕРЕХОД НА ЗАПАД" : "ПЕРЕХОД НА СЕВЕР";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-center overflow-hidden select-none"
      style={{
        background:
          "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(18, 9, 26, 0.94) 0%, rgba(9, 5, 14, 0.98) 75%, rgba(4, 2, 7, 0.99) 100%)",
      }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: isWest
            ? "linear-gradient(135deg, rgba(255, 59, 84, 0.18) 0%, rgba(38, 70, 94, 0.25) 50%, rgba(255, 59, 84, 0.18) 100%)"
            : "linear-gradient(315deg, rgba(38, 70, 94, 0.25) 0%, rgba(255, 59, 84, 0.18) 50%, rgba(38, 70, 94, 0.25) 100%)",
        }}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: [0, 1, 0.8], scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      <motion.div
        className="absolute inset-y-0 w-48"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255, 120, 135, 0.35) 45%, rgba(255, 230, 220, 0.7) 50%, rgba(255, 120, 135, 0.35) 55%, transparent)",
          filter: "blur(6px)",
        }}
        initial={{ left: direction === "to-west" ? "-20%" : "120%" }}
        animate={{ left: direction === "to-west" ? "120%" : "-20%" }}
        transition={{ duration: 0.85, ease: "easeInOut" }}
      />

      <div className="relative mb-5 flex h-24 w-24 items-center justify-center">
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255, 59, 84, 0.45) 0%, transparent 70%)",
            filter: "blur(12px)",
          }}
          animate={{ scale: [0.9, 1.2, 0.9], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          animate={{ rotate: isWest ? 270 : 0 }}
          transition={{ duration: 0.75, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255, 140, 150, 0.45)" strokeWidth="1" strokeDasharray="2 4" />
          <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255, 90, 110, 0.25)" strokeWidth="0.8" />
          <text x="50" y="16" textAnchor="middle" fontSize="7.5" fontFamily="Cinzel, serif" fill="#ff7280" fontWeight="bold">N</text>
          <text x="50" y="92" textAnchor="middle" fontSize="7.5" fontFamily="Cinzel, serif" fill="#ff7280" fontWeight="bold">S</text>
          <text x="14" y="52.5" textAnchor="middle" fontSize="7.5" fontFamily="Cinzel, serif" fill="rgba(255, 180, 190, 0.6)">W</text>
          <text x="86" y="52.5" textAnchor="middle" fontSize="7.5" fontFamily="Cinzel, serif" fill="rgba(255, 180, 190, 0.6)">E</text>
          <path d="M 50 18 L 54 48 L 50 44 L 46 48 Z" fill="#ff3b54" />
          <path d="M 50 82 L 54 52 L 50 56 L 46 52 Z" fill="rgba(255, 200, 210, 0.4)" />
          <circle cx="50" cy="50" r="3.2" fill="#ffd8dc" />
        </motion.svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="flex flex-col items-center text-center px-4"
      >
        <h3
          className="font-display mt-2 text-xl sm:text-2xl tracking-[0.2em] text-[#f7efe4] uppercase"
          style={{ textShadow: "0 0 24px rgba(255, 59, 84, 0.6)" }}
        >
          {title}
        </h3>

        <div className="my-2 flex items-center justify-center gap-2">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#ff5c70]/70" />
          <span className="h-1.5 w-1.5 rotate-45 bg-[#ff3b54]" />
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#ff5c70]/70" />
        </div>
      </motion.div>
    </motion.div>
  );
}
