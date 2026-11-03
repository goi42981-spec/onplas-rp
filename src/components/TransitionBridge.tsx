import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import MapCrossingOverlay from "./MapCrossingOverlay";
import ShutterTransition from "./transition/ShutterTransition";
import "../transition-bridge.css";

const SECTION_META = {
  home: { label: "ГЛАВНАЯ", sigil: "✦" },
  rules: { label: "ПРАВИЛА", sigil: "⚜" },
  lore: { label: "ЛОР", sigil: "☾" },
  locations: { label: "ЛОКАЦИИ", sigil: "◇" },
  combat: { label: "МЕХАНИКА ИГРЫ", sigil: "⚔" },
} as const;

type SectionKey = keyof typeof SECTION_META;
type MapKey = "north" | "west";
type MapDirection = "to-west" | "to-north";

export default function TransitionBridge({ onReady }: { onReady?: () => void }) {
  const [section, setSection] = useState<{ key: SectionKey; triggerKey: number }>({
    key: "home",
    triggerKey: 0,
  });
  const [mapCrossing, setMapCrossing] = useState<{
    targetMap: MapKey;
    direction: MapDirection;
  } | null>(null);

  useEffect(() => {
    const onSectionTransition = (event: Event) => {
      const key = (event as CustomEvent<{ key?: SectionKey }>).detail?.key;
      if (!key || !(key in SECTION_META)) return;
      setSection((current) => ({ key, triggerKey: current.triggerKey + 1 }));
    };

    const onMapTransition = (event: Event) => {
      const detail = (event as CustomEvent<{ targetMap?: MapKey; direction?: MapDirection }>)
        .detail;
      if (!detail?.targetMap || !detail.direction) return;
      if (
        (detail.targetMap !== "north" && detail.targetMap !== "west") ||
        (detail.direction !== "to-west" && detail.direction !== "to-north")
      ) {
        return;
      }
      setMapCrossing({ targetMap: detail.targetMap, direction: detail.direction });
    };

    window.addEventListener("onplas:section-transition", onSectionTransition);
    window.addEventListener("onplas:map-transition", onMapTransition);
    window.dispatchEvent(new Event("onplas:transition-bridge-ready"));
    onReady?.();

    return () => {
      window.removeEventListener("onplas:section-transition", onSectionTransition);
      window.removeEventListener("onplas:map-transition", onMapTransition);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mapCrossing) return;
    const timer = window.setTimeout(() => setMapCrossing(null), 980);
    return () => window.clearTimeout(timer);
  }, [mapCrossing]);

  const meta = SECTION_META[section.key];

  return (
    <>
      <ShutterTransition
        triggerKey={section.triggerKey}
        label={meta.label}
        sigil={meta.sigil}
        onMidpoint={() => window.dispatchEvent(new Event("onplas:section-transition-midpoint"))}
        onComplete={() => window.dispatchEvent(new Event("onplas:section-transition-complete"))}
      />
      <AnimatePresence>
        {mapCrossing && (
          <MapCrossingOverlay
            key={`${mapCrossing.targetMap}-${mapCrossing.direction}`}
            targetMap={mapCrossing.targetMap}
            direction={mapCrossing.direction}
          />
        )}
      </AnimatePresence>
    </>
  );
}
