(() => {
  const DEFAULT_LANG = 'fr';
  const LANG_KEY = 'pokechillLanguage';
  const API = 'https://pokeapi.co/api/v2';

  const EXACT = new Map([
    ['Dark Theme', 'Thème sombre'],
    ['Light Theme', 'Thème clair'],
    ['Verdant Theme', 'Thème verdoyant'],
    ['Lilac Theme', 'Thème lilas'],
    ['Cherry Theme', 'Thème cerise'],
    ['Coral Theme', 'Thème corail'],
    ['Onyx Theme', 'Thème onyx'],
    ['Oled Theme', 'Thème OLED'],
    ['Cancel', 'Annuler'],
    ['Remove', 'Retirer'],
    ['Held', 'Tenu'],
    ['Evo', 'Évo'],
    ["TM's", 'CT'],
    ['Memo', 'Mémo'],
    ['Berry', 'Baie'],
    ['Gems', 'Gemmes'],
    ['Decor', 'Déco'],
    ['Key', 'Clé'],
    ['Go back', 'Retour'],
    ['Save and Go!', 'Sauvegarder et partir !'],
    ['Pokemon', 'Pokémon'],
    ['Abilities', 'Talents'],
    ['Moves', 'Capacités'],
    ['Items', 'Objets'],
    ['Filters', 'Filtres'],
    ['Clear Filters', 'Effacer les filtres'],
    ['Tags', 'Tags'],
    ['caught', 'capturé'],
    ['Settings', 'Paramètres'],
    ['Export Data', 'Exporter les données'],
    ['Import Data', 'Importer des données'],
    ['Data to Text', 'Données en texte'],
    ['Theme:', 'Thème :'],
    ['Language:', 'Langue :'],
    ['default', 'défaut'],
    ['dark', 'sombre'],
    ['verdant', 'verdoyant'],
    ['lilac', 'lilas'],
    ['cherry', 'cerise'],
    ['onyx', 'onyx'],
    ['coral', 'corail'],
    ['oled', 'oled'],
    ['Hide non-new Pokemon got in summary:', 'Masquer les Pokémon déjà obtenus non nouveaux dans le récap :'],
    ['Sustract 1 to current Wild Area rotation:', 'Soustraire 1 à la rotation actuelle des Zones Sauvages :'],
    ['disabled', 'désactivé'],
    ['enabled', 'activé'],
    ['Game modifiers', 'Modificateurs de jeu'],
    ['Credits', 'Crédits'],
    ['Discord', 'Discord'],
    ['Wipe Data', 'Effacer les données'],
    ['Select a starter!', 'Choisis un starter !'],
    ['Fire Type', 'Type Feu'],
    ['Grass Type', 'Type Plante'],
    ['Water Type', 'Type Eau'],
    ['Game Guide', 'Guide du jeu'],
    ['Training', 'Entraînement'],
    ['Genetics', 'Génétique'],
    ['Compatibility', 'Compatibilité'],
    ['Power Cost', 'Coût en puissance'],
    ['Time to complete operation', "Temps pour terminer l'opération"],
    ['Start', 'Démarrer'],
    ['Poke-Mart', 'Poke-Mart'],
    ['~ Current Effects ~', '~ Effets actuels ~'],
    ['Reset', 'Réinitialiser'],
    ['Goods', 'Objets'],
    ['Evolution', 'Évolution'],
    ['Memory', 'Mémoire'],
    ['Restaurant', 'Restaurant'],
    ['Exchange', 'Échange'],
    ['Mega-Dimension', 'Méga-dimension'],
    ['VS Trainers', 'Dresseurs VS'],
    ['Trainers', 'Dresseurs'],
    ['Battle Frontier', 'Frontière de Combat'],
    ['Wild Areas', 'Zones Sauvages'],
    ['Dungeons', 'Donjons'],
    ['Events', 'Événements'],
    ['- Return To Kanto -', '- Retour à Kanto -'],
    ['Novice', 'Novice'],
    ['Elite', 'Élite'],
    ['Save and exit', 'Sauvegarder et quitter'],
    ['Fight Again', 'Recombattre'],
    ['Battle Summary', 'Résumé du combat'],
    ['New Items!', 'Nouveaux objets !'],
    ['New Pokemon!', 'Nouveaux Pokémon !'],
    ['Base Stats', 'Stats de base'],
    ["IV's Stats", 'Stats IV'],
    ['[Coming Soon]', '[Bientôt]'],
    ['Signature Move', 'Capacité signature'],
    ['Expand Lore', 'Déplier le lore'],
    ['Learnt Moves', 'Capacités apprises'],
    ['Travel', 'Voyage'],
    ['Team', 'Équipe'],
    ['Dex', 'Dex'],
    ['Mystery Gift', 'Cadeau mystère'],
    ['Export Reward', "Récompense d'export"],
    ['Wonder Trade', 'Échange miracle'],
    ['Mega Dimension', 'Méga-dimension'],
    ['Dictionary', 'Dictionnaire'],
    ['Guide', 'Guide'],
    ['Full Screen', 'Plein écran'],
    ['Leave Combat', 'Quitter le combat'],
    ['Save Changes', 'Sauvegarder les modifications'],
    ['Copy', 'Copier'],
    ['Paste', 'Coller'],
    ['Load', 'Charger'],
    ['Setting', 'Paramètre'],
    ['Keywords', 'Mots-clés'],
    ['Operators:', 'Opérateurs :'],
    ['Challenges', 'Défis'],
    ['Cheats', 'Triches'],
    ['Nuzloke Mode', 'Mode Nuzlocke'],
    ['Hard Mode', 'Mode difficile'],
    ['No IVs', 'Sans IV'],
    ['Longer AFK', 'AFK prolongé'],
    ['Curry', 'Curry'],
    ['Victory Rewards', 'Récompenses de victoire'],
    ['Common Ability', 'Talent commun'],
    ['Uncommon Ability', 'Talent peu commun'],
    ['Rare Ability', 'Talent rare'],
    ['No additional effects', 'Aucun effet supplémentaire'],
    ['Main Challenges', 'Défis principaux'],
    ['Custom Challenges', 'Défis personnalisés'],
    ['This project is entirely unofficial!', 'Ce projet est entièrement non officiel !'],
    ['Go play the official games!', 'Va jouer aux jeux officiels !'],
    ['Thanks for the Dialga!', 'Merci pour le Dialga !'],
    ['Drag and drop the selected decor to apply', 'Glisse-dépose la déco sélectionnée pour l’appliquer'],
    ['AFK time is being calculated, please wait...', 'Le temps AFK est en cours de calcul, merci de patienter...'],
    ['Right Click/Long press to see the details', 'Clic droit / appui long pour voir les détails'],
    ['Yeah!', 'Oui !'],
    ['Version Notice', 'Note de version'],
    ['Area Pokemon', 'Pokémon de la zone'],
    ['Team Preview', 'Aperçu de l’équipe'],
    ['Field Effects', 'Effets de terrain'],
    ['physical', 'physique'],
    ['special', 'spéciale'],
    ['status', 'statut'],
    ['type', 'type'],
    ['level', 'niveau'],
    ['division', 'division'],
    ['evolution', 'évolution'],
    ['not evolved (all)', 'non évolué (tous)'],
    ['not evolved (level)', 'non évolué (niveau)'],
    ['ability', 'talent'],
    ['common', 'commun'],
    ['uncommon', 'peu commun'],
    ['rare', 'rare'],
    ['locked', 'verrouillé'],
    ['HA', 'TC'],
    ['shiny', 'shiny'],
    ['is shiny', 'est shiny'],
    ['not shiny', 'pas shiny'],
    ['has star sign', 'a un signe astral'],
    ['all star sign', 'tous signes astraux'],
    ['has signature', 'a une signature'],
    ['has egg move', 'a une capacité œuf'],
    ['has ribbon', 'a un ruban'],
    ['tag', 'tag'],
    ['none', 'aucun'],
    ['red', 'rouge'],
    ['orange', 'orange'],
    ['yellow', 'jaune'],
    ['green', 'vert'],
    ['lime', 'citron vert'],
    ['blue', 'bleu'],
    ['teal', 'sarcelle'],
    ['pink', 'rose'],
    ['magenta', 'magenta'],
    ['hidden', 'caché'],
    ['sort', 'tri'],
    ['normal', 'normal'],
    ['fire', 'feu'],
    ['water', 'eau'],
    ['electric', 'électrik'],
    ['grass', 'plante'],
    ['ice', 'glace'],
    ['fighting', 'combat'],
    ['poison', 'poison'],
    ['ground', 'sol'],
    ['flying', 'vol'],
    ['psychic', 'psy'],
    ['bug', 'insecte'],
    ['rock', 'roche'],
    ['ghost', 'spectre'],
    ['dragon', 'dragon'],
    ['dark', 'ténèbres'],
    ['steel', 'acier'],
    ['fairy', 'fée']
  ]);

  const PARTIALS = [
    ['Tip: Right click (or long-press on mobile) on most elements for additional information', 'Astuce : clic droit (ou appui long sur mobile) sur la plupart des éléments pour plus d’informations'],
    ['While in combat, Pokemon get tired and lose a very small fraction of their hp yada yada.', 'En combat, les Pokémon se fatiguent et perdent une toute petite fraction de leurs PV, blablabla.'],
    ['Select ingredients to add to the curry!', 'Choisis les ingrédients à ajouter au curry !'],
    ['Auto-Refight', 'Auto-recombat'],
    ['Requires an', 'Nécessite un'],
    ['Auto-Refight Ticket', 'Ticket d’auto-recombat'],
    ['Click here to add tags', 'Clique ici pour ajouter des tags'],
    ['Select a move below and replace it with one of the list of learnt moves', 'Sélectionne une capacité ci-dessous et remplace-la par une capacité de la liste apprise'],
    ['This project is entirely unofficial!', 'Ce projet est entièrement non officiel !'],
    ['All characters and related intellectual property featured are the exclusive property of Nintendo, Creatures Inc., and The Pokémon Company.', 'Tous les personnages et toutes les propriétés intellectuelles associées présentés ici appartiennent exclusivement à Nintendo, Creatures Inc. et The Pokémon Company.'],
    ['Any use of assets is solely for non-commercial and entertainment purposes. No ownership is claimed, and all rights remain with their respective owners', 'L’utilisation des assets est uniquement à but non commercial et de divertissement. Aucune propriété n’est revendiquée, et tous les droits restent à leurs propriétaires respectifs.'],
    ['Pokemon and trainer sprites by Pokemon Showdown', 'Sprites Pokémon et dresseurs par Pokémon Showdown'],
    ['Go check their work.\nNow.', 'Va voir leur taf. Maintenant.'],
    ['This is your savefile code', 'Voici le code de ta sauvegarde'],
    ['You can copy or paste savefile codes here to export or import saves', 'Tu peux copier ou coller ici des codes de sauvegarde pour exporter ou importer des saves'],
    ['Error loading data.', 'Erreur lors du chargement des données.'],
    ['No data found in the input', 'Aucune donnée trouvée dans le champ'],
    ['Data pasted successfully!', 'Données collées avec succès !'],
    ['Could not paste from clipboard.', 'Impossible de coller depuis le presse-papiers.'],
    ['Please paste manually or grant clipboard permissions.', 'Colle manuellement ou autorise l’accès au presse-papiers.'],
    ['Defeat increasingly difficult trainers and carve yourself a path of fame! You may unlock additional areas to explore as your progress', 'Bats des dresseurs de plus en plus coriaces et trace ton chemin vers la gloire ! Tu peux débloquer de nouvelles zones à explorer à mesure de ta progression.'],
    ['Events might house both items and Pokemon to get. Events marked with a skull signify powerful foes that usually require an item to catch (The item wont be consumed if failed to defeat) that can be acquired in the collection events.', 'Les événements peuvent contenir à la fois des objets et des Pokémon à obtenir. Les événements marqués d’un crâne signalent des ennemis puissants qui demandent souvent un objet pour être capturés (l’objet n’est pas consommé si tu échoues).'],
    ['All Events rotate every three days.', 'Tous les événements tournent tous les trois jours.'],
    ['Welcome valiant trainer to the final frontier, the Mega-Dimension, housing only the strongest Pokemon of all the universe!', 'Bienvenue, vaillant dresseur, dans la dernière frontière : la Méga-dimension, qui n’abrite que les Pokémon les plus puissants de tout l’univers !'],
    ['The Pokemon appearing on the rift are random and will change on each rotation', 'Les Pokémon apparaissant dans la faille sont aléatoires et changent à chaque rotation'],
    ['With genetics, you can modify the parameters of a level 100 Pokemon (the host) and influence them based on another Pokemon (the sample)', 'Avec la génétique, tu peux modifier les paramètres d’un Pokémon niveau 100 (l’hôte) en les influençant à partir d’un autre Pokémon (l’échantillon).'],
    ['Doing so, the level of the host will reset back to 1 while keeping all 4 of its currently selected moves, and a chance to increase its IV\'s', 'Cela remet le niveau de l’hôte à 1 tout en conservant ses 4 capacités sélectionnées, avec une chance d’augmenter ses IV.'],
    ['You can find more information about the specifics of genetics in the guide section', 'Tu trouveras plus d’infos sur la génétique dans la section guide.'],
    ['Automatically hides got Pokemon that are not new after a battle.', 'Masque automatiquement les Pokémon obtenus qui ne sont pas nouveaux après un combat.'],
    ['Excluded from this setting are: New Pokemon, Iv\'s Ups and Shiny Pokemon', 'Sont exclus de ce réglage : les nouveaux Pokémon, les boosts d’IV et les Pokémon shiny.'],
    ['Decreases the current Wild Area rotation by -1.', 'Diminue la rotation actuelle des Zones Sauvages de 1.'],
    ['Useful if you missed yesterday\'s rotation, or if your schedule doesnt line up with my game', 'Utile si tu as raté la rotation d’hier, ou si ton planning ne colle pas au jeu.'],
    ['![keyword]: Exclude from search', '![mot-clé] : exclure de la recherche'],
    ['[keywordA] or [keywordB]: Search keywordA OR keywordB', '[mot-cléA] or [mot-cléB] : chercher mot-cléA OU mot-cléB'],
    ['[keywordA] [keywordB]: Search for keywordA AND keywordB', '[mot-cléA] [mot-cléB] : chercher mot-cléA ET mot-cléB'],
    ['Pokemon keywords:', 'Mots-clés Pokémon :'],
    ['Move keywords:', 'Mots-clés capacités :'],
    ['This is a Hidden Ability.', 'C’est un talent caché.'],
    ['This move is restricted', 'Cette capacité est restreinte'],
    ['and only one of them can be present in the active moves at a time', 'et une seule d’entre elles peut être présente parmi les capacités actives à la fois'],
    ['This is a Signature Move. Signature moves will automatically be learnt at level 100', 'C’est une capacité signature. Les capacités signature sont automatiquement apprises au niveau 100'],
    ['This is an Egg Move.', 'C’est une capacité œuf.'],
    ['Affected by', 'Affectée par'],
    ['On HP bar Nº', 'À la barre de PV nº'],
    ['This is a timed encounter. Your damage will be carried on between fights. Additionally, items needed to enter will be consumed regardless if you defeat the Pokemon or not', 'C’est une rencontre chronométrée. Tes dégâts sont conservés entre les combats. De plus, les objets nécessaires pour entrer sont consommés, que tu battes le Pokémon ou non.'],
    ['Pokemon', 'Pokémon'],
    ['Same-Type-Attack-Bonus', 'bonus STAB'],
    ['Cross-Power', 'Cross Power']
  ];

  const TRAINER_PREFIXES = [
    ['Ace Trainer', 'Dresseur d’élite'],
    ['Elite Trainer', 'Dresseur Élite'],
    ['Twin Trainers', 'Jumelles'],
    ['Youngster', 'Gamin'],
    ['Lass', 'Fillette'],
    ['Beauty', 'Beauté'],
    ['Veteran', 'Vétéran'],
    ['Hiker', 'Randonneur'],
    ['Scientist', 'Scientifique'],
    ['Nurse', 'Infirmière'],
    ['Ranger', 'Ranger'],
    ['Swimmer', 'Nageur'],
    ['Psychic', 'Médium'],
    ['Gentleman', 'Gentleman'],
    ['Lady', 'Lady'],
    ['Champion', 'Champion'],
    ['Leader', 'Champion'],
    ['Captain', 'Capitaine'],
    ['Boss', 'Boss']
  ];

  const AREA_PHRASES = new Map([
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
    ['Weapons Facility', 'Complexe d’Armes']
  ]);

  const SPECIAL_SLUGS = {
    mrMime: 'mr-mime',
    mrRime: 'mr-rime',
    mimejr: 'mime-jr',
    hooh: 'ho-oh',
    porygonZ: 'porygon-z',
    typeNull: 'type-null',
    nidoranF: 'nidoran-f',
    nidoranM: 'nidoran-m',
    jangmoO: 'jangmo-o',
    hakamoO: 'hakamo-o',
    kommoO: 'kommo-o',
    tapuKoko: 'tapu-koko',
    tapuLele: 'tapu-lele',
    tapuBulu: 'tapu-bulu',
    tapuFini: 'tapu-fini',
    woChien: 'wo-chien',
    chienPao: 'chien-pao',
    tingLu: 'ting-lu',
    chiYu: 'chi-yu'
  };

  const FORM_PREFIXES = [
    ['alolan', { suffix: " d'Alola" }],
    ['galarian', { suffix: ' de Galar' }],
    ['hisuian', { suffix: ' de Hisui' }],
    ['paldean', { suffix: ' de Paldea' }],
    ['mega', { prefix: 'Méga-' }],
    ['primal', { prefix: 'Primo-' }]
  ];

  const FORM_SUFFIXES = [
    ['Attack', ' Forme Attaque'],
    ['Defense', ' Forme Défense'],
    ['Speed', ' Forme Vitesse'],
    ['Origin', ' Forme Originelle'],
    ['Altered', ' Forme Altérée'],
    ['Therian', ' Forme Totémique'],
    ['Incarnate', ' Forme Avatar'],
    ['Sky', ' Forme Céleste'],
    ['Blade', ' Forme Lame'],
    ['Shield', ' Forme Bouclier'],
    ['School', ' Banc'],
    ['Solo', ' Solo'],
    ['Midday', ' Forme Diurne'],
    ['Midnight', ' Forme Nocturne'],
    ['Dusk', ' Forme Crépusculaire']
  ];

  const REMOTE_CACHE = {
    pokemon: {},
    move: {},
    item: {},
    ability: {},
    area: {}
  };

  const REMOTE_PENDING = {
    pokemon: new Set(),
    move: new Set(),
    item: new Set(),
    ability: new Set(),
    area: new Set()
  };

  function getGlobal(name) {
    try {
      return Function(`try { return typeof ${name} !== 'undefined' ? ${name} : undefined } catch (_) { return undefined }`)();
    } catch (_) {
      return undefined;
    }
  }

  function setGlobal(name, value) {
    try {
      Function('value', `${name} = value`)(value);
      return true;
    } catch (_) {
      return false;
    }
  }

  function ensureLang() {
    const saved = getGlobal('saved') || (window.saved = window.saved || {});
    if (!saved.language) saved.language = localStorage.getItem(LANG_KEY) || DEFAULT_LANG;
    localStorage.setItem(LANG_KEY, saved.language);
    return saved.language;
  }

  function getLang() {
    return ensureLang();
  }

  function setLang(lang) {
    const saved = getGlobal('saved') || (window.saved = window.saved || {});
    saved.language = lang || DEFAULT_LANG;
    localStorage.setItem(LANG_KEY, saved.language);
  }

  function preservePadding(original, replacement) {
    const lead = original.match(/^\s*/)?.[0] || '';
    const tail = original.match(/\s*$/)?.[0] || '';
    return `${lead}${replacement}${tail}`;
  }

  function humanizeId(id) {
    if (typeof id !== 'string') return id;
    return id
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
      .replace(/_/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/\bVs\b/g, 'VS')
      .replace(/\bTm\b/g, 'TM')
      .replace(/\bPkmn\b/g, 'Pokémon');
  }

  function exactTranslate(text) {
    const trimmed = text.trim();
    if (!trimmed) return text;
    const hit = EXACT.get(trimmed);
    return hit ? preservePadding(text, hit) : text;
  }

  function translateTrainerName(text) {
    let out = text;
    for (const [en, fr] of TRAINER_PREFIXES) {
      out = out.replace(new RegExp(`^${en}\\s+`, 'i'), `${fr} `);
    }
    return out;
  }

  function translateAreaPhrase(text) {
    if (AREA_PHRASES.has(text)) return AREA_PHRASES.get(text);
    let out = text;
    out = out.replace(/^Defeat\s+/i, 'Vaincre ');
    out = translateTrainerName(out);
    out = out
      .replace(/Gemstone Cavern/g, 'Caverne de Gemmes')
      .replace(/Frozen Lake/g, 'Lac Gelé')
      .replace(/Abandoned Manor/g, 'Manoir Abandonné')
      .replace(/Draco Lair/g, 'Antre Draconique')
      .replace(/Mountain Trail/g, 'Sentier de Montagne')
      .replace(/Tea Parlor/g, 'Salon de Thé')
      .replace(/Pokemon Dojo/g, 'Dojo Pokémon')
      .replace(/Sky High/g, 'Hauts Cieux')
      .replace(/Dank Cave/g, 'Caverne Sombre')
      .replace(/Forest Shrine/g, 'Sanctuaire de la Forêt')
      .replace(/Street Circus/g, 'Cirque de Rue')
      .replace(/Weapons Facility/g, 'Complexe d’Armes');
    return out;
  }

  function translateDynamic(text) {
    let out = text;

    const rules = [
      [/^Team\s+(\d+)$/i, 'Équipe $1'],
      [/^Select a pokemon to teach\s+(.+)$/i, 'Choisis un Pokémon à qui apprendre $1'],
      [/^Time left:\s*(.+)$/i, 'Temps restant : $1'],
      [/^Floor:\s*(.+)$/i, 'Étage : $1'],
      [/^Highest Floor:\s*(.+)$/i, 'Meilleur étage : $1'],
      [/^Score:\s*(.+)$/i, 'Score : $1'],
      [/^Highest Score:\s*(.+)$/i, 'Meilleur score : $1'],
      [/^(\d+)\s+Remaining$/i, '$1 restants'],
      [/^lvl\s*(\d+)$/i, 'Niv. $1'],
      [/^Level\s*(\d+)$/i, 'Niveau $1'],
      [/^Type\s+(.+)$/i, 'Type $1'],
      [/^Defeat\s+(.+)$/i, 'Vaincre $1'],
      [/^New Dungeon:\s*(.+)$/i, 'Nouveau donjon : $1'],
      [/^New Wild Area unlocked$/i, 'Nouvelle Zone Sauvage débloquée'],
      [/^Mystery Gift unlocked$/i, 'Cadeau mystère débloqué'],
      [/^Export Reward unlocked$/i, 'Récompense d’export débloquée'],
      [/^Poke-Mart unlocked$/i, 'Poke-Mart débloqué'],
      [/^x([\d.]+)\s+Item drop$/i, 'x$1 butin d’objets'],
      [/^x([\d.]+)\s+Cross power damage$/i, 'x$1 dégâts Cross Power'],
      [/^x([\d.]+)\s+STAB damage$/i, 'x$1 dégâts STAB'],
      [/^Pay and cook\s*\((.+)\)$/i, 'Payer et cuisiner ($1)'],
      [/^Tag:\s*(.+)$/i, 'Tag : $1'],
      [/^On HP bar Nº(\d+) depleted$/i, 'À la barre de PV nº$1 vidée'],
      [/^Highest Spiraling Tower floor reached:\s*(.+)$/i, 'Meilleur étage atteint dans la Tour Spirale : $1']
    ];

    for (const [regex, replacement] of rules) out = out.replace(regex, replacement);

    out = out
      .replace(/\bPokemon\b/g, 'Pokémon')
      .replace(/\bpokemon\b/g, 'pokémon')
      .replace(/\bLevel up\b/g, 'Montée de niveau')
      .replace(/\bMove\b/g, 'Capacité')
      .replace(/\bMoves\b/g, 'Capacités')
      .replace(/\bAbility\b/g, 'Talent')
      .replace(/\bAbilities\b/g, 'Talents')
      .replace(/\bRibbon\b/g, 'Ruban')
      .replace(/\bRibbons\b/g, 'Rubans')
      .replace(/\bField Effects\b/g, 'Effets de terrain')
      .replace(/\bVictory Rewards\b/g, 'Récompenses de victoire')
      .replace(/\bTeam Preview\b/g, 'Aperçu de l’équipe')
      .replace(/\bArea Pokemon\b/g, 'Pokémon de la zone');

    return out;
  }

  function translateString(text) {
    if (typeof text !== 'string') return text;
    if (getLang() !== 'fr') return text;

    let out = exactTranslate(text);
    out = translateAreaPhrase(out);
    out = translateDynamic(out);

    for (const [search, replace] of PARTIALS) {
      out = out.split(search).join(replace);
    }

    return out;
  }

  function detectKind(id) {
    if (typeof id !== 'string') return null;
    if (getGlobal('pkmn')?.[id]) return 'pokemon';
    if (getGlobal('move')?.[id]) return 'move';
    if (getGlobal('item')?.[id]) return 'item';
    if (getGlobal('ability')?.[id]) return 'ability';
    if (getGlobal('areas')?.[id]) return 'area';
    return null;
  }

  function camelToKebab(id) {
    if (SPECIAL_SLUGS[id]) return SPECIAL_SLUGS[id];
    return id
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
      .replace(/_/g, '-')
      .toLowerCase();
  }

  function parsePokemonId(id) {
    for (const [prefix, cfg] of FORM_PREFIXES) {
      if (id.startsWith(prefix) && id.length > prefix.length) {
        const rawBase = id.slice(prefix.length);
        const base = rawBase.charAt(0).toLowerCase() + rawBase.slice(1);
        return { base, cfg };
      }
    }
    for (const [suffix, label] of FORM_SUFFIXES) {
      if (id.endsWith(suffix) && id.length > suffix.length) {
        const base = id.slice(0, -suffix.length);
        return { base, cfg: { suffix: label } };
      }
    }
    return { base: id, cfg: null };
  }

  function applyPokemonForm(baseName, cfg) {
    if (!cfg) return baseName;
    if (cfg.prefix) return `${cfg.prefix}${baseName}`;
    if (cfg.suffix) return `${baseName}${cfg.suffix}`;
    return baseName;
  }

  function fetchFrName(kind, id) {
    if (REMOTE_CACHE[kind][id] !== undefined) return REMOTE_CACHE[kind][id];
    if (REMOTE_PENDING[kind].has(id)) return null;

    let url = null;
    let post = null;

    if (kind === 'pokemon') {
      const parsed = parsePokemonId(id);
      url = `${API}/pokemon-species/${camelToKebab(parsed.base)}`;
      post = (name) => applyPokemonForm(name, parsed.cfg);
    }

    if (kind === 'move') url = `${API}/move/${camelToKebab(id)}`;
    if (kind === 'item') url = `${API}/item/${camelToKebab(id)}`;
    if (kind === 'ability') url = `${API}/ability/${camelToKebab(id)}`;
    if (kind === 'area') {
      if (/^vs/i.test(id)) {
        REMOTE_CACHE[kind][id] = null;
        return null;
      }
      url = `${API}/location/${camelToKebab(id)}`;
    }

    if (!url) {
      REMOTE_CACHE[kind][id] = null;
      return null;
    }

    REMOTE_PENDING[kind].add(id);
    fetch(url)
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        let fr = json?.names?.find((n) => n.language?.name === 'fr')?.name || null;
        if (fr && post) fr = post(fr);
        REMOTE_CACHE[kind][id] = fr;
        if (fr) scheduleApply();
      })
      .catch(() => {
        REMOTE_CACHE[kind][id] = null;
      })
      .finally(() => {
        REMOTE_PENDING[kind].delete(id);
      });

    return null;
  }

  function translateIdentifier(id, rendered) {
    if (getLang() !== 'fr') return rendered;
    if (typeof rendered !== 'string') return rendered;

    const direct = exactTranslate(rendered);
    if (direct !== rendered) return direct;

    const kind = detectKind(id);
    if (!kind) return translateString(rendered);

    if (kind === 'area') {
      const local = translateAreaPhrase(rendered);
      const remote = fetchFrName('area', id);
      return remote || local;
    }

    if (kind === 'pokemon') {
      const parsed = parsePokemonId(id);
      const localBase = humanizeId(parsed.base);
      const local = applyPokemonForm(localBase, parsed.cfg);
      const remote = fetchFrName('pokemon', id);
      return remote || local;
    }

    if (kind === 'move' || kind === 'item' || kind === 'ability') {
      const remote = fetchFrName(kind, id);
      return remote || translateString(rendered);
    }

    return translateString(rendered);
  }

  function patchFormat() {
    const original = getGlobal('format');
    if (typeof original !== 'function' || original.__i18nFrV3) return;

    const wrapped = function (...args) {
      const result = original.apply(this, args);
      if (typeof result !== 'string') return result;
      if (typeof args[0] === 'string') return translateIdentifier(args[0], result);
      return translateString(result);
    };

    wrapped.__i18nFrV3 = true;
    setGlobal('format', wrapped);
    window.format = wrapped;
  }

  function patchStringField(entry, key) {
    if (!entry || typeof entry[key] !== 'string') return;
    const backupKey = `__i18n_original_${key}`;
    if (entry[backupKey] === undefined) entry[backupKey] = entry[key];
    entry[key] = getLang() === 'fr' ? translateString(entry[backupKey]) : entry[backupKey];
  }

  function patchFunctionField(entry, key) {
    if (!entry || typeof entry[key] !== 'function' || entry[key].__i18nFrV3) return;
    const original = entry[key];
    entry[key] = function (...args) {
      const result = original.apply(this, args);
      return typeof result === 'string' ? translateString(result) : result;
    };
    entry[key].__i18nFrV3 = true;
  }

  function patchAfterRenderField(entry, key) {
    if (!entry || typeof entry[key] !== 'function' || entry[key].__i18nAfterFrV3) return;
    const original = entry[key];
    entry[key] = function (...args) {
      const result = original.apply(this, args);
      setTimeout(() => applyTranslations(document.body), 0);
      return result;
    };
    entry[key].__i18nAfterFrV3 = true;
  }

  function patchCollection(name, cfg) {
    const collection = getGlobal(name);
    if (!collection) return;
    for (const key in collection) {
      const entry = collection[key];
      if (!entry || typeof entry !== 'object') continue;
      for (const field of cfg.stringFields || []) patchStringField(entry, field);
      for (const field of cfg.fnFields || []) patchFunctionField(entry, field);
      for (const field of cfg.afterFields || []) patchAfterRenderField(entry, field);
    }
  }

  function patchData() {
    patchCollection('item', { stringFields: ['subtitle'], fnFields: ['info'] });
    patchCollection('ability', { stringFields: ['nerf'], fnFields: ['info'] });
    patchCollection('move', { fnFields: ['info'] });
    patchCollection('pkmn', { stringFields: ['lore'] });
    patchCollection('areas', { stringFields: ['name'], afterFields: ['encounterEffect'] });
    patchCollection('field', { fnFields: ['info'] });
    patchCollection('skill', { fnFields: ['info'] });
    patchCollection('guide', { stringFields: ['name'], fnFields: ['description'] });
    patchCollection('ribbon', { stringFields: ['name', 'description'] });
    patchCollection('training', { stringFields: ['name', 'info'] });
  }

  function insertLanguageSetting() {
    const settingsList = document.querySelector('.settings-list');
    if (!settingsList || document.getElementById('settings-language')) return;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = 'Language: <select id="settings-language"><option value="fr">français</option><option value="en">english</option></select>';
    settingsList.insertBefore(wrapper, settingsList.firstChild);

    const select = wrapper.querySelector('#settings-language');
    select.value = getLang();
    select.addEventListener('change', () => {
      setLang(select.value);
      window.location.reload();
    });
  }

  function syncLanguageSetting() {
    const select = document.getElementById('settings-language');
    if (select) select.value = getLang();
  }

  function shouldSkipTextNode(node) {
    const parent = node.parentElement;
    if (!parent) return true;
    return ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName);
  }

  function translateTextNodes(root) {
    if (!root || getLang() !== 'fr') return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (shouldSkipTextNode(node)) return NodeFilter.FILTER_REJECT;
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const nodes = [];
    let current;
    while ((current = walker.nextNode())) nodes.push(current);

    for (const node of nodes) {
      const translated = translateString(node.nodeValue);
      if (translated !== node.nodeValue) node.nodeValue = translated;
    }
  }

  function translateAttributes(root) {
    if (!root || getLang() !== 'fr') return;
    root.querySelectorAll('[placeholder], [title], [aria-label]').forEach((el) => {
      ['placeholder', 'title', 'aria-label'].forEach((attr) => {
        const value = el.getAttribute(attr);
        if (!value) return;
        const translated = translateString(value);
        if (translated !== value) el.setAttribute(attr, translated);
      });
    });
  }

  function translateTooltipBoxes() {
    ['tooltipTitle', 'tooltipMid', 'tooltipBottom'].forEach((id) => {
      const el = document.getElementById(id);
      if (!el || getLang() !== 'fr') return;
      const translated = translateString(el.innerHTML);
      if (translated !== el.innerHTML) el.innerHTML = translated;
    });
  }

  function prefetchVisibleEntities() {
    if (getLang() !== 'fr') return;
    document.querySelectorAll('[data-pkmn]').forEach((el) => fetchFrName('pokemon', el.dataset.pkmn));
    document.querySelectorAll('[data-item]').forEach((el) => fetchFrName('item', el.dataset.item));
    document.querySelectorAll('[data-ability]').forEach((el) => fetchFrName('ability', el.dataset.ability));
  }

  function wrapGlobal(name) {
    const original = getGlobal(name);
    if (typeof original !== 'function' || original.__i18nFrV3) return;
    const wrapped = function (...args) {
      const result = original.apply(this, args);
      setTimeout(() => applyTranslations(document.body), 0);
      return result;
    };
    wrapped.__i18nFrV3 = true;
    setGlobal(name, wrapped);
    window[name] = wrapped;
  }

  function installWrappers() {
    [
      'openTooltip',
      'tooltipData',
      'updateSettings',
      'textData',
      'importData',
      'loadFromText',
      'pasteFromClipboard',
      'changeTheme',
      'updateItemShop',
      'createArenaCards',
      'setGuide'
    ].forEach(wrapGlobal);
  }

  function applyTranslations(root = document.body) {
    insertLanguageSetting();
    syncLanguageSetting();
    patchFormat();
    patchData();

    if (getLang() !== 'fr') {
      document.documentElement.lang = 'en';
      return;
    }

    document.documentElement.lang = 'fr';
    translateTextNodes(root);
    translateAttributes(root);
    translateTooltipBoxes();
    prefetchVisibleEntities();
  }

  let scheduled = false;
  function scheduleApply() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      applyTranslations(document.body);
    });
  }

  function startObserver() {
    if (!document.body) return;
    const observer = new MutationObserver(() => {
      if (getLang() === 'fr') scheduleApply();
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  function boot() {
    ensureLang();
    insertLanguageSetting();
    patchFormat();
    patchData();
    installWrappers();
    applyTranslations(document.body);
    startObserver();
    setInterval(() => {
      insertLanguageSetting();
      syncLanguageSetting();
      patchFormat();
      patchData();
      installWrappers();
    }, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
