(() => {
  const PATCH_ID = '__pokechill_i18n_v4_1_patch__';
  if (window[PATCH_ID]) return;
  window[PATCH_ID] = true;

  // ─── Dictionnaires ────────────────────────────────────────────────────────

  const EXACT = new Map([
    ['Wild Areas',                  'Zones Sauvages'],
    ['Dungeons',                    'Donjons'],
    ['Events',                      '\u00c9v\u00e9nements'],
    ['Go back',                     'Retour'],
    ["TM's",                        'CT'],
    ['Right click to see keywords', 'Clic droit pour voir les mots-cl\u00e9s'],
    ['Area Pokemon',                'Pok\u00e9mon de la zone'],
    ['Area Items',                  'Objets de la zone'],
    ['Victory Rewards',             'R\u00e9compenses de victoire'],
    ['Team Preview',                "Aper\u00e7u de l\u2019\u00e9quipe"],
    ['Field Effects',               'Effets de terrain'],
    ['Factory Pokemon',             "Pok\u00e9mon de l\u2019usine"],
    ['Factory Items',               "Objets de l\u2019usine"],
    ['Go play the official games!', 'Va jouer aux jeux officiels !'],
  ]);

  const PHRASES = new Map([
    ['Gemstone Cavern',      'Caverne de Gemmes'],
    ['Frozen Lake',          'Lac Gel\u00e9'],
    ['Abandoned Manor',      'Manoir Abandonn\u00e9'],
    ['Draco Lair',           'Antre Draconique'],
    ['Mountain Trail',       'Sentier de Montagne'],
    ['Tea Parlor',           'Salon de Th\u00e9'],
    ['Pokemon Dojo',         'Dojo Pok\u00e9mon'],
    ['Sky High',             'Hauts Cieux'],
    ['Dank Cave',            'Caverne Sombre'],
    ['Forest Shrine',        'Sanctuaire de la For\u00eat'],
    ['Street Circus',        'Cirque de Rue'],
    ['Weapons Facility',     "Complexe d\u2019Armes"],
    ['Wildlife Park',        'Parc Safari'],
    ['Battle Frontier',      'Fronti\u00e8re de Combat'],
    ['Battle Factory',       'Usine de Combat'],
    ['Battle Tower',         'Tour de Combat'],
    ['Spiraling Tower',      'Tour Spirale'],
    ['Mega-Dimension',       'M\u00e9ga-dimension'],
    ['Mega Dimension',       'M\u00e9ga-dimension'],
    ['Poke-Mart',            'Poke-Mart'],
    ['Right click/long tap to see the field effect details',
      "Clic droit / appui long pour voir les d\u00e9tails de l\u2019effet de terrain"],
    ['Pokemon in the Wildlife Park rotate every 12 hours',
      'Les Pok\u00e9mon du Parc Safari tournent toutes les 12 heures'],
    ['All Pokemon in Wild Areas might be caught by defeating them.',
      'Tous les Pok\u00e9mon des Zones Sauvages peuvent \u00eatre captur\u00e9s en les battant.'],
    ['Wild Areas rotate every day, so be sure to check out what can be caught today!',
      "Les Zones Sauvages tournent chaque jour, pense \u00e0 regarder ce qui peut \u00eatre captur\u00e9 aujourd\u2019hui !"],
    ["Pokemon in Dungeons can't be caught, but they can drop useful items and EXP.",
      "Les Pok\u00e9mon des Donjons ne peuvent pas \u00eatre captur\u00e9s, mais ils peuvent l\u00e2cher des objets utiles et de l\u2019EXP."],
  ]);

  const TRAINER_PREFIXES = [
    ['Rookie Trainer',   'Dresseur D\u00e9butant'],
    ['Veteran Trainer',  'Dresseur V\u00e9t\u00e9ran'],
    ['Ace Trainer',      "Dresseur d\u2019\u00e9lite"],
    ['Expert Trainer',   'Dresseur Expert'],
    ['Master Trainer',   'Dresseur Ma\u00eetre'],
    ['Elite Trainer',    'Dresseur \u00c9lite'],
    ['Youngster',        'Gamin'],
    ['Lass',             'Fillette'],
    ['Beauty',           'Beaut\u00e9'],
    ['Hiker',            'Randonneur'],
    ['Scientist',        'Scientifique'],
    ['Nurse',            'Infirmi\u00e8re'],
    ['Ranger',           'Ranger'],
    ['Swimmer',          'Nageur'],
    ['Psychic',          'M\u00e9dium'],
    ['Gentleman',        'Gentleman'],
    ['Lady',             'Lady'],
    ['Champion',         'Champion'],
    ['Captain',          'Capitaine'],
    ['Boss',             'Boss'],
  ];

  const WORDS = [
    [/\bPokemon\b/g,   'Pok\u00e9mon'],
    [/\bpokemon\b/g,   'pok\u00e9mon'],
    [/\bMoves\b/g,     'Capacit\u00e9s'],
    [/\bMove\b/g,      'Capacit\u00e9'],
    [/\bAbilities\b/g, 'Talents'],
    [/\bAbility\b/g,   'Talent'],
    [/\bTrainer\b/g,   'Dresseur'],
  ];

  // ─── Helpers ──────────────────────────────────────────────────────────────

  function isFr() {
    return (window.saved?.language || localStorage.getItem('pokechillLanguage') || 'fr') === 'fr';
  }

  function preservePadding(original, replacement) {
    const lead = original.match(/^\s*/)?.[0] || '';
    const tail = original.match(/\s*$/)?.[0] || '';
    return `${lead}${replacement}${tail}`;
  }

  function translateTrainerBits(text) {
    let out = text;
    for (const [en, fr] of TRAINER_PREFIXES) {
      out = out.replace(new RegExp(`\\b${en}\\b`, 'g'), fr);
    }
    out = out.replace(/\s+Trainer\s+(\d+)\/5\b/g, ' Dresseur $1/5');
    out = out.replace(/\bVS Trainers\b/g, 'Dresseurs VS');
    return out;
  }

  function translateAreaBits(text) {
    let out = text;
    for (const [en, fr] of PHRASES.entries()) out = out.split(en).join(fr);
    out = out.replace(/^Defeat\s+(.+)$/i, (_, t) => `Vaincre ${translateTrainerBits(t)}`);
    return out;
  }

  function translateText(text) {
    if (typeof text !== 'string' || !isFr()) return text;
    const trimmed = text.trim();
    if (!trimmed) return text;

    if (EXACT.has(trimmed)) return preservePadding(text, EXACT.get(trimmed));

    if (/^TM\s+/i.test(trimmed))
      return preservePadding(text, trimmed.replace(/^TM\s+/i, 'CT '));

    if (/^Caught:\s*(\d+)\s*\/\s*(\d+)$/i.test(trimmed))
      return preservePadding(text, trimmed.replace(/^Caught:\s*(\d+)\s*\/\s*(\d+)$/i, 'Captur\u00e9s\u00a0: $1/$2'));

    if (/^Caught:\s*(\d+)$/i.test(trimmed))
      return preservePadding(text, trimmed.replace(/^Caught:\s*(\d+)$/i, 'Captur\u00e9s\u00a0: $1'));

    if (/^Caught\s+(\d+)\s*\/\s*(\d+)$/i.test(trimmed))
      return preservePadding(text, trimmed.replace(/^Caught\s+(\d+)\s*\/\s*(\d+)$/i, 'Captur\u00e9s $1/$2'));

    let out = text;
    out = translateAreaBits(out);
    out = translateTrainerBits(out);
    for (const [rx, rep] of WORDS) out = out.replace(rx, rep);
    out = out.replace(/Right click to see keywords/g, 'Clic droit pour voir les mots-cl\u00e9s');
    out = out.replace(/\bGo back\b/g, 'Retour');
    out = out.replace(/\bTM's\b/g, 'CT');
    out = out.replace(/\bTM\s+/g, 'CT ');
    return out;
  }

  // ─── Traduction DOM ───────────────────────────────────────────────────────

  const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'INPUT', 'TEXTAREA']);

  function translateTextNodes(root) {
    if (!root || !isFr()) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue?.trim()) return NodeFilter.FILTER_REJECT;
        const p = node.parentElement;
        if (!p || SKIP_TAGS.has(p.tagName)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    const nodes = [];
    let n;
    while ((n = walker.nextNode())) nodes.push(n);
    for (const node of nodes) {
      const tr = translateText(node.nodeValue);
      if (tr !== node.nodeValue) node.nodeValue = tr;
    }
  }

  function translateAttributes(root) {
    if (!root || !isFr()) return;
    root.querySelectorAll('[placeholder],[title],[aria-label]').forEach((el) => {
      for (const attr of ['placeholder', 'title', 'aria-label']) {
        const v = el.getAttribute(attr);
        if (!v) continue;
        const tr = translateText(v);
        if (tr !== v) el.setAttribute(attr, tr);
      }
    });
  }

  // CT dans les boutons d'objets
  function translateTmButtons() {
    if (!isFr()) return;
    document.querySelectorAll('[data-item]').forEach((el) => {
      const id = el.dataset.item;
      const item = window.item?.[id];
      if (!item || item.type !== 'tm' || !item.move) return;
      const label = Array.from(el.childNodes).find(
        (node) => node.nodeType === Node.TEXT_NODE && node.nodeValue.trim()
      );
      if (!label) return;
      const moveName =
        typeof window.format === 'function' ? window.format(item.move) : item.move;
      const next = `CT ${moveName}`;
      if (!label.nodeValue.includes(next)) label.nodeValue = ` ${next}`;
    });
  }

  // Tooltips : nœuds texte uniquement (jamais innerHTML)
  function translateTooltips() {
    if (!isFr()) return;
    for (const id of ['tooltipTitle', 'tooltipMid', 'tooltipBottom']) {
      const el = document.getElementById(id);
      if (el) {
        translateTextNodes(el);
        translateAttributes(el);
      }
    }
  }

  // ─── Patch window.areas + window.format ──────────────────────────────────

  function patchAreaNames() {
    if (!isFr() || !window.areas) return;
    for (const id in window.areas) {
      const area = window.areas[id];
      if (!area || typeof area.name !== 'string') continue;
      if (area.__v41OriginalName === undefined) area.__v41OriginalName = area.name;
      area.name = translateText(area.__v41OriginalName);
    }
  }

  function patchFormat() {
    const current = window.format;
    if (typeof current !== 'function' || current.__v41Patched) return;
    const base = current.__baseFormat || current.__i18nOriginal || current;
    const wrapped = function (...args) {
      const id = args[0];
      const result = current.apply(this, args);
      if (!isFr() || typeof result !== 'string') return result;
      const item = window.item?.[id];
      if (item?.type === 'tm' && item.move) return `CT ${translateText(base(item.move))}`;
      if (window.areas?.[id]) return translateText(window.areas[id].name || result);
      return translateText(result);
    };
    wrapped.__v41Patched = true;
    wrapped.__baseFormat = base;
    window.format = wrapped;
  }

  // ─── Moteur principal : disconnect → patch → reconnect ───────────────────
  // Garantit zéro boucle : l'observer est aveugle pendant qu'on écrit.

  let _observer = null;
  let _debounceTimer = null;

  function runPatch() {
    if (!isFr()) return;
    _observer?.disconnect();
    try {
      patchAreaNames();
      patchFormat();
      translateTextNodes(document.body);
      translateAttributes(document.body);
      translateTmButtons();
      translateTooltips();
    } finally {
      reconnectObserver();
    }
  }

  function scheduleTranslate() {
    clearTimeout(_debounceTimer);
    _debounceTimer = setTimeout(runPatch, 250);
  }

  function reconnectObserver() {
    if (!_observer || !document.body) return;
    _observer.observe(document.body, {
      childList:     true,
      subtree:       true,
      characterData: true,   // sûr car on disconnect avant d'écrire
    });
  }

  // ─── wrapAfterRender : retraduire après chaque mise à jour UI ────────────

  function wrapAfterRender(name) {
    // Retry si la fonction n'est pas encore définie
    const tryWrap = () => {
      const fn = window[name];
      if (typeof fn !== 'function' || fn.__v41Wrapped) return;
      const wrapped = function (...args) {
        const out = fn.apply(this, args);
        scheduleTranslate();
        return out;
      };
      wrapped.__v41Wrapped = true;
      window[name] = wrapped;
    };
    tryWrap();
    // Second essai après 2 s pour les fonctions définies en différé
    setTimeout(tryWrap, 2000);
  }

  // ─── Installation ─────────────────────────────────────────────────────────

  function install() {
    patchAreaNames();
    patchFormat();
    [
      'tooltipData', 'updateItemShop', 'updateDictionary',
      'setGuide', 'createArenaCards', 'updatePreviewTeam',
    ].forEach(wrapAfterRender);

    _observer = new MutationObserver(scheduleTranslate);
    runPatch();   // premier passage complet
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', install);
  } else {
    install();
  }
})();
