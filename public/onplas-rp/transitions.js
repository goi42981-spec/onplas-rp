(() => {
  const oldTransitionSelector =
    '[class~="fixed"][class~="inset-0"][class~="z-[300]"][class~="overflow-hidden"]';
  const mapImagePaths = {
    north: "/onplas-rp/images/onpas-map.jpg",
    west: "/onplas-rp/images/map-west.webp?v=3",
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
  const westLocationOverrides = [
    {
      original: "Водопад",
      west: "Казино",
      northSide: "l",
      origImage: "/onplas-rp/images/location-waterfall.webp",
      origText: "От парка до водопада нужно идти пешком. Тропа выходит к реке выше уступа, а затем спускается к воде между корнями деревьев. У подножия прохладно даже летом, вещи, оставленные близко к берегу, быстро отсыревают от брызг. На плоских камнях фотографируются чаще всего туристы, которые и приезжают ради этого места.",
      image: "/onplas-rp/images/casino.jpg",
      text: "Занимает большое помещение без окон, лишь имеются картины с пейзажами, чтобы посетители не замечали, сколько времени прошло. В центре зала стоят рулетка и карточные столы, а вдоль стен - ряд старых автоматов и бар. Вытяжка работает плохо, поэтому внутри всегда накурено, а у кассы обмена фишек круглые сутки дежурит охрана.",
    },
    {
      original: "Мэрия",
      west: "Церковь",
      north: { left: "52%", top: "36%" },
      westPos: { left: "47%", top: "39%" },
      northSide: "l",
      origImage: "/onplas-rp/images/location-mayor.webp",
      image: "/onplas-rp/images/church.png",
      origText: "Перед входом в мэрию всегда заняты парковочные места, хотя в самом здании посетителей обычно немного. На первом этаже принимают жалобы и заявления, выше находятся кабинеты администрации. Люди приходят сюда спорить из-за налогов, дорог и разрешений на строительство.",
      text: "Внутри высокий потолок с балками, цветные витражи на узких окнах и два ряда деревянных скамеек, которые ведут к алтарю. Кроме воскресных служб тут проводят венчания и похороны, а у входа стоят коробки со старой одеждой и продуктами для малоимущих.",
    },
    {
      original: "Городской парк",
      west: "Банкетный зал",
      origImage: "/onplas-rp/images/location-park.webp",
      origText: "Парк тянется вдоль реки. Возле входа расположены детская площадка и баскетбольная коробка, дальше идут столы для пикников и большой участок газона. После дождя нижнюю дорожку затапливает, и все ходят по вытоптанной полосе выше берега.",
      image: "/onplas-rp/images/banquet.png",
      text: "Большой дорогой зал с колоннами и люстрой, который работает как закрытый ресторан, а по выходным сдаётся под балы, свадьбы и банкеты. Центр с паркетом оставляют свободным для танцев, по краям ставят круглые столы с шампанским, а в глубине - сцену для музыкантов.",
      north: { left: "32%", top: "66%" },
      westPos: { left: "37%", top: "63%" },
    },
    {
      original: "Клиника",
      west: "Кинотеатр",
      origImage: "/onplas-rp/images/location-clinic.webp",
      origText: "В городе одна небольшая клиника с приёмным отделением. Серьёзных пациентов отправляют в соседний город, с остальными разбираются на месте. Врачей мало, поэтому у постоянных посетителей документы не просят.",
      image: "/onplas-rp/images/cinema.png",
      text: "Обычный городской мультиплекс. В фойе кассы и стойка с попкорном, а внутри залов ряды мягких кресел с подстаканниками перед широким экраном. По выходным билеты на вечер разбирают за пару часов, а местные подростки часто берут один билет на утренний сеанс и потом до ночи перебегают из зала в зал...",
      north: { left: "40%", top: "39%" },
      westPos: { left: "25%", top: "36%" },
    },
    {
      original: "Полицейский участок",
      west: "Библиотека",
      origImage: "/onplas-rp/images/location-police.webp",
      origText: "В приёмной работает телевизор, к которому никто не может найти пульт и потому там вечно скучный канал новостей. Дежурный принимает заявления через стекло, выглядя уставшим. Участок небольшой, и задержанный вполне может услышать, как в соседнем кабинете обсуждают его дело.",
      image: "/onplas-rp/images/library.png",
      text: "Старое здание с высокими окнами, вдоль стен стоят книжные стеллажи с приставными лестницами, а посередине - длинные столы с лампами. Компьютеры у стойки выдачи старые и постоянно виснут, поэтому нужные книги и архивы местных газет до сих пор быстрее искать через бумажную картотеку.",
      north: { left: "74%", top: "22%" },
      westPos: { left: "64%", top: "52%" },
      westSide: "r",
    },
    {
      original: "Круглосуточная закусочная",
      west: "Клуб для взрослых",
      origImage: "/onplas-rp/images/location-diner.webp",
      image: "/onplas-rp/images/club.png",
      origText:
        "Стоит на выезде из центра, напротив участка и заправки. Меню находится под прозрачными накладками на столах, возле кассы продаётся домашние хлебобулочные изделия, которыми пахнет за километр.",
      text:
        "Вход находится со двора за обычной железной дверью. Внутри небольшая сцена с пилоном и шторами, вокруг - низкие диваны со столиками, а дальше за баром коридор в приватные комнаты. Оплату принимают только наличными, чтобы у гостей потом не всплывали выписки по картам. Среди верующих ходят слухи, что частые гости здесь \"демоны\", которые высасывают душу из стриптизерш. На самом деле вампиры приходят сюда за дешёвой кровью, а работники знают о существовании сверхъестественного. Посещать место может кто угодно.",
      underline: "Посещать место может кто угодно.",
      north: { left: "68%", top: "28%" },
      westPos: { left: "51%", top: "28%" },
      westSide: "r",
    },
  ];
  const westHiddenLocations = [
    "Дома в лесу",
    "Лес",
    "Склад",
    "Жилой район",
    "Мотель",
    "Бар «Смена»",
    "Ведьмина лавка",
  ];

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

  const markerSides = {
    l: { transform: "translate(calc(-100% + 14px), -50%)", direction: "row-reverse" },
    r: { transform: "translate(-14px, -50%)", direction: "row" },
  };

  // Markers come from the bundle with their own label side; remember it so a
  // side change applied for one map can be undone when the other map is shown.
  function applyMarkerSide(marker, side) {
    if (marker.dataset.sideBaseTransform === undefined) {
      marker.dataset.sideBaseTransform = marker.style.transform;
      marker.dataset.sideBaseDirection = marker.style.flexDirection;
    }
    const preset = markerSides[side];
    const transform = preset ? preset.transform : marker.dataset.sideBaseTransform;
    const direction = preset ? preset.direction : marker.dataset.sideBaseDirection;
    if (marker.style.transform !== transform) marker.style.transform = transform;
    if (marker.style.flexDirection !== direction) marker.style.flexDirection = direction;
  }

  // The west map gets its own marker numbers: a random order drawn once and
  // kept fixed here, so every visitor sees the same numbers and no place keeps
  // the number it has on the north map. Keys are the bundle's own location
  // indexes (the numbers the north map shows), values are the west numbers.
  const westNumberByBase = { 1: 2, 2: 4, 5: 5, 7: 3, 8: 1, 11: 6 };

  // "Мэрия" -> 1, read from the list cards while the north map is shown.
  const baseByName = new Map();

  function numericLeaf(node) {
    return Array.from(node.querySelectorAll("span")).find(
      (span) => !span.children.length && /^\d+$/.test(span.textContent.trim()),
    );
  }

  function baseOfName(name) {
    if (!name) return undefined;
    if (baseByName.has(name)) return baseByName.get(name);
    const override = westLocationOverrides.find((o) => o.west === name);
    return override ? baseByName.get(override.original) : undefined;
  }

  function setNumber(node, value) {
    if (!node || value === undefined) return;
    const text = String(value);
    if (node.textContent !== text) node.textContent = text;
  }

  // Number badges live in the map markers, the list cards and the detail panel
  // of the selected place. Base numbers are only read while the north map is
  // shown: that is when they still hold the values the bundle wrote itself.
  function applyMapNumberOverrides(root, isWest) {
    if (!isWest) {
      root.querySelectorAll("button.group").forEach((card) => {
        const title = card.querySelector("span.block.font-heading");
        const number = numericLeaf(card);
        if (!title || !number) return;
        baseByName.set(title.textContent.trim(), Number(number.textContent.trim()));
      });
    }

    // West numbers follow the map order: left to right, then top to bottom.
    const westOrder = new Map();
    if (isWest) {
      Array.from(root.querySelectorAll("button[aria-label]"))
        .filter((m) => m.style.left && m.style.display !== "none")
        .sort((a, b) => parseFloat(a.style.left) - parseFloat(b.style.left) ||
          parseFloat(a.style.top) - parseFloat(b.style.top))
        .forEach((m, i) => westOrder.set(m.getAttribute("aria-label"), i + 1));
    }
    const westNumberOf = (name) => westOrder.get(name);

    const renumber = (container, name) => {
      if (!container) return;
      const number = numericLeaf(container);
      if (!number) return;
      if (!isWest && number.dataset.baseNum === undefined) {
        const text = number.textContent.trim();
        if (/^\d+$/.test(text)) number.dataset.baseNum = text;
      }
      const shown = isWest ? westNumberOf(name) : number.dataset.baseNum;
      setNumber(number, shown ?? number.dataset.baseNum);
    };

    root.querySelectorAll("button[aria-label]").forEach((marker) => {
      if (!marker.style.left) return;
      renumber(marker, marker.getAttribute("aria-label"));
    });

    root.querySelectorAll("button.group").forEach((card) => {
      renumber(card, card.querySelector("span.block.font-heading")?.textContent.trim());
    });

    const detail = root.querySelector('span[class*="h-8 w-8"]');
    if (detail) {
      const panel = detail.closest('[class*="flex h-full flex-col"]');
      const name = panel?.querySelector("h3")?.textContent.trim();
      setNumber(detail, isWest ? westNumberOf(name) : baseOfName(name));
    }
  }

  function applyMapLocationOverrides() {

    const root = document.getElementById("root");
    if (!root) return;

    const isWest = activeMap === "west";
    for (const override of westLocationOverrides) {
      const from = isWest ? override.original : override.west;
      const to = isWest ? override.west : override.original;
      const marker = Array.from(
        root.querySelectorAll("button[aria-label]"),
      ).find((button) => {
        const label = button.getAttribute("aria-label");
        return label === from || label === to;
      });

      if (!marker) continue;

      if (westHiddenLocations.includes(marker.getAttribute("aria-label"))) {
        marker.style.display = isWest ? "none" : "";
      }

      if (marker.getAttribute("aria-label") !== to) {
        marker.setAttribute("aria-label", to);
      }

      const visibleLabel = marker.querySelector('span[class~="whitespace-nowrap"]');
      if (visibleLabel && visibleLabel.textContent.trim() !== to) {
        visibleLabel.textContent = to;
      }

      marker.title = to;

      if (override.north && override.westPos) {
        const pos = isWest ? override.westPos : override.north;
        if (marker.style.left !== pos.left) marker.style.left = pos.left;
        if (marker.style.top !== pos.top) marker.style.top = pos.top;
      }
      applyMarkerSide(marker, isWest ? override.westSide : override.northSide);
    }

    // Photos and descriptions of west-only places
    for (const o of westLocationOverrides) {
      if (!o.text) continue;
      root.querySelectorAll("img").forEach((img) => {
        if (!o.image) return;
        const src = img.getAttribute("src") || "";
        if (isWest && src === o.origImage) img.setAttribute("src", o.image);
        else if (!isWest && src === o.image) img.setAttribute("src", o.origImage);
      });
      root.querySelectorAll("p").forEach((el) => {
        const node = el.firstChild;
        if (!node || node.nodeType !== 3) return;
        if (isWest) {
          if (o.origText && node.nodeValue.trim() === o.origText) {
            // The bundle may reuse this paragraph for another place: drop a
            // leftover underline from a previous replacement first.
            el.querySelectorAll("u").forEach((u) => u.remove());
            el.dataset.westOrig = node.nodeValue;
            if (o.underline) {
              // Everything up to the highlighted sentence stays a plain text
              // node; the sentence itself gets its own underlined element.
              const idx = o.text.lastIndexOf(o.underline);
              node.nodeValue = idx === -1 ? o.text : o.text.slice(0, idx);
              if (idx !== -1) {
                const marked = document.createElement("u");
                marked.textContent = o.underline;
                el.appendChild(marked);
              }
            } else {
              node.nodeValue = o.text;
            }
          }
        } else if (el.dataset.westOrig !== undefined && el.textContent === o.text) {
          el.textContent = el.dataset.westOrig;
          delete el.dataset.westOrig;
        }
      });
    }

    // Detail card, list cards and "изучено" counter
    const names = new Map();
    for (const o of westLocationOverrides) {
      names.set(isWest ? o.original : o.west, isWest ? o.west : o.original);
    }
    root.querySelectorAll("h3, span.block.font-heading").forEach((el) => {
      const t = el.textContent.trim();
      if (names.has(t) && el.firstChild?.nodeType === 3) el.firstChild.nodeValue = names.get(t);
    });
    let visibleCount = 0;
    root.querySelectorAll("button").forEach((btn) => {
      const title = btn.querySelector("span.block.font-heading");
      if (!title) return;
      const hide = isWest && westHiddenLocations.includes(title.textContent.trim());
      const d = hide ? "none" : "";
      if (btn.style.display !== d) btn.style.display = d;
      if (!hide) visibleCount++;
    });
    root.querySelectorAll("span").forEach((el) => {
      if (el.textContent.trim().toLowerCase() !== "изучено") return;
      const wrap = el.parentElement;
      const counter = wrap?.lastElementChild;
      if (!counter || !visibleCount) return;
      const last = counter.lastChild;
      if (last?.nodeType === 3) {
        if (!counter.dataset.total) counter.dataset.total = last.nodeValue;
        const txt = isWest ? String(visibleCount) : counter.dataset.total;
        if (last.nodeValue !== txt) last.nodeValue = txt;
      }
      const dots = wrap.children[1]?.children || [];
      Array.from(dots).forEach((dot, i) => {
        const d = isWest && i >= visibleCount ? "none" : "";
        if (dot.style.display !== d) dot.style.display = d;
      });
    });

    for (const title of westHiddenLocations) {
      const marker = Array.from(
        root.querySelectorAll("button[aria-label]"),
      ).find((button) => button.getAttribute("aria-label") === title);
      if (marker) marker.style.display = isWest ? "none" : "";
    }
    applyMapNumberOverrides(root, isWest);
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
          applyMapLocationOverrides();
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
      applyMapLocationOverrides();
    });
    // Also watch src/text changes: the bundle reuses the same <img>/<p> when
    // switching between places, so only watching added nodes misses swaps.
    observer.observe(appRoot, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["src"],
    });
    addMapChoices();
    syncOldTransitionState();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", watchApp, { once: true });
  } else {
    watchApp();
  }
})();
