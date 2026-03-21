(() => {
  const DEFAULT_LANG = 'fr';
  const LANG_KEY = 'pokechillLanguage';
  const CACHE_KEY = 'pokechillI18nV4Cache';
  const API = 'https://pokeapi.co/api/v2';

  const GUIDE_FR = {
    inspecting: {
      name: 'Inspection',
      description: () => `Un clic droit / appui long sur la plupart des éléments peut afficher plus d’informations. Tu peux aussi refaire un clic droit / appui long sur des informations à l’intérieur d’autres informations.<br><br>Parmi les éléments inspectables : zones, dresseurs, capacités, altérations d’état, Pokémon sauvages, Pokémon de l’équipe et objets.`
    },
    stats: {
      name: 'Combat : Stats',
      description: () => `Chaque espèce de Pokémon possède les mêmes stats de base, qui déterminent les stats réelles d’un Pokémon à un niveau donné.<br><br>Les stats déterminent les dégâts infligés et reçus (voir Combat : Capacités). La Vitesse détermine la rapidité d’exécution d’une capacité.<br><br>Les Valeurs Individuelles, ou IV, multiplient les stats de base et peuvent être augmentées en obtenant plusieurs copies d’un même Pokémon.<br><br>Selon ses stats de base, un Pokémon reçoit une Division. Cette lettre permet d’évaluer rapidement quels Pokémon seront les plus performants à court terme.`
    },
    abilities: {
      name: 'Combat : Talents',
      description: () => `Les talents sont des traits que peut posséder un Pokémon. Même s’ils sont aléatoires, certains talents n’apparaissent que sur des types précis. Ils sont répartis en trois catégories : commun, peu commun et rare.<br><br>Les talents cachés sont des traits innés dépendants de l’espèce et doivent être débloqués avec une Capsule Talent. Une fois débloqué, leur effet reste actif en permanence en plus du talent normal. Un talent caché identique au talent normal ne se cumule pas avec lui.`
    },
    experience: {
      name: 'Combat : Expérience',
      description: () => `Les Pokémon gagnent de l’expérience en battant des ennemis, et une partie est partagée avec l’équipe. C’est aussi le cas si les Pokémon de l’équipe sont K.O.<br><br>Le gain d’expérience est proportionnel à l’écart de niveau. Un écart de ±5 niveaux donne la même quantité, mais au-delà de 5 niveaux l’expérience reçue augmente fortement.<br><br>Un Pokémon qui a 10 niveaux de plus ne rapporte aucune expérience.`
    },
    moves: {
      name: 'Combat : Capacités',
      description: () => `Les capacités s’apprennent tous les 7 niveaux. Elles peuvent être remplacées avec un clic droit / appui long sur un Pokémon de l’équipe.<br><br>Les capacités offensives sont divisées en capacités physiques et spéciales.<br>La catégorie détermine si les dégâts dépendent de l’Attaque ou de l’Attaque Spéciale de l’utilisateur, et de la Défense ou de la Défense Spéciale de la cible.<br><br>Certains Pokémon possèdent une capacité signature. Les capacités signature dépendent de l’espèce et sont apprises automatiquement au niveau 100. Elles ne peuvent pas être héritées via la génétique, sauf si l’hôte possède la capacité œuf correspondante.<br><br>Certaines capacités sont restreintes. Une seule capacité restreinte peut être équipée à la fois sur le Pokémon actif.`
    },
    stab: {
      name: 'Combat : STAB',
      description: () => `Si un Pokémon utilise une capacité offensive du même type que l’un de ses propres types, les dégâts sont augmentés de x1,5.<br>C’est ce qu’on appelle le bonus d’attaque du même type, ou STAB.<br><br>En plus, les Pokémon monotype reçoivent +0,2 de dégâts STAB supplémentaires.`
    },
    crossStab: {
      name: 'Combat : Cross Power',
      description: () => `Si un Pokémon utilise une capacité offensive précédée (juste avant ou non) par une autre capacité offensive d’un type différent, il reçoit un multiplicateur de dégâts de x1,3.<br><br>Cela est indiqué par un motif en croix sur la barre de capacité concernée.`
    },
    battleFatigue: {
      name: 'Combat : Fatigue de combat',
      description: () => `Les Pokémon perdent une très petite partie de leurs PV max lorsqu’ils attaquent.<br><br>Ces dégâts peuvent être réduits par la somme des PV, de la Défense et de la Défense Spéciale du Pokémon : les Pokémon plus bulk peuvent donc combattre plus longtemps.`
    },
    statusEffects: {
      name: 'Combat : Altérations d’état',
      description: () => `Certaines capacités infligent des altérations d’état comme ${typeof tagConfused !== 'undefined' ? tagConfused : 'Confusion'}, ${typeof tagBurn !== 'undefined' ? tagBurn : 'Brûlure'}, ${typeof tagPoisoned !== 'undefined' ? tagPoisoned : 'Poison'}, ${typeof tagFreeze !== 'undefined' ? tagFreeze : 'Gel'}, ${typeof tagParalysis !== 'undefined' ? tagParalysis : 'Paralysie'} ou ${typeof tagSleep !== 'undefined' ? tagSleep : 'Sommeil'}.<br><br>Tu peux consulter leurs effets plus en détail avec un clic droit / appui long.<br><br>Comme les changements temporaires de stats, elles se décomptent en tours. Une seule altération d’état peut être appliquée à la fois. Elles durent 3 tours par défaut (sauf la Paralysie).`
    },
    buffsDebuffs: {
      name: 'Combat : Buffs et debuffs',
      description: () => `Comme les altérations d’état, les hausses et baisses de stats durent 3 tours par défaut (sauf les baisses de Vitesse, qui durent 2 tours).<br><br>Les buffs et debuffs de même ampleur ne se cumulent pas entre eux (ex. x2 Attaque +50 %), mais des valeurs différentes se cumulent (50 % + 100 % Attaque).`
    },
    weather: {
      name: 'Combat : Météo',
      description: () => `Certaines capacités peuvent changer la météo ou le terrain en états spéciaux comme ${typeof tagSunny !== 'undefined' ? tagSunny : 'Soleil'}, ${typeof tagRainy !== 'undefined' ? tagRainy : 'Pluie'}, ${typeof tagSandstorm !== 'undefined' ? tagSandstorm : 'Tempête de sable'}, ${typeof tagHail !== 'undefined' ? tagHail : 'Grêle'}, ${typeof tagFoggy !== 'undefined' ? tagFoggy : 'Brume'}, ${typeof tagElectricTerrain !== 'undefined' ? tagElectricTerrain : 'Champ Électrifié'}, ${typeof tagGrassyTerrain !== 'undefined' ? tagGrassyTerrain : 'Champ Herbu'}, ${typeof tagMistyTerrain !== 'undefined' ? tagMistyTerrain : 'Champ Brumeux'}, ${typeof tagTrickRoom !== 'undefined' ? tagTrickRoom : 'Distorsion'}, ${typeof tagWeirdRoom !== 'undefined' ? tagWeirdRoom : 'Salle Étrange'}, ${typeof tagCrossRoom !== 'undefined' ? tagCrossRoom : 'Cross Room'}, ${typeof tagLightScreen !== 'undefined' ? tagLightScreen : 'Mur Lumière'} ou ${typeof tagSafeguard !== 'undefined' ? tagSafeguard : 'Rune Protect'}.<br><br>Tu peux consulter leurs effets plus en détail avec un clic droit / appui long.<br><br>Les météos / terrains modifiés durent 15 tours et ne peuvent être rechangés qu’après 30.`
    },
    shiny: {
      name: 'Pokémon shiny',
      description: () => `Les Pokémon peuvent être shiny avec un taux de 1/400. Ces chances peuvent être augmentées par différents moyens.<br><br>Les Pokémon shiny infligent 15 % de dégâts en plus. Leur distinction visuelle peut être activée ou non depuis leur menu de capacités, sans affecter le bonus de dégâts.<br><br>Le statut shiny ne se transmet pas automatiquement aux évolutions. Il faut utiliser la génétique.<br><br>Si les étoiles s’alignent, un Pokémon shiny peut recevoir un signe astral, une pigmentation encore plus rare. Cela n’apporte aucun avantage pratique, et ne peut ni être hérité ni muté via la génétique.`
    },
    genetics: {
      name: 'Génétique : Guide rapide',
      description: () => `La génétique te permet de modifier un Pokémon au-delà de ce qui est normalement possible pour son espèce. Voici un aperçu rapide :<br><br>Mutation shiny : tu peux hériter de la mutation shiny avec 100 % de chance au sein d’une même famille. Tu peux aussi tenter de propager une nouvelle mutation shiny avec un échantillon shiny.<br><br>Boost d’IV : en faisant n’importe quelle opération, peu importe la compatibilité, les IV de l’hôte ont une chance d’augmenter. Utile pour les Pokémon avec peu ou pas d’IV.<br><br>Héritage d’IV : version avancée du point précédent. Tu peux faire hériter des IV d’une espèce à une autre selon la compatibilité ou les objets d’assistance génétique utilisés.<br><br>Réapprentissage de capacités : à la fin d’une opération, toutes les capacités de l’hôte sauf les 4 sélectionnées sont réinitialisées. Tu peux donc essayer d’obtenir de meilleures capacités à chaque opération.<br><br>Héritage de capacités : version avancée du point précédent. Tu peux hériter de capacités venant de l’échantillon, normalement impossibles à apprendre autrement.<br><br>Héritage de talent : avec un Nœud Destin, tu peux échanger les talents avec l’échantillon et obtenir des combinaisons normalement impossibles.`
    },
    compatibility: {
      name: 'Génétique : Compatibilité',
      description: () => `La compatibilité détermine à quel point l’échantillon ressemble à l’hôte. Cela influence différents paramètres comme les chances d’héritage ou les mutations shiny (uniquement si l’échantillon est shiny).<br><br>Partager un type avec l’échantillon donne un niveau de compatibilité, tandis qu’en partager deux en donne deux.<br><br>En plus, si l’échantillon appartient à la même lignée évolutive que l’hôte, la compatibilité devient maximale.`
    },
    powerCost: {
      name: 'Génétique : Coût en puissance',
      description: () => `Le coût en puissance détermine à quel point la modification de l’hôte est exigeante. Cela influence le temps nécessaire pour terminer l’opération.<br><br>Ce coût dépend de la division de l’hôte. Une division plus élevée augmente de manière exponentielle le temps requis pour modifier le Pokémon.`
    }
  };

  const GUIDE_STATS_PANEL = {
    'Health': 'PV',
    'Attack': 'Attaque',
    'Defense': 'Défense',
    'Special Attack': 'Attaque Spéciale',
    'Special Defense': 'Défense Spéciale',
    'Speed': 'Vitesse'
  };

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
    ['Team Preview', 'Aperçu de l’équipe'],
    ['Field Effects', 'Effets de terrain'],
    ['Area Pokemon', 'Pokémon de la zone'],
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
    ['fairy', 'fée'],
    ['Health', 'PV'],
    ['Attack', 'Attaque'],
    ['Defense', 'Défense'],
    ['Special Attack', 'Attaque Spéciale'],
    ['Special Defense', 'Défense Spéciale'],
    ['Speed', 'Vitesse']
  ]);

  const PARTIALS = [
    ['Tip: Right click (or long-press on mobile) on most elements for additional information', 'Astuce : clic droit (ou appui long sur mobile) sur la plupart des éléments pour plus d’informations'],
    ['While in combat, Pokemon get tired and lose a very small fraction of their hp yada yada.', 'En combat, les Pokémon se fatiguent et perdent une toute petite fraction de leurs PV, blablabla.'],
    ['Select ingredients to add to the curry!', 'Choisis les ingrédients à ajouter au curry !'],
    ['Warning, power cost too high! Only 5 out of 6 maximum IV\'s per stat will be inherited!', 'Attention, coût en puissance trop élevé ! Seulement 5 IV max sur 6 par stat seront hérités !'],
    ['Pokerus detected on the host! Genetic compatibility is increased by one level!', 'Pokerus détecté sur l’hôte ! La compatibilité génétique augmente d’un niveau !'],
    ['This Pokemon is marked as Special, and cannot receive shiny mutations through genetics!', 'Ce Pokémon est marqué comme spécial et ne peut pas recevoir de mutations shiny via la génétique !'],
    ['AFK time is being calculated, please wait...', 'Le temps AFK est en cours de calcul, merci de patienter...'],
    ['Drag and drop the selected decor to apply', 'Glisse-dépose la déco sélectionnée pour l’appliquer'],
    ['Right Click/Long press to see the details', 'Clic droit / appui long pour voir les détails'],
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
    ['Challenge your Pokemon against waves of foes in order to get stronger. You will naturally have typing advantage against Pokemon fought against, and their level will scale to yours. Type Immunities inside training will be instead converted to resistances.', 'Affronte des vagues d’ennemis avec tes Pokémon pour devenir plus fort. Tu auras naturellement l’avantage de type, et leur niveau s’adaptera au tien. Les immunités de type y deviennent des résistances.'],
    ['Failing a training will result in no gains', 'Échouer un entraînement ne donne aucun gain'],
    ['Events might house both items and Pokemon to get. Events marked with a skull signify powerful foes that usually require an item to catch (The item wont be consumed if failed to defeat) that can be acquired in the collection events. All Events rotate every three days.', 'Les événements peuvent contenir à la fois des objets et des Pokémon à obtenir. Les événements marqués d’un crâne signalent des ennemis puissants qui demandent souvent un objet pour être capturés (l’objet n’est pas consommé si tu échoues). Tous les événements tournent tous les trois jours.'],
    ['Welcome valiant trainer to the final frontier, the Mega-Dimension, housing only the strongest Pokemon of all the universe!', 'Bienvenue, vaillant dresseur, dans la dernière frontière : la Méga-dimension, qui n’abrite que les Pokémon les plus puissants de tout l’univers !'],
    ['Wormholes have each separate rules, having both unique areas, field effects and skills. In addition to field effects, skills will trigger while fighting the boss', 'Chaque faille a ses propres règles, avec des zones, effets de terrain et compétences uniques. En plus des effets de terrain, des compétences s’activent pendant le combat contre le boss.'],
    ['The Pokemon appearing on the rift are random and will change on each rotation', 'Les Pokémon apparaissant dans la faille sont aléatoires et changent à chaque rotation'],
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
    ['Story-driven battles and curated challenges live here. More Main Challenges are coming soon.', 'Les combats scénarisés et défis préparés se trouvent ici. D’autres défis principaux arrivent bientôt.'],
    ['Create custom battles from your own pools and enemy teams. Import and export challenge codes to share them.', 'Crée des combats personnalisés à partir de tes propres pools et équipes ennemies. Importe et exporte des codes de défi pour les partager.'],
    ['Trainers have twice the health. Only applies to VS Trainers', 'Les dresseurs ont deux fois plus de PV. S’applique uniquement aux Dresseurs VS.'],
    ['If any of your Pokemon get defeated while battling a trainer of VS Trainers, it will permanently be unusuable until you turn this mode off', 'Si l’un de tes Pokémon est vaincu contre un Dresseur VS, il devient inutilisable tant que ce mode reste activé.'],
    ['All of your Pokemon have functionally max IVs regardless of their actual IVs. This can be toggled off without any permanent changes', 'Tous tes Pokémon ont fonctionnellement des IV max, peu importe leurs vrais IV. Tu peux désactiver ça sans changement permanent.'],
    ['There are no side-effects to this modifier', 'Ce modificateur n’a pas d’effet secondaire.']
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

  const AREA_OVERRIDES = new Map([
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

  const TYPE_WORDS = {
    normal: 'normal', fire: 'feu', water: 'eau', electric: 'électrik', grass: 'plante', ice: 'glace',
    fighting: 'combat', poison: 'poison', ground: 'sol', flying: 'vol', psychic: 'psy', bug: 'insecte',
    rock: 'roche', ghost: 'spectre', dragon: 'dragon', dark: 'ténèbres', steel: 'acier', fairy: 'fée'
  };

  const POKEMON_SLUG_SPECIAL = {
    mrMime: 'mr-mime', mrRime: 'mr-rime', mimejr: 'mime-jr', hooh: 'ho-oh', porygonZ: 'porygon-z',
    typeNull: 'type-null', nidoranF: 'nidoran-f', nidoranM: 'nidoran-m', jangmoO: 'jangmo-o',
    hakamoO: 'hakamo-o', kommoO: 'kommo-o', tapuKoko: 'tapu-koko', tapuLele: 'tapu-lele',
    tapuBulu: 'tapu-bulu', tapuFini: 'tapu-fini', woChien: 'wo-chien', chienPao: 'chien-pao',
    tingLu: 'ting-lu', chiYu: 'chi-yu'
  };

  const cache = loadCache();
  const pending = { pokemon: new Set(), move: new Set(), item: new Set(), ability: new Set(), area: new Set() };
  const englishToFrench = new Map();

  function loadCache() {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return { pokemon: {}, move: {}, item: {}, ability: {}, area: {} };
      const parsed = JSON.parse(raw);
      return {
        pokemon: parsed.pokemon || {},
        move: parsed.move || {},
        item: parsed.item || {},
        ability: parsed.ability || {},
        area: parsed.area || {}
      };
    } catch (_) {
      return { pokemon: {}, move: {}, item: {}, ability: {}, area: {} };
    }
  }

  function saveCache() {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    } catch (_) {}
  }

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

  function translateExact(text) {
    const trimmed = text.trim();
    if (!trimmed) return text;
    const exact = EXACT.get(trimmed);
    return exact ? preservePadding(text, exact) : text;
  }

  function translateTrainerName(text) {
    let out = text;
    for (const [en, fr] of TRAINER_PREFIXES) {
      out = out.replace(new RegExp(`^${en}\\s+`, 'i'), `${fr} `);
    }
    return out;
  }

  function translateAreaName(text) {
    if (AREA_OVERRIDES.has(text)) return AREA_OVERRIDES.get(text);
    let out = text;
    out = out.replace(/^Defeat\s+/i, 'Vaincre ');
    out = translateTrainerName(out);
    for (const [en, fr] of AREA_OVERRIDES.entries()) out = out.replaceAll(en, fr);
    return out;
  }

  function humanizeIdentifier(id) {
    return String(id)
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
      .replace(/_/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function translateString(text) {
    if (typeof text !== 'string') return text;
    if (getLang() !== 'fr') return text;

    let out = translateExact(text);
    if (out !== text) return out;

    if (englishToFrench.has(out.trim())) return preservePadding(out, englishToFrench.get(out.trim()));

    out = translateAreaName(out);
    out = out
      .replace(/^Team\s+(\d+)$/i, 'Équipe $1')
      .replace(/^Select a pokemon to teach\s+(.+)$/i, 'Choisis un Pokémon à qui apprendre $1')
      .replace(/^Time left:\s*(.+)$/i, 'Temps restant : $1')
      .replace(/^Floor:\s*(.+)$/i, 'Étage : $1')
      .replace(/^Highest Floor:\s*(.+)$/i, 'Meilleur étage : $1')
      .replace(/^Score:\s*(.+)$/i, 'Score : $1')
      .replace(/^Highest Score:\s*(.+)$/i, 'Meilleur score : $1')
      .replace(/^(\d+)\s+Remaining$/i, '$1 restants')
      .replace(/^lvl\s*(\d+)$/i, 'Niv. $1')
      .replace(/^Level\s*(\d+)$/i, 'Niveau $1')
      .replace(/^Defeat\s+(.+)$/i, 'Vaincre $1')
      .replace(/^x([\d.]+)\s+Item drop$/i, 'x$1 butin d’objets')
      .replace(/^x([\d.]+)\s+Cross power damage$/i, 'x$1 dégâts Cross Power')
      .replace(/^x([\d.]+)\s+STAB damage$/i, 'x$1 dégâts STAB')
      .replace(/^Pay and cook\s*\((.+)\)$/i, 'Payer et cuisiner ($1)')
      .replace(/^Tag:\s*(.+)$/i, 'Tag : $1')
      .replace(/^Highest Spiraling Tower floor reached:\s*(.+)$/i, 'Meilleur étage atteint dans la Tour Spirale : $1');

    for (const [search, replace] of PARTIALS) out = out.split(search).join(replace);

    out = out
      .replace(/\bPokemon\b/g, 'Pokémon')
      .replace(/\bpokemon\b/g, 'pokémon')
      .replace(/\bMove\b/g, 'Capacité')
      .replace(/\bMoves\b/g, 'Capacités')
      .replace(/\bAbility\b/g, 'Talent')
      .replace(/\bAbilities\b/g, 'Talents');

    return out;
  }

  function parsePokemonBase(id) {
    const str = String(id);
    const forms = [
      ['alolan', { suffix: " d'Alola" }],
      ['galarian', { suffix: ' de Galar' }],
      ['hisuian', { suffix: ' de Hisui' }],
      ['paldean', { suffix: ' de Paldea' }],
      ['mega', { prefix: 'Méga-' }],
      ['primal', { prefix: 'Primo-' }]
    ];
    for (const [prefix, cfg] of forms) {
      if (str.startsWith(prefix) && str.length > prefix.length) {
        const rest = str.slice(prefix.length);
        const base = rest.charAt(0).toLowerCase() + rest.slice(1);
        return { base, cfg };
      }
    }
    return { base: str, cfg: null };
  }

  function applyPokemonForm(name, cfg) {
    if (!cfg) return name;
    if (cfg.prefix) return `${cfg.prefix}${name}`;
    if (cfg.suffix) return `${name}${cfg.suffix}`;
    return name;
  }

  function slugifyIdentifier(id) {
    const str = String(id);
    if (POKEMON_SLUG_SPECIAL[str]) return POKEMON_SLUG_SPECIAL[str];
    return str
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
      .replace(/_/g, '-')
      .toLowerCase();
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

  function rememberTranslation(kind, id, en, fr) {
    if (!fr) return;
    cache[kind][id] = fr;
    if (en) englishToFrench.set(en, fr);
    saveCache();
  }

  function hydrateEnglishMapFromCache() {
    const originalFormat = getGlobal('format');
    if (typeof originalFormat !== 'function') return;
    ['pokemon', 'move', 'item', 'ability', 'area'].forEach((kind) => {
      const bucket = cache[kind];
      for (const id in bucket) {
        try {
          const en = originalFormat(id);
          if (typeof en === 'string' && bucket[id]) englishToFrench.set(en, bucket[id]);
        } catch (_) {}
      }
    });
  }

  function fetchRemoteTranslation(kind, id, englishName) {
    if (getLang() !== 'fr') return null;
    if (cache[kind][id]) return cache[kind][id];
    if (pending[kind].has(id)) return null;

    let url = null;
    let post = (name) => name;

    if (kind === 'pokemon') {
      const parsed = parsePokemonBase(id);
      url = `${API}/pokemon-species/${slugifyIdentifier(parsed.base)}`;
      post = (name) => applyPokemonForm(name, parsed.cfg);
    } else if (kind === 'move') {
      url = `${API}/move/${slugifyIdentifier(id)}`;
    } else if (kind === 'item') {
      url = `${API}/item/${slugifyIdentifier(id)}`;
    } else if (kind === 'ability') {
      url = `${API}/ability/${slugifyIdentifier(id)}`;
    } else if (kind === 'area') {
      return null;
    }

    if (!url) return null;

    pending[kind].add(id);
    fetch(url)
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        const fr = json?.names?.find((n) => n.language?.name === 'fr')?.name || null;
        if (fr) rememberTranslation(kind, id, englishName, post(fr));
        scheduleApply();
      })
      .catch(() => {})
      .finally(() => pending[kind].delete(id));

    return null;
  }

  function translateIdentifier(id, englishName) {
    const kind = detectKind(id);
    if (!kind) return translateString(englishName);

    if (kind === 'area') {
      const local = translateAreaName(englishName);
      rememberTranslation('area', id, englishName, local);
      return local;
    }

    if (cache[kind][id]) return cache[kind][id];

    const localFallback = kind === 'pokemon'
      ? applyPokemonForm(humanizeIdentifier(parsePokemonBase(id).base), parsePokemonBase(id).cfg)
      : humanizeIdentifier(englishName || id);

    fetchRemoteTranslation(kind, id, englishName);
    return kind === 'pokemon' ? localFallback : translateString(localFallback);
  }

  function patchFormat() {
    const original = getGlobal('format');
    if (typeof original !== 'function' || original.__i18nFrV4) return;

    const wrapped = function (...args) {
      const result = original.apply(this, args);
      if (getLang() !== 'fr' || typeof result !== 'string') return result;
      if (typeof args[0] === 'string') return translateIdentifier(args[0], result);
      return translateString(result);
    };

    wrapped.__i18nFrV4 = true;
    wrapped.__i18nOriginal = original;
    setGlobal('format', wrapped);
    window.format = wrapped;
    hydrateEnglishMapFromCache();
  }

  function patchGuideObject() {
    const guide = getGlobal('guide');
    if (!guide || getLang() !== 'fr') return;
    for (const key in GUIDE_FR) {
      if (!guide[key]) continue;
      guide[key].name = GUIDE_FR[key].name;
      guide[key].description = GUIDE_FR[key].description;
    }
  }

  function translateGuideListDom() {
    const guideList = document.getElementById('guide-list');
    if (!guideList || getLang() !== 'fr') return;
    guideList.querySelectorAll('div').forEach((el) => {
      const txt = el.textContent?.trim();
      if (!txt) return;
      el.textContent = translateString(txt);
    });
  }

  function rerenderGuideList() {
    const guide = getGlobal('guide');
    const setGuide = getGlobal('setGuide');
    const guideList = document.getElementById('guide-list');
    if (!guide || !guideList || typeof setGuide !== 'function' || getLang() !== 'fr') return;
    if (guideList.dataset.i18nRerendered === '1') return;
    guideList.dataset.i18nRerendered = '1';
    guideList.innerHTML = '';
    try { setGuide(); } catch (_) {}
    translateGuideListDom();
  }

  function patchSetGuide() {
    const original = getGlobal('setGuide');
    if (typeof original !== 'function' || original.__i18nFrV4) return;
    const wrapped = function (...args) {
      patchGuideObject();
      const guideList = document.getElementById('guide-list');
      if (guideList) guideList.innerHTML = '';
      const result = original.apply(this, args);
      setTimeout(() => {
        patchGuideObject();
        translateGuideListDom();
        translateTooltipBoxes();
      }, 0);
      return result;
    };
    wrapped.__i18nFrV4 = true;
    setGlobal('setGuide', wrapped);
    window.setGuide = wrapped;
  }

  function patchTooltipData() {
    const original = getGlobal('tooltipData');
    if (typeof original !== 'function' || original.__i18nFrV4) return;
    const wrapped = function (...args) {
      const result = original.apply(this, args);
      setTimeout(() => {
        patchGuideObject();
        translateTooltipBoxes();
        translateVisibleNames();
      }, 0);
      return result;
    };
    wrapped.__i18nFrV4 = true;
    setGlobal('tooltipData', wrapped);
    window.tooltipData = wrapped;
  }

  function patchCollection(name, cfg) {
    const collection = getGlobal(name);
    if (!collection || getLang() !== 'fr') return;
    for (const key in collection) {
      const entry = collection[key];
      if (!entry || typeof entry !== 'object') continue;
      for (const field of cfg.strings || []) {
        if (typeof entry[field] === 'string') {
          const originalKey = `__i18nOriginal_${field}`;
          if (entry[originalKey] === undefined) entry[originalKey] = entry[field];
          entry[field] = translateString(entry[originalKey]);
        }
      }
      for (const field of cfg.functions || []) {
        if (typeof entry[field] !== 'function' || entry[field].__i18nFrV4) continue;
        const fn = entry[field];
        entry[field] = function (...args) {
          const out = fn.apply(this, args);
          return typeof out === 'string' ? translateString(out) : out;
        };
        entry[field].__i18nFrV4 = true;
      }
    }
  }

  function patchData() {
    patchCollection('item', { strings: ['subtitle'], functions: ['info'] });
    patchCollection('ability', { strings: ['nerf'], functions: ['info'] });
    patchCollection('move', { functions: ['info'] });
    patchCollection('pkmn', { strings: ['lore'] });
    patchCollection('areas', { strings: ['name'], functions: ['encounterEffect'] });
    patchCollection('field', { functions: ['info'] });
    patchCollection('skill', { functions: ['info'] });
    patchCollection('training', { strings: ['info'] });
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

  function shouldSkipNode(node) {
    const parent = node.parentElement;
    if (!parent) return true;
    return ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName);
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
      const oldValue = node.nodeValue;
      let translated = translateString(oldValue);

      const trimmed = oldValue.trim();
      if (englishToFrench.has(trimmed)) translated = preservePadding(oldValue, englishToFrench.get(trimmed));
      if (/^Defeat\s+/.test(trimmed)) {
        const target = trimmed.replace(/^Defeat\s+/, '');
        const translatedTarget = englishToFrench.get(target) || translateString(target);
        translated = preservePadding(oldValue, `Vaincre ${translatedTarget}`);
      }

      if (translated !== oldValue) node.nodeValue = translated;
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
    if (getLang() !== 'fr') return;
    ['tooltipTitle', 'tooltipMid', 'tooltipBottom'].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      for (const [en, fr] of Object.entries(GUIDE_STATS_PANEL)) {
        el.innerHTML = el.innerHTML.split(en).join(fr);
      }
      el.innerHTML = translateString(el.innerHTML);
      for (const [en, fr] of englishToFrench.entries()) {
        el.innerHTML = el.innerHTML.split(en).join(fr);
      }
    });
  }

  function translateVisibleNames() {
    if (getLang() !== 'fr') return;
    translateTextNodes(document.body);
    translateTooltipBoxes();
    translateGuideListDom();
  }

  function prefetchCriticalNames() {
    if (getLang() !== 'fr') return;
    const fmt = getGlobal('format');
    if (typeof fmt !== 'function') return;

    const pkmn = getGlobal('pkmn') || {};
    const move = getGlobal('move') || {};
    const ability = getGlobal('ability') || {};
    const item = getGlobal('item') || {};
    const areas = getGlobal('areas') || {};

    const pick = (obj, limit) => Object.keys(obj).slice(0, limit);

    pick(pkmn, 80).forEach((id) => fetchRemoteTranslation('pokemon', id, fmt.__i18nOriginal ? fmt.__i18nOriginal(id) : fmt(id)));
    pick(move, 120).forEach((id) => fetchRemoteTranslation('move', id, fmt.__i18nOriginal ? fmt.__i18nOriginal(id) : fmt(id)));
    pick(ability, 80).forEach((id) => fetchRemoteTranslation('ability', id, fmt.__i18nOriginal ? fmt.__i18nOriginal(id) : fmt(id)));
    pick(item, 120).forEach((id) => fetchRemoteTranslation('item', id, fmt.__i18nOriginal ? fmt.__i18nOriginal(id) : fmt(id)));
    pick(areas, 120).forEach((id) => {
      const en = fmt.__i18nOriginal ? fmt.__i18nOriginal(id) : fmt(id);
      rememberTranslation('area', id, en, translateAreaName(en));
    });
  }

  function applyTranslations() {
    insertLanguageSetting();
    syncLanguageSetting();
    patchFormat();
    patchGuideObject();
    patchSetGuide();
    patchTooltipData();
    patchData();

    if (getLang() !== 'fr') {
      document.documentElement.lang = 'en';
      return;
    }

    document.documentElement.lang = 'fr';
    rerenderGuideList();
    translateVisibleNames();
    translateAttributes(document.body);
  }

  let scheduled = false;
  function scheduleApply() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      applyTranslations();
    });
  }

  function boot() {
    ensureLang();
    patchFormat();
    patchGuideObject();
    patchSetGuide();
    patchTooltipData();
    patchData();
    insertLanguageSetting();
    syncLanguageSetting();
    applyTranslations();
    prefetchCriticalNames();

    const observer = new MutationObserver(() => {
      if (getLang() === 'fr') scheduleApply();
    });

    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    }

    setInterval(() => {
      insertLanguageSetting();
      syncLanguageSetting();
      patchFormat();
      patchGuideObject();
      patchSetGuide();
      patchTooltipData();
      patchData();
    }, 1000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
