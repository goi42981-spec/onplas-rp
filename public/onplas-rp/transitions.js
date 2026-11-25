(() => {
  const oldTransitionSelector =
    '[class~="fixed"][class~="inset-0"][class~="z-[300]"][class~="overflow-hidden"]';
  const mapImagePaths = {
    north: "/onplas-rp/images/onpas-map.jpg",
    west: "/onplas-rp/images/map-west.webp",
  };
  let appRoot = null;
  let bridgeReady = false;
  let transitionActive = false;
  let externalTransitionFinished = false;
  let oldTransitionRunning = false;
  let activeSection = "home";
  let activeMap = "north";
  let mapTransitionActive = false;
  let queuedNavigationButton = null;
  let oldTransitionNode = null;
  let oldTransitionObserver = null;

  function sectionForButton(button) {
    const label = (button.innerText || "").replace(/\s+/g, " ").trim().toLowerCase();
    if (button.getAttribute("aria-label") === "Меню") return null;
    if (label.includes("onplas")) return "home";
    if (label.includes("правила")) return "rules";
    if (label.includes("лор")) return "lore";
    if (label.includes("локации")) return "locations";
    if (label.includes("механика")) return "combat";
    return null;
  }

  function finishTransitionIfReady() {
    if (!transitionActive || !externalTransitionFinished || oldTransitionRunning) return;
    transitionActive = false;
    externalTransitionFinished = false;

    const queued = queuedNavigationButton;
    queuedNavigationButton = null;
    if (queued?.isConnected) window.setTimeout(() => queued.click(), 0);
  }

  function syncOldTransitionState() {
    if (!appRoot) return;
    const found = appRoot.querySelector(oldTransitionSelector);
    if (found && found !== oldTransitionNode) {
      oldTransitionObserver?.disconnect();
      oldTransitionNode = found;
      oldTransitionObserver = new MutationObserver(syncOldTransitionState);
      oldTransitionObserver.observe(oldTransitionNode, {
        attributes: true,
        attributeFilter: ["style"],
      });
    }

    const running = oldTransitionNode?.style.pointerEvents === "auto";
    if (running) oldTransitionRunning = true;
    else if (oldTransitionRunning) oldTransitionRunning = false;
    finishTransitionIfReady();
  }

  window.addEventListener("onplas:transition-bridge-ready", () => {
    bridgeReady = true;
  });

  window.addEventListener("onplas:section-transition-complete", () => {
    externalTransitionFinished = true;
    finishTransitionIfReady();
  });

  document.addEventListener(
    "click",
    (event) => {
      const button = event.target instanceof Element ? event.target.closest("button") : null;
      if (!button) return;

      const key = sectionForButton(button);
      if (!key) return;

      if (transitionActive) {
        event.preventDefault();
        event.stopPropagation();
        queuedNavigationButton = button;
        return;
      }

      if (key === activeSection || !bridgeReady) return;

      transitionActive = true;
      externalTransitionFinished = false;
      activeSection = key;
      syncOldTransitionState();
      window.dispatchEvent(new CustomEvent("onplas:section-transition", { detail: { key } }));
    },
    true,
  );

  function findMapImage() {
    return Array.from(document.querySelectorAll("#root img")).find((image) => {
      const source = image.getAttribute("src") || "";
      return source.includes("onpas-map.jpg") || source.includes("map-west.webp");
    });
  }

  function syncMapChoiceButtons(choices) {
    choices.querySelectorAll("button[data-map-key]").forEach((button) => {
      const selected = button.dataset.mapKey === activeMap;
      button.disabled = mapTransitionActive;
      button.setAttribute("aria-pressed", String(selected));
      button.style.border = `1px solid ${selected ? "rgba(255,59,84,.7)" : "rgba(179,18,42,.35)"}`;
      button.style.background = selected
        ? "linear-gradient(180deg,rgba(140,20,38,.45),rgba(55,10,20,.35))"
        : "rgba(14,10,20,.75)";
      button.style.color = selected ? "#ffd3d8" : "rgba(233,225,214,.7)";
      button.style.boxShadow = selected ? "0 0 24px rgba(255,59,84,.25)" : "none";
      button.style.opacity = mapTransitionActive ? ".55" : "1";
      button.style.cursor = mapTransitionActive ? "wait" : "pointer";
    });
  }

  function addMapChoices() {
    const map = findMapImage();
    const grid = map?.closest(".grid");
    const container = grid?.parentElement;
    if (!map || !grid || !container) return;

    const expectedSrc = mapImagePaths[activeMap];
    if ((map.getAttribute("src") || "") !== expectedSrc) {
      map.setAttribute("src", expectedSrc);
    }
    map.alt = activeMap === "west" ? "Карта Западных земель" : "Карта Онплэса";

    const existingChoices = container.querySelector("[data-onplas-map-choices]");
    if (existingChoices) {
      syncMapChoiceButtons(existingChoices);
      return;
    }

    const choices = document.createElement("div");
    choices.dataset.onplasMapChoices = "true";
    choices.setAttribute("aria-label", "Выбор карты");
    choices.style.cssText =
      "display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin:0 auto 24px;";

    const makeButton = (label, mapKey) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = label;
      button.dataset.mapKey = mapKey;
      button.setAttribute("aria-label", label);
      button.style.cssText = [
        "min-width:120px",
        "padding:11px 24px",
        "border-radius:999px",
        "border:1px solid rgba(179,18,42,.35)",
        "background:rgba(14,10,20,.75)",
        "color:rgba(233,225,214,.7)",
        "font:500 12px/1.2 Georgia,serif",
        "letter-spacing:.2em",
        "text-transform:uppercase",
        "box-shadow:none",
        "opacity:1",
        "cursor:pointer",
      ].join(";");
      button.addEventListener("click", () => {
        if (mapTransitionActive || mapKey === activeMap) return;
        mapTransitionActive = true;
        syncMapChoiceButtons(choices);
        const direction = mapKey === "west" ? "to-west" : "to-north";
        window.dispatchEvent(
          new CustomEvent("onplas:map-transition", {
            detail: { targetMap: mapKey, direction },
          }),
        );
        window.setTimeout(() => {
          const currentMapImage = findMapImage();
          if (currentMapImage) {
            currentMapImage.setAttribute("src", mapImagePaths[mapKey]);
            currentMapImage.alt =
              mapKey === "west" ? "Карта Западных земель" : "Карта Онплэса";
          }
          activeMap = mapKey;
          syncMapChoiceButtons(choices);
        }, 420);
        window.setTimeout(() => {
          mapTransitionActive = false;
          syncMapChoiceButtons(choices);
        }, 980);
      });
      return button;
    };

    choices.append(
      makeButton("Север", "north"),
      makeButton("Запад", "west"),
    );
    syncMapChoiceButtons(choices);
    container.insertBefore(choices, grid);
  }

  function watchApp() {
    appRoot = document.getElementById("root");
    if (!appRoot) return;

    const observer = new MutationObserver(() => {
      addMapChoices();
      syncOldTransitionState();
    });
    observer.observe(appRoot, { childList: true, subtree: true });
    addMapChoices();
    syncOldTransitionState();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", watchApp, { once: true });
  } else {
    watchApp();
  }
})();
