import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import TransitionBridge from "@/components/TransitionBridge";

const TITLE = "Onplas — Мир Оборотней, Людей и Вампиров";
const DESCRIPTION =
  "Ролевой проект о мире, где люди, оборотни и вампиры делят одну луну и одну ночь. Правила, лор и локации.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: "/onplas-rp/assets/index-D8mjEMMU.css" }],
  }),
  component: Index,
});

function loadScript(src: string, type?: "module") {
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector(`script[data-onplas-src="${src}"]`);
    if (existing) return resolve();
    const s = document.createElement("script");
    s.src = src;
    s.setAttribute("data-onplas-src", src);
    if (type) s.type = type;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(s);
  });
}

// The site itself is a prebuilt bundle (kept in /public/onplas-rp) that mounts
// into #root; helper scripts patch its text and drive the transition overlays.
function Index() {
  const [helpersReady, setHelpersReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await loadScript("/onplas-rp/rule-text-override.js?v=7");
      await loadScript("/onplas-rp/transitions.js?v=16");
      if (!cancelled) setHelpersReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <div id="root" />
      <div id="onplas-transition-root">
        {helpersReady && (
          <TransitionBridge
            onReady={() => {
              void loadScript("/onplas-rp/assets/index-D0-XXavR.js", "module");
            }}
          />
        )}
      </div>
    </>
  );
}
