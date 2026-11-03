// Static entry for GitHub Pages: same site as src/routes/index.tsx, without the server.
import { createRoot } from "react-dom/client";
import TransitionBridge from "@/components/TransitionBridge";
import "@/styles.css";

const BASE = import.meta.env.BASE_URL;

function loadScript(src: string, type?: "module") {
  return new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = BASE + src;
    if (type) s.type = type;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(s);
  });
}

(async () => {
  await loadScript("onplas-rp/rule-text-override.js?v=7");
  await loadScript("onplas-rp/transitions.js?v=16");
  createRoot(document.getElementById("onplas-transition-root")!).render(
    <TransitionBridge
      onReady={() => {
        void loadScript("onplas-rp/assets/index-D0-XXavR.js", "module");
      }}
    />,
  );
})();
