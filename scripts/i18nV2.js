(function () {
  const DEFAULT_LANG = 'fr';
  const LANG_STORAGE_KEY = 'pokechillLanguage';

  function lookupGlobal(name) {
    try {
      return Function(`try { return typeof ${name} !== 'undefined' ? ${name} : undefined; } catch (e) { return undefined; }`)();
    } catch (_) {
      return undefined;
    }
  }

  function assignGlobal(name, value) {
    try {
      Function('value', `${name} = value;`)(value);
      return true;
    } catch (_) {
      return false;
    }
  }

  function ensureSavedLanguage() {
    const saved = lookupGlobal('saved');
    const local = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved) {
      if (!saved.language) saved.language = local || DEFAULT_LANG;
      localStorage.setItem(LANG_STORAGE_KEY, saved.language);
      return saved.language;
    }
    if (!local) localStorage.setItem(LANG_STORAGE_KEY, DEFAULT_LANG);
    return localStorage.getItem(LANG_STORAGE_KEY) || DEFAULT_LANG;
  }

  function getLang() {
    const saved = lookupGlobal('saved');
    if (saved?.language) return saved.language;
    return ensureSavedLanguage();
  }

  function setLang(lang) {
    const next = lang || DEFAULT_LANG;
    const saved = lookupGlobal('saved');
    if (saved) saved.language = next;
    localStorage.setItem(LANG_STORAGE_KEY, next);
  }

  const TYPE_WORDS = new Map([
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

  const STAT_WORDS = new Map([
    ['hp', 'PV'],
    ['attack', 'Attaque'],
    ['defense', 'Défense'],
    ['special attack', 'Attaque Spéciale'],
    ['special defense', 'Défense Spéciale'],
    ['speed', 'Vitesse'],
    ['attack stat', 'stat d’Attaque'],
    ['defense stat', 'stat de Défense'],
    ['special attack stat', 'stat d’Attaque Spéciale'],
    ['special defense stat', 'stat de Défense Spéciale'],
    ['speed stat', 'stat de Vitesse']
  ]);

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
    ['AFK time is being calculated, please wait...', "Le temps AFK est en cours de calcul, merci de patienter..."],
    ['Right Click/Long press to see the details', 'Clic droit / appui long pour voir les détails'],
    ['Yeah!', 'Oui !'],
    ['Version Notice', 'Note de version'],
    ['Are you sure you want to delete all data forever?', 'Tu es sûr de vouloir supprimer toutes les données définitivement ?'],
    ['Story-driven battles and curated challenges live here.', 'Les combats scénarisés et défis préparés se trouvent ici.'],
    ['More Main Challenges are coming soon.', 'D’autres défis principaux arrivent bientôt.'],
    ['Create custom battles from your own pools and enemy teams.', 'Crée des combats personnalisés à partir de tes propres pools et équipes ennemies.'],
    ['Import and export challenge codes to share them.', 'Importe et exporte des codes de défi pour les partager.'],
    ['Trainers have twice the health.', 'Les dresseurs ont deux fois plus de PV.'],
    ['Only applies to VS Trainers', 'S’applique uniquement aux Dresseurs VS'],
    ['This can be toggled off without any permanent changes', 'Tu peux désactiver ça sans changement permanent.'],
    ['There are no side-effects to this modifier', 'Ce modificateur n’a pas d’effet secondaire.'],
    ['This is a Hidden Ability.', 'C’est un talent caché.'],
    ['This is an Egg Move.', 'C’est une capacité œuf.'],
    ['This move is restricted', 'Cette capacité est restreinte'],
    ['The Battle Frontier houses different types of challenges under a specific division restriction that rotates every three days.', 'La Frontière de Combat propose différents défis avec une restriction de division spécifique qui tourne tous les trois jours.'],
    ['The Pokemon appearing on the rift are random and will change on each rotation', 'Les Pokémon apparaissant dans la faille sont aléatoires et changent à chaque rotation'],
    ['All Events rotate every three days.', 'Tous les événements tournent tous les trois jours.']
  ]);

  const PARTIALS = [
    ['Tip: Right click (or long-press on mobile) on most elements for additional information', 'Astuce : clic droit (ou appui long sur mobile) sur la plupart des éléments pour plus d’informations'],
    ['While in combat, Pokemon get tired and lose a very small fraction of their hp yada yada.', 'En combat, les Pokémon se fatiguent et perdent une toute petite fraction de leurs PV, blablabla.'],
    ['Warning, power cost too high! Only 5 out of 6 maximum IV\'s per stat will be inherited!', 'Attention, coût en puissance trop élevé ! Seulement 5 IV max sur 6 par stat seront hérités !'],
    ['Pokerus detected on the host! Genetic compatibility is increased by one level!', 'Pokerus détecté sur l’hôte ! La compatibilité génétique augmente d’un niveau !'],
    ['This Pokemon is marked as Special, and cannot receive shiny mutations through genetics!', 'Ce Pokémon est marqué comme spécial et ne peut pas recevoir de mutations shiny via la génétique !'],
    ['Select ingredients to add to the curry!', 'Choisis les ingrédients à ajouter au curry !'],
    ['Pay and cook', 'Payer et cuisiner'],
    ['Auto-Refight', 'Auto-recombat'],
    ['Requires an', 'Nécessite un'],
    ['Auto-Refight Ticket', 'Ticket d’auto-recombat'],
    ['Tag:', 'Tag :'],
    ['Click here to add tags', 'Clique ici pour ajouter des tags'],
    ['Select a move below and replace it with one of the list of learnt moves', 'Sélectionne une capacité ci-dessous et remplace-la par une capacité de la liste apprise'],
    ['All characters and related intellectual property featured are the exclusive property of Nintendo, Creatures Inc., and The Pokémon Company.', 'Tous les personnages et toutes les propriétés intellectuelles associées présentés ici appartiennent exclusivement à Nintendo, Creatures Inc. et The Pokémon Company.'],
    ['Any use of assets is solely for non-commercial and entertainment purposes. No ownership is claimed, and all rights remain with their respective owners', 'L’utilisation des assets est uniquement à but non commercial et de divertissement. Aucune propriété n’est revendiquée, et tous les droits restent à leurs propriétaires respectifs.'],
    ['Made by <span onclick="secretFight(areas.missingArea.id)">Duck</span>', 'Créé par <span onclick="secretFight(areas.missingArea.id)">Duck</span>'],
    ['Pokemon and trainer sprites by Pokemon Showdown', 'Sprites Pokémon et dresseurs par Pokémon Showdown'],
    ['Go check their work.\nNow.', 'Va voir leur taf. Maintenant.'],
    ['Due to the vs rewards update you have been rewarded for your defeated trainers:', 'Suite à la mise à jour des récompenses VS, tu as reçu les récompenses de tes dresseurs vaincus :'],
    ['Your golden bottlecaps have been exchanged into bottlecaps due to frontier changes', 'Tes Capsules d’Or ont été converties en Capsules à cause des changements de la frontière'],
    ['This is your savefile code', 'Voici le code de ta sauvegarde'],
    ['You can copy or paste savefile codes here to export or import saves', 'Tu peux copier ou coller ici des codes de sauvegarde pour exporter ou importer des saves'],
    ['Error loading data.', 'Erreur lors du chargement des données.'],
    ['Element with id \'text-data-raw\' not found', 'Élément avec l’identifiant \'text-data-raw\' introuvable'],
    ['No data found in the input', 'Aucune donnée trouvée dans le champ'],
    ['Error loading data: ', 'Erreur lors du chargement des données : '],
    ['Data pasted successfully!', 'Données collées avec succès !'],
    ['Could not paste from clipboard.', 'Impossible de coller depuis le presse-papiers.'],
    ['Please paste manually or grant clipboard permissions.', 'Colle manuellement ou autorise l’accès au presse-papiers.'],
    ['The Battle Tower is an infinitely-scaling challenge in which every Pokemon defeated will increase the difficulty. Type Immunities inside this challenge will be instead converted to resistances', 'La Tour de Combat est un défi à difficulté infinie : chaque Pokémon vaincu augmente la difficulté. Les immunités de type y sont converties en résistances.'],
    ['Failing a training will result in no gains', 'Échouer un entraînement ne donne aucun gain'],
    ['Welcome valiant trainer to the final frontier, the Mega-Dimension, housing only the strongest Pokemon of all the universe!', 'Bienvenue, vaillant dresseur, dans la dernière frontière : la Méga-dimension, qui n’abrite que les Pokémon les plus puissants de tout l’univers !'],
    ['With genetics, you can modify the parameters of a level 100 Pokemon (the host) and influence them based on another Pokemon (the sample)', 'Avec la génétique, tu peux modifier les paramètres d’un Pokémon niveau 100 (l’hôte) en les influençant à partir d’un autre Pokémon (l’échantillon).'],
    ['Doing so, the level of the host will reset back to 1 while keeping all 4 of its currently selected moves, and a chance to increase its IV\'s', 'Cela remet le niveau de l’hôte à 1 tout en conservant ses 4 capacités sélectionnées, avec une chance d’augmenter ses IV.'],
    ['Genetics can also be influenced by using genetic-aiding items, which you can use at the end of the operation', 'La génétique peut aussi être influencée avec des objets d’assistance génétique, utilisables à la fin de l’opération.'],
    ['You can find more information about the specifics of genetics in the guide section', 'Tu trouveras plus d’infos sur la génétique dans la section guide.'],
    ['Every 12 hours, some of your Pokemon will contract Pokerus.', 'Toutes les 12 heures, certains de tes Pokémon attrapent le Pokerus.'],
    ['This virus is entirely beneficial, and will add one level of compatibility to the Pokemon in genetics when used as a host', 'Ce virus est entièrement bénéfique et ajoute un niveau de compatibilité au Pokémon utilisé comme hôte en génétique.'],
    ['Automatically hides got Pokemon that are not new after a battle.', 'Masque automatiquement les Pokémon obtenus qui ne sont pas nouveaux après un combat.'],
    ['Excluded from this setting are: New Pokemon, Iv\'s Ups and Shiny Pokemon', 'Sont exclus de ce réglage : les nouveaux Pokémon, les boosts d’IV et les Pokémon shiny.'],
    ['Decreases the current Wild Area rotation by -1.', 'Diminue la rotation actuelle des Zones Sauvages de 1.'],
    ['Useful if you missed yesterday\'s rotation, or if your schedule doesnt line up with my game', 'Utile si tu as raté la rotation d’hier, ou si ton planning ne colle pas au jeu.'],
    ['![keyword]: Exclude from search', '![mot-clé] : exclure de la recherche'],
    ['[keywordA] or [keywordB]: Search keywordA OR keywordB', '[mot-cléA] or [mot-cléB] : chercher mot-cléA OU mot-cléB'],
    ['[keywordA] [keywordB]: Search for keywordA AND keywordB', '[mot-cléA] [mot-cléB] : chercher mot-cléA ET mot-cléB'],
    ['Pokemon keywords:', 'Mots-clés Pokémon :'],
    ['Move keywords:', 'Mots-clés capacités :'],
    ['Keywords:', 'Mots-clés :'],
    ['These abilities follow the same rules as regular abilities, and wont stack with already existing ones', 'Ces talents suivent les mêmes règles que les talents normaux et ne se cumulent pas avec ceux déjà présents.'],
    ['and only one of them can be present in the active moves at a time', 'et une seule d’entre elles peut être présente parmi les capacités actives à la fois'],
    ['This is a Signature Move. Signature moves will automatically be learnt at level 100', 'C’est une capacité signature. Les capacités signature sont automatiquement apprises au niveau 100'],
    ['Highest Spiraling Tower floor reached:', 'Meilleur étage atteint dans la Tour Spirale :'],
    ['Weather changed by the user is extended by 15 turns', 'La météo modifiée par l’utilisateur est prolongée de 15 tours'],
    ['Works always for everyone regardless of the user', 'Fonctionne toujours pour tout le monde, quel que soit l’utilisateur'],
    ['Only one Z crystal can be equipped per team', 'Un seul cristal Z peut être équipé par équipe'],
    ['This attack benefits from holder stats and typing but not from their abilities nor buffs.', 'Cette attaque bénéficie des stats et du type du porteur, mais pas de ses talents ni de ses buffs.'],
    ['When slotted as a non-hidden ability:', 'Quand équipé comme talent non caché :'],
    ['Damage reduced to', 'dégâts réduits à'],
    ['Speed reduced to', 'vitesse réduite à'],
    ['Turns reduced to', 'durée réduite à']
  ];

  function preservePadding(original, replacement) {
    const leading = original.match(/^\s*/)?.[0] || '';
    const trailing = original.match(/\s*$/)?.[0] || '';
    return `${leading}${replacement}${trailing}`;
  }

  function translateTypeWord(value) {
    const key = value.trim().toLowerCase();
    return TYPE_WORDS.get(key) || value;
  }

  function translateStatWord(value) {
    const key = value.trim().toLowerCase();
    return STAT_WORDS.get(key) || value;
  }

  function translateExact(value) {
    const trimmed = value.trim();
    if (!trimmed) return value;
    const direct = EXACT.get(trimmed) || TYPE_WORDS.get(trimmed.toLowerCase()) || STAT_WORDS.get(trimmed.toLowerCase());
    return direct ? preservePadding(value, direct) : value;
  }

  function replaceStandalone(text, search, replace) {
    return text.replace(new RegExp(`\\b${search}\\b`, 'g'), replace);
  }

  function translateFormula(value) {
    const formulas = [
      [/^\(([^)]+)\)$/i, (_, type) => `(${translateTypeWord(type)})`],
      [/^Team\s+(\d+)$/i, (_, n) => `Équipe ${n}`],
      [/^Select a pokemon to teach\s+(.+)$/i, (_, move) => `Choisis un Pokémon à qui apprendre ${move}`],
      [/^Time left:\s*(.+)$/i, (_, v) => `Temps restant : ${v}`],
      [/^Floor:\s*(.+)$/i, (_, v) => `Étage : ${v}`],
      [/^Highest Floor:\s*(.+)$/i, (_, v) => `Meilleur étage : ${v}`],
      [/^Score:\s*(.+)$/i, (_, v) => `Score : ${v}`],
      [/^Highest Score:\s*(.+)$/i, (_, v) => `Meilleur score : ${v}`],
      [/^(\d+)\s+Remaining$/i, (_, v) => `${v} restants`],
      [/^lvl\s*(\d+)$/i, (_, v) => `Niv. ${v}`],
      [/^Type\s+(.+)$/i, (_, v) => `Type ${translateTypeWord(v)}`],
      [/^x([\d.]+)\s+Item drop$/i, (_, v) => `x${v} butin d’objets`],
      [/^x([\d.]+)\s+Cross power damage$/i, (_, v) => `x${v} dégâts Cross Power`],
      [/^x([\d.]+)\s+STAB damage$/i, (_, v) => `x${v} dégâts STAB`],
      [/^Pay and cook\s*\((.+)\)$/i, (_, v) => `Payer et cuisiner (${v})`],
      [/^When held: Increase the damage of (.+?)-Type moves by x(.+)$/i, (_, type, mult) => `Tenu : augmente les dégâts des capacités de type ${translateTypeWord(type)} de x${mult}`],
      [/^When held: Increases the damage of (.+?)-Type moves by x(.+)$/i, (_, type, mult) => `Tenu : augmente les dégâts des capacités de type ${translateTypeWord(type)} de x${mult}`],
      [/^When held: Decreases the super-effective damage taken from (.+?)-Type moves by (.+)%$/i, (_, type, amount) => `Tenu : réduit de ${amount} % les dégâts super efficaces subis des capacités de type ${translateTypeWord(type)}`],
      [/^When held: Increases the duration of (.+?) by (.+) turns$/i, (_, target, turns) => `Tenu : augmente la durée de ${target} de ${turns} tours`],
      [/^When held: Increase the chance of encountering a wild shiny pokemon by (.+)%\.(.+)$/i, (_, amount, rest) => `Tenu : augmente de ${amount} % les chances de rencontrer un Pokémon sauvage shiny.${rest}`],
      [/^Use: Increase the (.+?) IV of a Pokemon by 1$/i, (_, stat) => `Utilisation : augmente l’IV ${translateStatWord(stat)} d’un Pokémon de 1`],
      [/^Use: Evolve certain kinds of Pokemon \(Must be level (.+?)\+\)$/i, (_, level) => `Utilisation : fait évoluer certains Pokémon (niveau ${level}+ requis)`],
      [/^Use: Evolve a certain Pokemon$/i, () => `Utilisation : fait évoluer un Pokémon spécifique`],
      [/^Genetics-aiding item: (.+)$/i, (_, text) => `Objet d’assistance génétique : ${text}`],
      [/^Grants immunity to (.+)$/i, (_, target) => `Confère l’immunité à ${target}`],
      [/^Halves the damage received of (.+?)-type moves$/i, (_, type) => `Réduit de moitié les dégâts reçus des capacités de type ${translateTypeWord(type)}`],
      [/^Halves damage received from (.+) and (.+)-type moves$/i, (_, a, b) => `Réduit de moitié les dégâts reçus des capacités de type ${translateTypeWord(a)} et ${translateTypeWord(b)}`],
      [/^Increases the power of (.+?)-type moves by (.+)% below (.+)% HP$/i, (_, type, amount, hp) => `Augmente la puissance des capacités de type ${translateTypeWord(type)} de ${amount} % sous ${hp} % de PV`],
      [/^Increases (.+?) by (.+)% on (.+)$/i, (_, stat, amount, cond) => `Augmente ${translateStatWord(stat)} de ${amount} % sous ${cond}`],
      [/^Increases (.+?) by (.+)% if afflicted with a status effect$/i, (_, stat, amount) => `Augmente ${translateStatWord(stat)} de ${amount} % si affecté par un statut`],
      [/^Increase (.+?) by (.+)% when hit with a super-effective move$/i, (_, stat, amount) => `Augmente ${translateStatWord(stat)} de ${amount} % lorsqu’il est touché par une capacité super efficace`],
      [/^15% chance to inflict (.+) when attacked$/i, (_, status) => `15 % de chances d’infliger ${status} quand il est attaqué`],
      [/^5% chance to inflict (.+) when attacked$/i, (_, status) => `5 % de chances d’infliger ${status} quand il est attaqué`],
      [/^30% chance to increase (.+?) by (.+)%$/i, (_, stat, amount) => `30 % de chances d’augmenter ${translateStatWord(stat)} de ${amount} %`],
      [/^10% chance to inflict (.+)$/i, (_, status) => `10 % de chances d’infliger ${status}`],
      [/^Nullifies received (.+?)-type moves$/i, (_, type) => `Annule les capacités reçues de type ${translateTypeWord(type)}`],
      [/^Nullifies received (.+?)-type moves and increases (.+?) by (.+)% after being hit with one$/i, (_, type, stat, amount) => `Annule les capacités reçues de type ${translateTypeWord(type)} et augmente ${translateStatWord(stat)} de ${amount} % après en avoir subi une`],
      [/^Moves always hit regardless of the type$/i, () => `Les capacités touchent toujours, quel que soit le type`],
      [/^Moves that hit multiple times always hit their maximum amount$/i, () => `Les capacités multi-coups frappent toujours leur nombre maximal de fois`],
      [/^Moves that execute slower than usual have their base power multiplied by x(.+)$/i, (_, mult) => `Les capacités qui s’exécutent plus lentement que d’habitude ont leur puissance de base multipliée par x${mult}`],
      [/^Moves that execute faster than usual have their base power multiplied by x(.+)$/i, (_, mult) => `Les capacités qui s’exécutent plus vite que d’habitude ont leur puissance de base multipliée par x${mult}`],
      [/^Moves that are resisted by typing do instead normal damage$/i, () => `Les capacités normalement résistées par le type infligent à la place des dégâts neutres`],
      [/^Received damage from non-Super-Effective moves are reduced by (.+)%$/i, (_, amount) => `Les dégâts reçus des capacités non super efficaces sont réduits de ${amount} %`],
      [/^Secondary effect of moves are executed twice$/i, () => `Les effets secondaires des capacités se déclenchent deux fois`],
      [/^Physical damage dealt is multiplied by x(.+)$/i, (_, mult) => `Les dégâts physiques infligés sont multipliés par x${mult}`],
      [/^Changes the weather to (.+?) and increases (.+?) by (.+)%$/i, (_, weather, stat, amount) => `Change la météo en ${weather} et augmente ${translateStatWord(stat)} de ${amount} %`],
      [/^Changes the weather to (.+?) when entering or switching into the battle$/i, (_, weather) => `Change la météo en ${weather} en entrant ou en revenant au combat`],
      [/^Temporarily changes the type of the user to the type of the first move slot, and increases Speed by (.+)%$/i, (_, amount) => `Change temporairement le type de l’utilisateur pour celui de la première capacité, et augmente sa Vitesse de ${amount} %`],
      [/^Inflicts (.+) to the entire team$/i, (_, status) => `Inflige ${status} à toute l’équipe`],
      [/^Decreases enemy (.+?) by (.+)% and (.+?) by (.+)%$/i, (_, statA, amountA, statB, amountB) => `Réduit la ${translateStatWord(statA)} ennemie de ${amountA} % et la ${translateStatWord(statB)} ennemie de ${amountB} %`],
      [/^Decreases enemy (.+?) by (.+)%$/i, (_, stat, amount) => `Réduit la ${translateStatWord(stat)} ennemie de ${amount} %`],
      [/^Decreases (.+?), (.+?) and (.+?) by (.+)%$/i, (_, a, b, c, amount) => `Réduit ${translateStatWord(a)}, ${translateStatWord(b)} et ${translateStatWord(c)} de ${amount} %`],
      [/^Decreases (.+?) by (.+)%$/i, (_, stat, amount) => `Réduit ${translateStatWord(stat)} de ${amount} %`],
      [/^Increases (.+?) by (.+)%$/i, (_, stat, amount) => `Augmente ${translateStatWord(stat)} de ${amount} %`],
      [/^Status effects are cleared when switching Pokemon$/i, () => `Les altérations d’état sont retirées lors du switch`],
      [/^Can only take damage from direct damaging moves$/i, () => `Ne peut subir des dégâts que des capacités offensives directes`],
      [/^Ghost-type pokemon can be hit with Normal and Fighting-type moves$/i, () => `Les Pokémon de type Spectre peuvent être touchés par les capacités Normal et Combat`],
      [/^When attacking, ignores the target's stat changes$/i, () => `En attaquant, ignore les changements de stats de la cible`],
      [/^Multiplies by 1\.5x the base damage of moves with equal or less than 60 power$/i, () => `Multiplie par 1,5 la puissance de base des capacités de puissance 60 ou moins`],
      [/^Multiplies the damage by x(.+) when the opposite Pokemon shares a type$/i, (_, mult) => `Multiplie les dégâts par x${mult} quand le Pokémon adverse partage un type`],
      [/^Increases the weight of rare item drops by (.+)% \(Can stack\)\.$/i, (_, amount) => `Augmente le poids des butins rares de ${amount} % (cumulable).`],
      [/^Positive secondary effect of damaging moves are removed, and their damage is multiplied by x(.+)$/i, (_, mult) => `Les effets secondaires positifs des capacités offensives sont retirés, et leurs dégâts sont multipliés par x${mult}`],
      [/^"(.+?)"-related moves have their base power multiplied by x(.+) \((.+)\)$/i, (_, kind, mult, list) => `Les capacités liées à « ${kind} » ont leur puissance de base multipliée par x${mult} (${list})`],
      [/^"(.+?)"-related moves are executed twice as fast \((.+)\)$/i, (_, kind, list) => `Les capacités liées à « ${kind} » s’exécutent deux fois plus vite (${list})`],
      [/^"(.+?)"-related moves are executed x(.+) faster than usual$/i, (_, kind, mult) => `Les capacités liées à « ${kind} » s’exécutent x${mult} plus vite que d’habitude`],
      [/^Enemy damage over time from (.+) is doubled while this Pokemon is active$/i, (_, status) => `Les dégâts sur la durée subis par l’ennemi via ${status} sont doublés tant que ce Pokémon est actif`],
      [/^Status effects applied to the target last x(.+) longer$/i, (_, mult) => `Les altérations d’état appliquées à la cible durent x${mult} plus longtemps`],
      [/^Multiply the damage dealt by x(.+) if the target has a status effect$/i, (_, mult) => `Multiplie les dégâts infligés par x${mult} si la cible a un statut`],
      [/^Copies the positive stat increases of the enemy$/i, () => `Copie les augmentations de stats positives de l’ennemi`],
      [/^Prevents all stat decreases$/i, () => `Empêche toutes les baisses de stats`],
      [/^Super-effective damage becomes neutral$/i, () => `Les dégâts super efficaces deviennent neutres`],
      [/^Positive stats up last x(.+) longer$/i, (_, mult) => `Les bonus de stats positifs durent x${mult} plus longtemps`],
      [/^The user temporarily gets the \(non-hidden\) ability of the last defeated Pokemon on your team\.(.+)$/i, (_, rest) => `L’utilisateur obtient temporairement le talent (non caché) du dernier Pokémon mis K.O. dans ton équipe.${rest}`],
      [/^Decreases fatigue damage of the user by x(.+)$/i, (_, mult) => `Réduit les dégâts de fatigue de l’utilisateur par x${mult}`],
      [/^Decrease enemy Speed by (.+)% on getting hit$/i, (_, amount) => `Réduit la Vitesse ennemie de ${amount} % lorsqu’il est touché`],
      [/^Prevents all Pokemon on your team from (.+)$/i, (_, status) => `Empêche tous les Pokémon de ton équipe de subir ${status}`],
      [/^If any of your Pokemon get defeated while battling a trainer of VS Trainers, it will permanently be unusuable until you turn this mode off$/i, () => `Si l’un de tes Pokémon est vaincu contre un Dresseur VS, il devient inutilisable tant que ce mode reste activé`],
      [/^All of your Pokemon have functionally max IVs regardless of their actual IVs\.$/i, () => `Tous tes Pokémon ont fonctionnellement des IV max, peu importe leurs vrais IV.`],
      [/^Every 12h you can select up to three abilities to be active for your entire team during raids for 1 hour\.$/i, () => `Toutes les 12 h, tu peux sélectionner jusqu’à trois talents actifs pour toute ton équipe pendant 1 heure en raid.`]
    ];

    for (const [regex, repl] of formulas) {
      if (regex.test(value)) return value.replace(regex, repl);
    }
    return value;
  }

  function translateString(value) {
    if (typeof value !== 'string') return value;
    if (getLang() !== 'fr') return value;

    let out = translateExact(value);
    if (out !== value) return out;

    out = translateFormula(out);

    for (const [search, replace] of PARTIALS) {
      out = out.split(search).join(replace);
    }

    out = out
      .split('Pokemon').join('Pokémon')
      .split('pokemon').join('pokémon')
      .split('Type moves').join('capacités de type')
      .split('Type move').join('capacité de type')
      .split('-Type').join('-type')
      .split('When held:').join('Tenu :')
      .split('Use:').join('Utilisation :')
      .split('Increase the damage of').join('augmente les dégâts des capacités de type')
      .split('Increases the damage of').join('augmente les dégâts des capacités de type')
      .split('Increase the damage dealt by').join('augmente les dégâts infligés par')
      .split('Increases the damage dealt by').join('augmente les dégâts infligés par')
      .split('Decreases the super-effective damage taken from').join('réduit les dégâts super efficaces subis des capacités de type')
      .split('Increases the duration of').join('augmente la durée de')
      .split('turns').join('tours')
      .split('turn').join('tour')
      .split('weather').join('météo')
      .split('wild shiny pokemon').join('Pokémon sauvage shiny')
      .split('wild shiny Pokemon').join('Pokémon sauvage shiny')
      .split('the holder').join('le porteur')
      .split('for everyone').join('pour tout le monde')
      .split('regardless of').join('peu importe')
      .split('chance to inflict').join('chances d’infliger')
      .split('when attacked').join('quand il est attaqué')
      .split('when defeating a Pokemon').join('quand il met K.O. un Pokémon')
      .split('when defeating a pokemon').join('quand il met K.O. un pokémon')
      .split('when over 50% HP').join('au-dessus de 50 % de PV')
      .split('if no item is being held').join('si aucun objet n’est tenu')
      .split('if afflicted with a status effect').join('si affecté par un statut')
      .split('Prevents negative stat changes and status effects while on').join('Empêche les baisses de stats et les altérations d’état sous')
      .split('Increases Speed by 50% on').join('Augmente la Vitesse de 50 % sous')
      .split('Increases Special Attack by 50% on').join('Augmente l’Attaque Spéciale de 50 % sous')
      .split('Increases Attack by 50% on').join('Augmente l’Attaque de 50 % sous')
      .split('Increases Defense by 50% on').join('Augmente la Défense de 50 % sous')
      .split('Increases Special Defense by 50% if afflicted with a status effect').join('Augmente la Défense Spéciale de 50 % si affecté par un statut')
      .split('Increases Defense by 50% if afflicted with a status effect').join('Augmente la Défense de 50 % si affecté par un statut')
      .split('Increases Special Attack by 50% if afflicted with a status effect').join('Augmente l’Attaque Spéciale de 50 % si affecté par un statut')
      .split('Nullifies received').join('Annule les capacités reçues de type')
      .split('and increases Speed by 50% after being hit with one').join('et augmente la Vitesse de 50 % après en avoir subi une')
      .split('Changes the weather to').join('Change la météo en')
      .split('when entering or switching into the battle').join('en entrant ou en revenant au combat')
      .split('Secondary effect of moves are executed twice').join('Les effets secondaires des capacités se déclenchent deux fois')
      .split('Physical damage dealt is multiplied by x2').join('Les dégâts physiques infligés sont multipliés par x2')
      .split('Prevents all stat decreases').join('Empêche toutes les baisses de stats')
      .split('Super-effective damage becomes neutral').join('Les dégâts super efficaces deviennent neutres')
      .split('No ownership is claimed').join('Aucune propriété n’est revendiquée')
      .split('Moves always hit regardless of the type').join('Les capacités touchent toujours, quel que soit le type');

    out = replaceStandalone(out, 'Fire', 'Feu');
    out = replaceStandalone(out, 'Water', 'Eau');
    out = replaceStandalone(out, 'Electric', 'Électrik');
    out = replaceStandalone(out, 'Grass', 'Plante');
    out = replaceStandalone(out, 'Ice', 'Glace');
    out = replaceStandalone(out, 'Fighting', 'Combat');
    out = replaceStandalone(out, 'Ground', 'Sol');
    out = replaceStandalone(out, 'Flying', 'Vol');
    out = replaceStandalone(out, 'Psychic', 'Psy');
    out = replaceStandalone(out, 'Bug', 'Insecte');
    out = replaceStandalone(out, 'Rock', 'Roche');
    out = replaceStandalone(out, 'Ghost', 'Spectre');
    out = replaceStandalone(out, 'Dark', 'Ténèbres');
    out = replaceStandalone(out, 'Steel', 'Acier');
    out = replaceStandalone(out, 'Fairy', 'Fée');

    return out;
  }

  function translateAny(value) {
    if (typeof value === 'string') return translateString(value);
    return value;
  }

  function shouldSkipNode(node) {
    const parent = node.parentElement;
    if (!parent) return true;
    const tag = parent.tagName;
    return tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT';
  }

  function translateTextNodes(root) {
    if (!root || getLang() !== 'fr') return;
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

  function translateHtmlBox(id) {
    const el = document.getElementById(id);
    if (!el || getLang() !== 'fr') return;
    const translated = translateString(el.innerHTML);
    if (translated !== el.innerHTML) el.innerHTML = translated;
  }

  function translateTooltipContent() {
    translateHtmlBox('tooltipTitle');
    translateHtmlBox('tooltipMid');
    translateHtmlBox('tooltipBottom');
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

  function syncLanguageSelect() {
    const select = document.getElementById('settings-language');
    if (select) select.value = getLang();
  }

  function patchFnReturningString(obj, key) {
    if (!obj || typeof obj[key] !== 'function' || obj[key].__i18nWrapped) return;
    const original = obj[key];
    obj[key] = function (...args) {
      const result = original.apply(this, args);
      return typeof result === 'string' ? translateString(result) : result;
    };
    obj[key].__i18nWrapped = true;
  }

  function patchStringField(obj, key) {
    if (!obj || typeof obj[key] !== 'string') return;
    if (obj[`__i18n_original_${key}`] === undefined) obj[`__i18n_original_${key}`] = obj[key];
    obj[key] = getLang() === 'fr' ? translateString(obj[`__i18n_original_${key}`]) : obj[`__i18n_original_${key}`];
  }

  function patchCollection(collection, config) {
    if (!collection) return;
    for (const id in collection) {
      const entry = collection[id];
      if (!entry || typeof entry !== 'object') continue;
      for (const key of config.stringFields || []) patchStringField(entry, key);
      for (const key of config.fnFields || []) patchFnReturningString(entry, key);
      for (const key of config.fnRunAfter || []) {
        if (typeof entry[key] !== 'function' || entry[key].__i18nWrapped) continue;
        const original = entry[key];
        entry[key] = function (...args) {
          const result = original.apply(this, args);
          setTimeout(() => applyTranslations(document.body), 0);
          return result;
        };
        entry[key].__i18nWrapped = true;
      }
    }
  }

  function patchFormat() {
    const formatFn = lookupGlobal('format');
    if (typeof formatFn !== 'function' || formatFn.__i18nWrapped) return;
    const wrapped = function (...args) {
      const result = formatFn.apply(this, args);
      return typeof result === 'string' ? translateString(result) : result;
    };
    wrapped.__i18nWrapped = true;
    assignGlobal('format', wrapped);
  }

  function patchGlobals() {
    patchCollection(lookupGlobal('item'), {
      stringFields: ['subtitle'],
      fnFields: ['info']
    });

    patchCollection(lookupGlobal('ability'), {
      stringFields: ['nerf'],
      fnFields: ['info']
    });

    patchCollection(lookupGlobal('move'), {
      fnFields: ['info']
    });

    patchCollection(lookupGlobal('pkmn'), {
      stringFields: ['lore']
    });

    patchCollection(lookupGlobal('areas'), {
      stringFields: ['name'],
      fnRunAfter: ['encounterEffect']
    });

    patchFormat();
  }

  function wrapFunction(name) {
    const original = lookupGlobal(name);
    if (typeof original !== 'function' || original.__i18nWrapped) return;

    const wrapped = function (...args) {
      const result = original.apply(this, args);
      setTimeout(() => applyTranslations(document.body), 0);
      return result;
    };

    wrapped.__i18nWrapped = true;
    assignGlobal(name, wrapped);
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
      'createArenaCards'
    ].forEach(wrapFunction);
  }

  function applyTranslations(root = document.body) {
    insertLanguageSetting();
    syncLanguageSelect();
    patchGlobals();

    if (getLang() !== 'fr') {
      document.documentElement.lang = 'en';
      return;
    }

    document.documentElement.lang = 'fr';
    translateTextNodes(root);
    translateAttributes(root);
    translateTooltipContent();
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

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: false
    });
  }

  function boot() {
    ensureSavedLanguage();
    insertLanguageSetting();
    installWrappers();
    patchGlobals();
    applyTranslations(document.body);
    startObserver();

    setInterval(() => {
      insertLanguageSetting();
      syncLanguageSelect();
      installWrappers();
      patchGlobals();
    }, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
