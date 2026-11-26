(() => {
  const from = 'флаг/юз с тематикой войны';
  const to = 'аватарку/юз с тематикой войны';
  const vampireAnchor =
    'Обычный укус не обращает, а обращённые не способны иметь детей.';
  const previousClarification =
    'Вампиры могут маскировать клыки, скрывая их, но зубы остаются заострёнными. Специальные капли ведьмы меняют цвет глаз на тот, который был до обращения.';
  const vampireClarification =
    'ВАЖНО: Вампиры могут скрывать клыки, но зубы остаются заострёнными. Специальные капли у ведьмы меняют цвет глаз на тот, который был до обращения. Капли — сюжетный инструмент, их не нужно покупать в магазине бота. При превращении в летучую мышь и обратно в человека одежда вампира не восстанавливается.';
  const metagameRuleTitle = 'Знание персонажа';
  const metagameRuleText =
    'Персонаж не узнаёт, что перед ним вампир или оборотень, только потому, что игрок так решил. Для этого нужны игровые основания.';
  const aiPostRuleTitle = 'ИИ в РП';
  const aiPostRuleText = 'Запрещено использовать в РП посты, сгенерированные ИИ.';
  const werewolfLoreHeading = 'Железа превращения';
  const werewolfLoreParagraphs = [
    'У оборотней имеется особая синяя железистая структура, расположенная у основания черепа — ближе к затылку. Она отвечает за процесс превращения из человеческой формы в звериную и обратно, то есть помогает телу и разуму совмещать помесь человеческих и животных клеток.',
    'Эта структура помогает нервной системе адаптироваться к изменениям тела с человеческого в звериное состояние и обратно, сохранять контроль над гранью животно-человеческих движений и регулировать повышенную чувствительность органов чувств (усиленную регенерацию в том числе). Она также подавляет болевой шок при превращении, помогает сохранять человеческую память и сознание.',
    'При повреждении этой железы оборотень может потерять контроль над превращением. Например: испытывать трудности с перевоплощением или вовсе застрять в одной из форм.',
  ];

  const loreSections = [
    {
      key: 'werewolf-gland',
      race: 'Оборотни',
      heading: werewolfLoreHeading,
      paragraphs: werewolfLoreParagraphs,
    },
    {
      key: 'werewolf-first-shift',
      race: 'Оборотни',
      heading: 'Первое перевоплощение',
      paragraphs: [
        'Обычно первое перевоплощение оборотня наступает в 12–16 лет, вместе со взрослением организма, но оно может случиться раньше или позже — это зависит от силы гена и пережитых потрясений.',
        'Первые несколько лет обращения проходят болезненно: кости ломаются и срастаются заново, мышцы сводит судорогой, а контролировать зверя трудно. Со временем тело адаптируется, и у детей, оба родителя которых оборотни, это происходит заметно быстрее.',
      ],
    },
    {
      key: 'werewolf-carriers',
      race: 'Оборотни',
      heading: 'Носители гена',
      paragraphs: [
        'Ген оборотня может передаться ребёнку, который так и не станет полноценным оборотнем и никогда не обратится. У таких носителей проявляются только отдельные черты: учащённый рост волос, высокий болевой порог, повышенная выносливость и обострённые чувства — слух, обоняние и зрение в темноте.',
        'Нередко в полнолуние им становится тревожно, хотя они сами не понимают почему. Носители могут передать ген дальше, и у их детей он может проявиться в полную силу.',
      ],
    },
    {
      key: 'vampire-tears',
      race: 'Вампиры',
      heading: 'Слёзы',
      paragraphs: [
        'Вампиры могут плакать, но их слёзы не прозрачные. Они выглядят как вода, смешанная с кровью, и бывают розоватыми или алыми. Чем сытее вампир, тем ярче цвет слёз, а у голодного они почти бледные.',
        'Каждая слеза отнимает часть запасов крови, поэтому многие вампиры привыкли сдерживать эмоции на людях.',
      ],
    },
    {
      key: 'vampire-blood',
      race: 'Вампиры',
      heading: 'Кровь и тело',
      paragraphs: [
        'Без крови тело вампира остаётся холодным и безжизненным: от приступов жажды и до смерти, поэтому её запасы нужно регулярно пополнять. Только со свежей кровью организм работает почти как живой — вампир может краснеть, чувствовать действие алкоголя или наркотиков и испускать семя.',
        'Но всё это происходит с задержкой: крови нужно время, чтобы разойтись по телу, поэтому румянец может появиться уже после неловкого момента, а опьянение настигает не сразу после выпитого.',
      ],
    },
    {
      key: 'vampire-mirrors',
      race: 'Вампиры',
      heading: 'Отражения',
      paragraphs: [
        'Вопреки старым легендам, вампиры видны на фото, видео и в современных зеркалах. Миф о том, что у них нет отражения, появился во времена старинных зеркал с серебряной амальгамой — в них вампиры выглядели мутно и искажённо.',
        'У нынешних зеркал и цифровых камер такой особенности нет, но многие древние вампиры до сих пор по привычке избегают зеркал.',
      ],
    },
  ];

  const economySection = {
    title: 'Система заработка',
    sigil: '✦',
    paragraphs: [
      'Система заработка создана для геймплея и не является обязательной. Она даёт игрокам дополнительные возможности для развития персонажа и взаимодействия с миром, но участвовать в ней или нет — решает каждый сам.',
      'Отказ от системы заработка никак не ограничивает отыгрыш, не закрывает доступ к сюжету и не ставит игрока в невыгодное положение. Персонаж может жить своей историей и не зависеть от игровой экономики.',
    ],
  };


  const suretyReplacements = [
    [
      'Оборотню сообщают о её основном действии, без понимания личной связи метка не закрепится.',
      'Кандидату на поручительство — оборотню или человеку — сообщают об основном действии метки; без понимания личной связи она не закрепится.',
    ],
    [
      'Поручитель обязан предоставить жильё, деньги, питание и юридическую защиту, организовать безопасное полнолуние и не допустить произвольного повторного ареста.',
      'Поручитель обязан предоставить подопечному жильё, деньги, питание и юридическую защиту, а также не допустить произвольного повторного ареста. Если подопечный — оборотень, поручитель дополнительно организует безопасное полнолуние.',
    ],
    [
      'За это он получает услуги оборотня: охрану, перевозки, сопровождение, розыск, кровь оборотня и выполнение поручений.',
      'За это он получает услуги подопечного: охрану, перевозки, сопровождение, розыск и выполнение поручений. Если подопечный — оборотень, в перечень также входит его кровь.',
    ],
    [
      'Официальная работа зависимого оборотня оплачивается, но значительная часть денег удерживается за содержание и надзор.',
      'Официальная работа подопечного оплачивается, но значительная часть денег удерживается за содержание и надзор.',
    ],
    [
      'Что делает метка: она связывает одного оборотня/человека с одним вампиром, для чего обязательно нужно смешать кровь вампира и оборотня, одного рукопожатия, где соединятся две кровоточащие раны хватит, однако иногда это может быть очень неловко, ибо кровь к ране у вампиров поступает медленнее. Удаление кожи не разрывает связь, знак появляется снова после заживления.',
      'Что делает метка: она связывает одного оборотня или человека с одним вампиром. Для метки обязательно смешивают кровь вампира и кровь того, кого связывают, — оборотня или человека. Достаточно рукопожатия, при котором соединятся две кровоточащие раны; у вампиров кровь к ране поступает медленнее. Удаление кожи не разрывает связь: знак появляется снова после заживления.',
    ],
    [
      'Она запрещает сознательно причинять своему поручителю тяжёлый вред.',
      'Она запрещает подопечному сознательно причинять своему поручителю тяжёлый вред.',
    ],
    [
      'Если оборотень всё же доводит смертельное воздействие до конца, обратный удар убивает и его.',
      'Если подопечный всё же доводит смертельное воздействие до конца, обратный удар убивает и его.',
    ],
    [
      'чьи планы оборотню неизвестны',
      'чьи планы подопечному неизвестны',
    ],
    [
      'Она не заставляет подчиняться любому приказу, оборотень может спорить, лгать, отказываться от работы, испытывать ненависть и скрывать сведения.',
      'Она не заставляет подопечного подчиняться любому приказу: он может спорить, лгать, отказываться от работы, испытывать ненависть и скрывать сведения.',
    ],
    [
      'Она ограничивает длительный уход, при заключении договора задаётся разрешённая территория, обычно город вместе с ближайшим лесом. После суток за её пределами без разрешения начинается нарастающая слабость. В следующие двое суток оборотень теряет возможность обращаться и нормально восстанавливаться. Это не убивает, но сильно затрудняет побег, и в итоге его сознание теряется, превращаясь в "зомби" который возвращается к своему хозяину.',
      'Она ограничивает длительный уход: при заключении договора для подопечного задаётся разрешённая территория, обычно город вместе с ближайшим лесом. После суток за её пределами без разрешения у подопечного начинается нарастающая слабость. В следующие двое суток оборотень теряет возможность обращаться и нормально восстанавливаться; эта часть последствий относится только к оборотням. Продолжающееся нарушение не убивает, но затрудняет побег, а в итоге подопечный теряет сознание, превращается в "зомби" и возвращается к своему поручителю.',
    ],
    [
      'Сам поручитель может причинить оборотню вред, ведь взаимной защиты договор не даёт. Оборотень способен закрыться от удара, убежать, удержать руку или обезоружить хозяина, пока не пытается тяжело его ранить.',
      'Сам поручитель может причинить вред подопечному: договор не даёт взаимной защиты. Оборотень или человек под меткой может закрыться от удара, убежать, удержать руку или обезоружить поручителя, пока не пытается нанести ему тяжёлый вред.',
    ],
    [
      'Если поручитель погибает по независимой причине, связь распадается, это не отменяет уголовное дело, у оборотня есть семь дней, чтобы через адвоката лично обратиться за пересмотром меры надзора. Автоматически новому хозяину метка его не передаёт',
      'Если поручитель погибает по независимой причине, связь распадается, но это не отменяет уголовного дела. У подопечного — оборотня или человека — есть семь дней, чтобы лично обратиться через адвоката за пересмотром меры надзора. Метка не переходит к новому поручителю автоматически.',
    ],
    [
      'Иногда подготовленный участник намеренно соглашается на поручительство, чтобы попасть в дом или окружение нужного вампира.',
      'Иногда подготовленный оборотень или человек намеренно соглашается на поручительство, чтобы попасть в дом или окружение нужного вампира.',
    ],
  ];

  const updateText = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.nodeValue ?? '';
      let updated = text.replace(from, to);
      updated = updated.replace(previousClarification, '');
      for (const [source, replacement] of suretyReplacements) {
        updated = updated.replace(source, replacement);
      }

      if (updated.includes(vampireAnchor)) {
        if (node.parentElement?.querySelector('[data-vampire-clarification]')) {
          if (updated !== text) node.nodeValue = updated;
          return;
        }

        const anchorEnd = updated.indexOf(vampireAnchor) + vampireAnchor.length;
        const before = document.createTextNode(`${updated.slice(0, anchorEnd)} `);
        const note = document.createElement('span');
        note.dataset.vampireClarification = 'true';
        note.style.color = '#ff5b66';
        note.style.fontWeight = '700';
        note.textContent = vampireClarification;

        const replacementNodes = [before, note];
        const after = updated.slice(anchorEnd).trimStart();
        if (after) replacementNodes.push(document.createTextNode(` ${after}`));

        node.replaceWith(...replacementNodes);
        return;
      }

      if (updated !== text) node.nodeValue = updated;
      return;
    }

    for (const child of node.childNodes ?? []) {
      updateText(child);
    }
  };

  const ensureMetagameRule = () => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let headingNode = walker.nextNode();

    while (headingNode && headingNode.nodeValue?.trim() !== 'В РП') {
      headingNode = walker.nextNode();
    }
    if (!headingNode) return;

    let section = headingNode.parentElement;
    while (section && !section.classList?.contains('mb-16')) {
      section = section.parentElement;
    }
    const ruleList = section?.querySelector(':scope > div.flex.flex-col.gap-4');
    if (!section || !ruleList) return;

    if (!section.querySelector('[data-metagame-rule]')) {
    const card = document.createElement('article');
    card.dataset.metagameRule = 'true';
    card.className =
      'relative mt-4 overflow-hidden border border-[#b3122a]/25 bg-gradient-to-b from-[#120d16]/80 to-[#0a0810]/80 px-5 py-5 backdrop-blur-sm sm:px-8 sm:py-6';

    const accent = document.createElement('span');
    accent.setAttribute('aria-hidden', 'true');
    accent.className =
      'absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-[#ff3b54] to-transparent';

    const title = document.createElement('h3');
    title.className = 'font-heading text-lg tracking-wide text-[#ff8e8e] sm:text-xl';
    title.textContent = metagameRuleTitle;

    const text = document.createElement('p');
    text.className =
      'mt-3 font-body text-base leading-relaxed text-[#e6dcd2]/90 sm:text-lg';
    text.textContent = metagameRuleText;

    card.append(accent, title, text);
    section.insertBefore(card, ruleList.nextSibling);
    }

    if (!section.querySelector('[data-ai-post-rule]')) {
      const aiCard = document.createElement('article');
      aiCard.dataset.aiPostRule = 'true';
      aiCard.className =
        'relative mt-4 overflow-hidden border border-[#b3122a]/25 bg-gradient-to-b from-[#120d16]/80 to-[#0a0810]/80 px-5 py-5 backdrop-blur-sm sm:px-8 sm:py-6';

      const aiAccent = document.createElement('span');
      aiAccent.setAttribute('aria-hidden', 'true');
      aiAccent.className =
        'absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-[#ff3b54] to-transparent';

      const aiTitle = document.createElement('h3');
      aiTitle.className = 'font-heading text-lg tracking-wide text-[#ff8e8e] sm:text-xl';
      aiTitle.textContent = aiPostRuleTitle;

      const aiText = document.createElement('p');
      aiText.className =
        'mt-3 font-body text-base leading-relaxed text-[#e6dcd2]/90 sm:text-lg';
      aiText.textContent = aiPostRuleText;

      aiCard.append(aiAccent, aiTitle, aiText);
      const metagameCard = section.querySelector('[data-metagame-rule]');
      section.insertBefore(aiCard, metagameCard ? metagameCard.nextSibling : ruleList.nextSibling);
    }
  };

  const appendLoreBlock = (list, section) => {
    const block = document.createElement('div');
    block.dataset.loreSection = section.key;
    block.className = 'mt-4 flex flex-col gap-4';

    const title = document.createElement('h4');
    title.className = 'font-heading mt-3 text-lg tracking-wide text-[#ff8e8e]';
    title.textContent = section.heading;
    block.append(title);

    for (const text of section.paragraphs) {
      const paragraph = document.createElement('p');
      paragraph.className =
        'font-body text-base leading-relaxed text-[#e6dcd2]/90 sm:text-lg';
      paragraph.textContent = text;
      block.append(paragraph);
    }

    list.append(block);
  };

  const ensureLoreSections = () => {
    const panels = document.querySelectorAll('div[class*="min-h-[220px]"]');
    for (const panel of panels) {
      const label = panel.querySelector('h3')?.textContent ?? '';
      const list = panel.querySelector('div.flex.flex-col.gap-4');
      if (!list) continue;

      for (const section of loreSections) {
        if (!label.includes(section.race)) continue;
        if (list.querySelector(`[data-lore-section="${section.key}"]`)) continue;
        appendLoreBlock(list, section);
      }
    }
  };

  const ensureEconomySection = () => {
    // The hero heading is animated letter by letter, so its text has no spaces.
    const squeeze = (value) => value.replace(/\s+/g, '');
    const hero = [...document.querySelectorAll('h1')].find((heading) =>
      squeeze(heading.textContent).includes(squeeze('Механика игры')),
    );

    const page = hero?.closest('section')?.parentElement;
    const list = page?.querySelector(':scope > div > div.flex.flex-col.gap-16');
    if (!list || list.querySelector('[data-economy-section]')) return;

    const section = document.createElement('section');
    section.dataset.economySection = 'true';

    const titleRow = document.createElement('div');
    titleRow.className = 'mb-8 flex items-center justify-center gap-4';

    const lineLeft = document.createElement('span');
    lineLeft.className =
      'h-px w-10 bg-gradient-to-r from-transparent to-[#b3122a]/70 sm:w-16';

    const label = document.createElement('span');
    label.className =
      'flex items-center gap-2 font-heading text-xs tracking-[0.4em] text-[#ff8e8e]/85 uppercase sm:text-sm';

    const sigil = document.createElement('span');
    sigil.className = 'text-[#ff3b54]';
    sigil.textContent = economySection.sigil;

    label.append(sigil, document.createTextNode(economySection.title));

    const lineRight = document.createElement('span');
    lineRight.className =
      'h-px w-10 bg-gradient-to-l from-transparent to-[#b3122a]/70 sm:w-16';

    titleRow.append(lineLeft, label, lineRight);

    const panel = document.createElement('div');
    panel.className =
      'border border-[#b3122a]/25 bg-gradient-to-b from-[#120d16]/70 to-[#0a0810]/70 p-7 backdrop-blur-sm sm:p-9';

    const body = document.createElement('div');
    body.className = 'flex flex-col gap-5';

    for (const text of economySection.paragraphs) {
      const paragraph = document.createElement('p');
      paragraph.className =
        'font-body text-base leading-relaxed text-[#e6dcd2]/90 sm:text-lg';
      paragraph.textContent = text;
      body.append(paragraph);
    }

    panel.append(body);
    section.append(titleRow, panel);
    list.append(section);
  };


  const root = document.documentElement;

  if (!root) return;

  const observer = new MutationObserver((records) => {
    for (const record of records) {
      if (record.type === 'characterData') {
        updateText(record.target);
      }

      for (const node of record.addedNodes) {
        updateText(node);
      }
    }
    ensureMetagameRule();
    ensureLoreSections();
    ensureEconomySection();


  });

  observer.observe(root, {
    childList: true,
    characterData: true,
    subtree: true,
  });

  updateText(root);
  ensureMetagameRule();
  ensureLoreSections();
  ensureEconomySection();


})();
