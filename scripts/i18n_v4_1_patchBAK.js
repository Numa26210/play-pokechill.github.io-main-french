(() => {
  const PATCH_ID = '__pokechill_i18n_v4_1_patch__';
  if (window[PATCH_ID]) return;
  window[PATCH_ID] = true;

  const EXACT = new Map([
    ['Wild Areas', 'Zones Sauvages'],
    ['Dungeons', 'Donjons'],
    ['Events', 'Événements'],
    ['Go back', 'Retour'],
    ["TM's", 'CT'],
    ['Right click to see keywords', 'Clic droit pour voir les mots-clés'],
    ['Area Pokemon', 'Pokémon de la zone'],
    ['Area Items', 'Objets de la zone'],
    ['Victory Rewards', 'Récompenses de victoire'],
    ['Team Preview', 'Aperçu de l’équipe'],
    ['Field Effects', 'Effets de terrain'],
    ['Factory Pokemon', 'Pokémon de l’usine'],
    ['Factory Items', 'Objets de l’usine'],
    ['Go play the official games!', 'Va jouer aux jeux officiels !']
  ]);

  const PHRASES = new Map([
    ['Gemstone Cavern', 'Caverne de Gemmes'],
    ['Frozen Lake', 'Lac Gelé'],
    ['Abandoned Manor', 'Manoir Abandonné'],
    ['Draco Lair', 'Antre Draconique'],
    ['Mountain Trail', 'Sentier de Montagne'],
    ['Tea Parlor', 'Salon de Thé'],
    ['Pokemon Dojo', 'Dojo Pokémon'],
    ['Sky High', 'Hauts Cieux'],
    ['Dank Cave', 'Caverne Sombre'],
    ['Forest Shrine', 'Sanctuaire de la Forêt'],
    ['Street Circus', 'Cirque de Rue'],
    ['Weapons Facility', 'Complexe d’Armes'],
    ['Wildlife Park', 'Parc Safari'],
    ['Battle Frontier', 'Frontière de Combat'],
    ['Battle Factory', 'Usine de Combat'],
    ['Battle Tower', 'Tour de Combat'],
    ['Spiraling Tower', 'Tour Spirale'],
    ['Mega-Dimension', 'Méga-dimension'],
    ['Mega Dimension', 'Méga-dimension'],
    ['Poke-Mart', 'Poke-Mart'],
    ['Right click/long tap to see the field effect details', 'Clic droit / appui long pour voir les détails de l’effet de terrain'],
    ['Pokemon in the Wildlife Park rotate every 12 hours', 'Les Pokémon du Parc Safari tournent toutes les 12 heures'],
    ['All Pokemon in Wild Areas might be caught by defeating them.', 'Tous les Pokémon des Zones Sauvages peuvent être capturés en les battant.'],
    ['Wild Areas rotate every day, so be sure to check out what can be caught today!', 'Les Zones Sauvages tournent chaque jour, pense à regarder ce qui peut être capturé aujourd’hui !'],
    ["Pokemon in Dungeons can't be caught, but they can drop useful items and EXP.", 'Les Pokémon des Donjons ne peuvent pas être capturés, mais ils peuvent lâcher des objets utiles et de l’EXP.']
  ]);

  const TRAINER_PREFIXES = [
    ['Rookie Trainer', 'Dresseur Débutant'],
    ['Veteran Trainer', 'Dresseur Vétéran'],
    ['Ace Trainer', 'Dresseur d’élite'],
    ['Expert Trainer', 'Dresseur Expert'],
    ['Master Trainer', 'Dresseur Maître'],
    ['Elite Trainer', 'Dresseur Élite'],
    ['Youngster', 'Gamin'],
    ['Lass', 'Fillette'],
    ['Beauty', 'Beauté'],
    ['Hiker', 'Randonneur'],
    ['Scientist', 'Scientifique'],
    ['Nurse', 'Infirmière'],
    ['Ranger', 'Ranger'],
    ['Swimmer', 'Nageur'],
    ['Psychic', 'Médium'],
    ['Gentleman', 'Gentleman'],
    ['Lady', 'Lady'],
    ['Champion', 'Champion'],
    ['Captain', 'Capitaine'],
    ['Boss', 'Boss']
  ];

  const WORDS = [
    [/\bPokemon\b/g, 'Pokémon'],
    [/\bpokemon\b/g, 'pokémon'],
    [/\bMoves\b/g, 'Capacités'],
    [/\bMove\b/g, 'Capacité'],
    [/\bAbilities\b/g, 'Talents'],
    [/\bAbility\b/g, 'Talent'],
    [/\bTrainer\b/g, 'Dresseur']
  ];

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
    out = out.replace(/^Defeat\s+(.+)$/i, (_, target) => `Vaincre ${translateTrainerBits(target)}`);
    return out;
  }

  function translateText(text) {
    if (typeof text !== 'string' || !isFr()) return text;
    const trimmed = text.trim();
    if (!trimmed) return text;

    if (EXACT.has(trimmed)) return preservePadding(text, EXACT.get(trimmed));

    if (/^TM\s+/i.test(trimmed)) {
      return preservePadding(text, trimmed.replace(/^TM\s+/i, 'CT '));
    }

    if (/^Caught:\s*(\d+)\s*\/\s*(\d+)$/i.test(trimmed)) {
      return preservePadding(text, trimmed.replace(/^Caught:\s*(\d+)\s*\/\s*(\d+)$/i, 'Capturés : $1/$2'));
    }

    if (/^Caught:\s*(\d+)$/i.test(trimmed)) {
      return preservePadding(text, trimmed.replace(/^Caught:\s*(\d+)$/i, 'Capturés : $1'));
    }

    if (/^Caught\s+(\d+)\s*\/\s*(\d+)$/i.test(trimmed)) {
      return preservePadding(text, trimmed.replace(/^Caught\s+(\d+)\s*\/\s*(\d+)$/i, 'Capturés $1/$2'));
    }

    let out = text;
    out = translateAreaBits(out);
    out = translateTrainerBits(out);
    for (const [regex, replacement] of WORDS) out = out.replace(regex, replacement);
    out = out.replace(/Right click to see keywords/g, 'Clic droit pour voir les mots-clés');
    out = out.replace(/Go back/g, 'Retour');
    out = out.replace(/\bTM's\b/g, 'CT');
    out = out.replace(/\bTM\s+/g, 'CT ');
    return out;
  }

  function translateAttributes(root) {
    if (!root || !isFr()) return;
    root.querySelectorAll('[placeholder], [title], [aria-label]').forEach((el) => {
      ['placeholder', 'title', 'aria-label'].forEach((attr) => {
        const value = el.getAttribute(attr);
        if (!value) return;
        const translated = translateText(value);
        if (translated !== value) el.setAttribute(attr, translated);
      });
    });
  }

  function shouldSkipNode(node) {
    const parent = node.parentElement;
    if (!parent) return true;
    return ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName);
  }

  function translateTextNodes(root) {
    if (!root || !isFr()) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (shouldSkipNode(node)) return NodeFilter.FILTER_REJECT;
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const nodes = [];
    let current;
    while ((current = walker.nextNode())) nodes.push(current);

    for (const node of nodes) {
      const translated = translateText(node.nodeValue);
      if (translated !== node.nodeValue) node.nodeValue = translated;
    }
  }

  function translateTmButtons() {
    if (!isFr()) return;
    document.querySelectorAll('[data-item]').forEach((el) => {
      const id = el.dataset.item;
      const itemData = window.item?.[id];
      if (!itemData || itemData.type !== 'tm' || !itemData.move) return;
      const labelNode = Array.from(el.childNodes).find((n) => n.nodeType === Node.TEXT_NODE && n.nodeValue.trim());
      if (!labelNode) return;
      const moveName = typeof window.format === 'function' ? window.format(itemData.move) : itemData.move;
      const next = `CT ${moveName}`;
      if (!labelNode.nodeValue.includes(next)) labelNode.nodeValue = ` ${next}`;
    });
  }

  function translateDexCounters() {
    if (!isFr()) return;
    document.querySelectorAll('*').forEach((el) => {
      if (!el || !el.childNodes || el.childNodes.length !== 1) return;
      const node = el.childNodes[0];
      if (!node || node.nodeType !== Node.TEXT_NODE) return;
      const text = node.nodeValue.trim();
      if (/^Caught\s+\d+\s*\/\s*\d+$/i.test(text)) {
        node.nodeValue = node.nodeValue.replace(/^\s*Caught\s+(\d+)\s*\/\s*(\d+)\s*$/i, 'Capturés $1/$2');
      }
      if (text === 'Right click to see keywords') {
        node.nodeValue = node.nodeValue.replace('Right click to see keywords', 'Clic droit pour voir les mots-clés');
      }
    });
  }

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

    const baseFormat = current.__baseFormat || current.__i18nOriginal || current;
    const wrapped = function (...args) {
      const id = args[0];
      const result = current.apply(this, args);
      if (!isFr() || typeof result !== 'string') return result;

      const itemData = window.item?.[id];
      if (itemData?.type === 'tm' && itemData.move) {
        const rawMove = baseFormat(itemData.move);
        return `CT ${translateText(rawMove)}`;
      }

      if (window.areas?.[id]) return translateText(window.areas[id].name || result);
      return translateText(result);
    };

    wrapped.__v41Patched = true;
    wrapped.__baseFormat = baseFormat;
    window.format = wrapped;
  }

  function wrapAfterRender(name) {
    const fn = window[name];
    if (typeof fn !== 'function' || fn.__v41Wrapped) return;
    const wrapped = function (...args) {
      const out = fn.apply(this, args);
      setTimeout(applyPatch, 0);
      return out;
    };
    wrapped.__v41Wrapped = true;
    window[name] = wrapped;
  }

  function applyPatch() {
    if (!isFr()) return;
    patchAreaNames();
    patchFormat();
    translateTextNodes(document.body);
    translateAttributes(document.body);
    translateTmButtons();
    translateDexCounters();
    ['tooltipTitle', 'tooltipMid', 'tooltipBottom'].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.innerHTML = translateText(el.innerHTML);
    });
  }

  function install() {
    patchAreaNames();
    patchFormat();
    ['tooltipData', 'updateItemShop', 'updateDictionary', 'setGuide', 'createArenaCards', 'updatePreviewTeam'].forEach(wrapAfterRender);
    applyPatch();

    const observer = new MutationObserver(() => applyPatch());
    if (document.body) observer.observe(document.body, { childList: true, subtree: true, characterData: true });

    setInterval(applyPatch, 1200);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install);
  else install();
})();
