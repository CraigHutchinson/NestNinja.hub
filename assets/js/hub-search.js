/* =============================================================================
   NestNinja Hub — Search autocomplete
   Demo data only; live search will be powered by Firebase once Hub launches.
   ============================================================================= */

(function () {
  /* ── Demo autocomplete data ─────────────────────────────────────────── */

  /* Tits & small woodland birds */
  const SPECIES_TITS = [
    { label: '🐦 Blue Tit',           type: 'species', note: 'Most common nest box occupant' },
    { label: '🐦 Great Tit',          type: 'species', note: 'Prefers larger entrance holes' },
    { label: '🐦 Coal Tit',           type: 'species', note: 'Prefers conifer woodland' },
    { label: '🐦 Marsh Tit',          type: 'species', note: 'Declining; 25–28 mm entrance hole' },
    { label: '🐦 Long-tailed Tit',    type: 'species', note: 'Builds own domed nest; uses boxes to roost' },
    { label: '🐦 Nuthatch',           type: 'species', note: 'Plasters mud around the entrance to fit' },
    { label: '🐦 Treecreeper',        type: 'species', note: 'Needs wedge-shaped open-back box' },
  ];

  /* Sparrows & small garden passerines */
  const SPECIES_GARDEN = [
    { label: '🐦 House Sparrow',      type: 'species', note: 'Colonial nesters; use terrace-style boxes' },
    { label: '🐦 Tree Sparrow',       type: 'species', note: 'Red-listed; prefers colonial boxes in farmland' },
    { label: '🐦 Robin',              type: 'species', note: 'Open-fronted box specialist' },
    { label: '🐦 Wren',               type: 'species', note: 'Tiny but loud; loves dense cover' },
    { label: '🐦 Starling',           type: 'species', note: 'Noisy, gregarious, red-listed in UK' },
    { label: '🐦 Pied Wagtail',       type: 'species', note: 'Open-fronted box in farmyards/buildings' },
    { label: '🐦 Grey Wagtail',       type: 'species', note: 'Open-fronted box near fast-moving streams' },
    { label: '🐦 Dipper',             type: 'species', note: 'Open-fronted box over upland streams' },
  ];

  /* Finches & buntings */
  const SPECIES_FINCHES = [
    { label: '🐦 Chaffinch',           type: 'species', note: 'Most common UK finch; open woodland & gardens' },
    { label: '🐦 Brambling',           type: 'species', note: 'Winter visitor; beech mast specialist' },
    { label: '🐦 Goldfinch',           type: 'species', note: 'Loves teasel & nyjer seed; garden feeder regular' },
    { label: '🐦 Siskin',              type: 'species', note: 'Conifer & alder specialist; garden feeder in winter' },
    { label: '🐦 Linnet',              type: 'species', note: 'Farmland & heath; declining in UK' },
    { label: '🐦 Twite',               type: 'species', note: 'Upland moorland specialist; red-listed' },
    { label: '🐦 Lesser Redpoll',      type: 'species', note: 'Birch & alder woodland; declining' },
    { label: '🐦 Common Crossbill',    type: 'species', note: 'Conifer specialist; nomadic; Scottish pinewoods' },
    { label: '🐦 Parrot Crossbill',    type: 'species', note: 'Rare; Scots pine specialist in Scotland' },
    { label: '🐦 Scottish Crossbill',  type: 'species', note: 'Endemic UK species; Caledonian pinewoods only' },
    { label: '🐦 Bullfinch',           type: 'species', note: 'Orchard & woodland edges; eats flower buds' },
    { label: '🐦 Hawfinch',            type: 'species', note: 'Large secretive finch; hornbeam & cherry woods' },
    { label: '🐦 Greenfinch',          type: 'species', note: 'Garden regular; declining due to trichomonosis' },
    { label: '🐦 Yellowhammer',        type: 'species', note: 'Farmland bunting; red-listed; hedgerow nester' },
    { label: '🐦 Reed Bunting',        type: 'species', note: 'Wetland & farmland; open-cup nest in vegetation' },
    { label: '🐦 Corn Bunting',        type: 'species', note: 'Arable farmland; red-listed in UK' },
    { label: '🐦 Snow Bunting',        type: 'species', note: 'Winter visitor to coasts & uplands; rare breeder' },
  ];

  /* Flycatchers, chats & thrushes */
  const SPECIES_FLYCATCHERS = [
    { label: '🐦 Pied Flycatcher',    type: 'species', note: 'Summer visitor from Africa; Welsh oak woods' },
    { label: '🐦 Spotted Flycatcher', type: 'species', note: 'Open-fronted box on wall or trellis' },
    { label: '🐦 Common Redstart',    type: 'species', note: 'Striking red tail; Welsh & northern woodlands' },
    { label: '🐦 Black Redstart',     type: 'species', note: 'Urban specialist; industrial brownfield sites' },
    { label: '🐦 Blackbird',          type: 'species', note: 'Open-fronted box in dense shrubs' },
  ];

  /* Swifts, swallows & martins */
  const SPECIES_HIRUNDINES = [
    { label: '🐦 Common Swift',       type: 'species', note: 'Specialist swift box under eaves; declining fast' },
    { label: '🐦 Barn Swallow',       type: 'species', note: 'Open barns & sheds; declining in UK' },
    { label: '🐦 House Martin',       type: 'species', note: 'Artificial cup nests under eaves' },
    { label: '🐦 Sand Martin',        type: 'species', note: 'Colonial burrow boxes in earth banks' },
  ];

  /* Owls */
  const SPECIES_OWLS = [
    { label: '🦉 Barn Owl',           type: 'species', note: 'Tall open box on pole or inside barn' },
    { label: '🦉 Tawny Owl',          type: 'species', note: 'Woodland owl; large chimney-style box' },
    { label: '🦉 Little Owl',         type: 'species', note: 'Farmland edges; stone wall & pole boxes' },
    { label: '🦉 Long-eared Owl',     type: 'species', note: 'Conifer plantation; uses open basket platforms' },
  ];

  /* Raptors & corvids */
  const SPECIES_RAPTORS = [
    { label: '🦅 Common Kestrel',     type: 'species', note: 'Open farmland; tall pole or tower boxes' },
    { label: '🦅 Peregrine Falcon',   type: 'species', note: 'Cliff ledge trays; now also urban buildings' },
    { label: '🐦 Jackdaw',            type: 'species', note: 'Will take over large chimney boxes' },
    { label: '🐦 Stock Dove',         type: 'species', note: 'Farmland; uses barn-owl style boxes' },
    { label: '🐦 Great Spotted Woodpecker', type: 'species', note: 'Excavates own holes; may enlarge box entrance' },
    { label: '🐦 Lesser Spotted Woodpecker', type: 'species', note: 'Tiny; declining woodland specialist' },
    { label: '🐦 Green Woodpecker',   type: 'species', note: 'Ant specialist; rarely uses boxes' },
  ];

  /* Waterbirds & ducks */
  const SPECIES_WATER = [
    { label: '🦆 Mandarin Duck',      type: 'species', note: 'Large oval box near woodland water' },
    { label: '🦆 Goldeneye',          type: 'species', note: 'Scottish lochs; large hole boxes on trees' },
    { label: '🦆 Goosander',          type: 'species', note: 'Large box near rivers & lochs in Scotland' },
    { label: '🦆 Common Merganser',   type: 'species', note: 'Same box spec as Goosander; river specialist' },
    { label: '🦆 Tufted Duck',        type: 'species', note: 'Ground nester near water; uses cover boxes' },
    { label: '🦆 Wood Duck',          type: 'species', note: 'Escaped breeder; takes Mandarin-style boxes' },
    { label: '🐦 Kingfisher',         type: 'species', note: 'Tunnel box in river bank; requires specialist setup' },
  ];

  /* Domestic & farmyard fowl — chicken coops, runs & enclosures */
  const SPECIES_FOWL = [
    { label: '🐔 Chicken',              type: 'species', note: 'Most common coop bird; hundreds of breeds' },
    { label: '🐔 Bantam',              type: 'species', note: 'Miniature chicken; great for small gardens' },
    { label: '🦃 Turkey',              type: 'species', note: 'Large poultry; needs spacious covered run' },
    { label: '🦆 Domestic Duck',       type: 'species', note: 'Needs access to water; messy but friendly' },
    { label: '🦆 Khaki Campbell',      type: 'species', note: 'Prolific egg-laying duck breed' },
    { label: '🦆 Indian Runner Duck',  type: 'species', note: 'Upright posture; excellent forager' },
    { label: '🦆 Muscovy Duck',        type: 'species', note: 'Perches & roosts; prefers raised box' },
    { label: '🪿 Domestic Goose',      type: 'species', note: 'Loud guard animal; grazes pasture' },
    { label: '🪿 Embden Goose',        type: 'species', note: 'Large white breed; common UK farm goose' },
    { label: '🪿 Toulouse Goose',      type: 'species', note: 'Heavy breed; calm temperament' },
    { label: '🐦 Guinea Fowl',         type: 'species', note: 'Excellent pest control; very loud alarm calls' },
    { label: '🐦 Helmeted Guinea Fowl',type: 'species', note: 'Most common guinea breed kept in UK' },
    { label: '🐦 Peafowl',             type: 'species', note: 'Peacock & peahen; free-range with high roost' },
    { label: '🐦 Quail',               type: 'species', note: 'Japanese quail common for eggs; small pen' },
    { label: '🐦 Pheasant',            type: 'species', note: 'Game bird; large aviary or woodland pen' },
    { label: '🐦 Red-legged Partridge',type: 'species', note: 'Game bird; ground-nesting, aviary kept' },
    { label: '🐦 Grey Partridge',      type: 'species', note: 'Native game bird; declining in the wild' },
    { label: '🕊️ Domestic Pigeon',     type: 'species', note: 'Racing, fancy & utility breeds; loft kept' },
    { label: '🕊️ Racing Homer',        type: 'species', note: 'Homing pigeon bred for endurance races' },
    { label: '🕊️ Dove',               type: 'species', note: 'Ringneck & diamond doves; dovecote or aviary' },
  ];

  /* Gulls, terns & seabirds */
  const SPECIES_SEABIRDS = [
    { label: '🐦 Herring Gull',           type: 'species', note: 'Nests on rooftops & sea cliffs; urban & coastal' },
    { label: '🐦 Lesser Black-backed Gull',type: 'species', note: 'Rooftop nester in many UK cities' },
    { label: '🐦 Greater Black-backed Gull',type: 'species', note: 'Large coastal cliff & island nester' },
    { label: '🐦 Black-headed Gull',      type: 'species', note: 'Colonial ground nester on marshes & islands' },
    { label: '🐦 Common Gull',            type: 'species', note: 'Ground nester on moorland, coasts & rooftops' },
    { label: '🐦 Kittiwake',              type: 'species', note: 'Cliff ledge specialist; artificial ledge boxes' },
    { label: '🐦 Common Tern',            type: 'species', note: 'Floating tern raft platforms on lakes & coasts' },
    { label: '🐦 Arctic Tern',            type: 'species', note: 'Ground nester on northern islands & coasts' },
    { label: '🐦 Little Tern',            type: 'species', note: 'Shingle beach nester; red-listed in UK' },
    { label: '🐦 Sandwich Tern',          type: 'species', note: 'Colonial coastal sand & shingle nester' },
    { label: '🐦 Puffin',                 type: 'species', note: 'Excavates burrows; artificial burrow tubes used' },
    { label: '🐦 Razorbill',              type: 'species', note: 'Rocky cliff ledges & crevices' },
    { label: '🐦 Common Guillemot',       type: 'species', note: 'Bare cliff ledge colonies; no nest structure' },
    { label: '🐦 Gannet',                 type: 'species', note: 'Cliff-top colonies; Bass Rock & Grassholm' },
    { label: '🐦 Fulmar',                 type: 'species', note: 'Cliff ledge nester; expanding inland' },
  ];

  /* Merge all species groups — each entry is tagged with its category */
  const SPECIES = [
    ...SPECIES_TITS.map(s        => ({ ...s, group: 'tits' })),
    ...SPECIES_GARDEN.map(s      => ({ ...s, group: 'small-passerines' })),
    ...SPECIES_FINCHES.map(s     => ({ ...s, group: 'finches' })),
    ...SPECIES_FLYCATCHERS.map(s => ({ ...s, group: 'flycatchers' })),
    ...SPECIES_HIRUNDINES.map(s  => ({ ...s, group: 'hirundines' })),
    ...SPECIES_OWLS.map(s        => ({ ...s, group: 'owls' })),
    ...SPECIES_RAPTORS.map(s     => ({ ...s, group: 'raptors' })),
    ...SPECIES_WATER.map(s       => ({ ...s, group: 'waterbirds' })),
    ...SPECIES_SEABIRDS.map(s    => ({ ...s, group: 'seabirds' })),
    ...SPECIES_FOWL.map(s        => ({ ...s, group: 'fowl' })),
  /* deduplicate by label */
  ].filter((item, idx, arr) => arr.findIndex(x => x.label === item.label) === idx);

  /* Aliases: maps taxonomic/common terms to internal species group keys.
     Habitat & environment terms are intentionally excluded here — they resolve
     via label-text search against the ENVIRONMENTS array instead. */
  const GROUP_ALIASES = {
    // raptors
    'raptor':           'raptors',
    'raptors':          'raptors',
    'bird of prey':     'raptors',
    'birds of prey':    'raptors',
    'birds-of-prey':    'raptors',
    'falcon':           'raptors',
    'hawk':             'raptors',
    'corvid':           'raptors',
    'corvids':          'raptors',
    'woodpecker':       'raptors',
    'woodpeckers':      'raptors',
    // owls
    'owl':              'owls',
    'owls':             'owls',
    'night bird':       'owls',
    'night birds':      'owls',
    // tits & small woodland
    'tit':              'tits',
    'tits':             'tits',
    'nuthatch':         'tits',
    'treecreeper':      'tits',
    // finches & buntings
    'finch':            'finches',
    'finches':          'finches',
    'bunting':          'finches',
    'buntings':         'finches',
    'chaffinch':        'finches',
    'goldfinch':        'finches',
    'greenfinch':       'finches',
    'bullfinch':        'finches',
    'crossbill':        'finches',
    'siskin':           'finches',
    'linnet':           'finches',
    'redpoll':          'finches',
    'hawfinch':         'finches',
    'yellowhammer':     'finches',
    // small passerines (garden, farmyard & waterside smaller birds)
    'garden bird':      'small-passerines',
    'garden birds':     'small-passerines',
    'wagtail':          'small-passerines',
    'wagtails':         'small-passerines',
    'sparrow':          'small-passerines',
    'sparrows':         'small-passerines',
    'dipper':           'small-passerines',
    // flycatchers, chats & thrushes
    'flycatcher':       'flycatchers',
    'flycatchers':      'flycatchers',
    'chat':             'flycatchers',
    'chats':            'flycatchers',
    'thrush':           'flycatchers',
    'thrushes':         'flycatchers',
    'redstart':         'flycatchers',
    // hirundines
    'hirundine':        'hirundines',
    'hirundines':       'hirundines',
    'swift':            'hirundines',
    'swifts':           'hirundines',
    'swallow':          'hirundines',
    'swallows':         'hirundines',
    'martin':           'hirundines',
    'martins':          'hirundines',
    // waterbirds
    'duck':             'waterbirds',
    'ducks':            'waterbirds',
    'waterfowl':        'waterbirds',
    'waterbird':        'waterbirds',
    'waterbirds':       'waterbirds',
    'water bird':       'waterbirds',
    'water birds':      'waterbirds',
    // seabirds
    'seabird':          'seabirds',
    'seabirds':         'seabirds',
    'sea bird':         'seabirds',
    'sea birds':        'seabirds',
    'gull':             'seabirds',
    'gulls':            'seabirds',
    'tern':             'seabirds',
    'terns':            'seabirds',
    'auk':              'seabirds',
    'auks':             'seabirds',
    // fowl & poultry
    'fowl':             'fowl',
    'poultry':          'fowl',
    'chicken':          'fowl',
    'chickens':         'fowl',
    'hen':              'fowl',
    'hens':             'fowl',
    'cockerel':         'fowl',
    'coop':             'fowl',
    'chicken coop':     'fowl',
    'bantam':           'fowl',
    'bantams':          'fowl',
    'turkey':           'fowl',
    'turkeys':          'fowl',
    'goose':            'fowl',
    'geese':            'fowl',
    'guinea':           'fowl',
    'guinea fowl':      'fowl',
    'peafowl':          'fowl',
    'peacock':          'fowl',
    'quail':            'fowl',
    'pheasant':         'fowl',
    'pheasants':        'fowl',
    'partridge':        'fowl',
    'pigeon':           'fowl',
    'pigeons':          'fowl',
    'dove':             'fowl',
    'doves':            'fowl',
    'game bird':        'fowl',
    'game birds':       'fowl',
    'gamebird':         'fowl',
    'gamebirds':        'fowl',
    'farmyard':         'fowl',
    'farmyard bird':    'fowl',
  };

  const ENVIRONMENTS = [
    { key: 'garden',         label: '🌿 Garden',              type: 'environment', note: 'Domestic gardens, feeders & nest boxes' },
    { key: 'woodland',       label: '🌲 Woodland',            type: 'environment', note: 'Deciduous & mixed woodland' },
    { key: 'conifer',        label: '🌲 Conifer Forest',      type: 'environment', note: 'Pine & spruce plantation' },
    { key: 'farmland',       label: '🌾 Farmland',            type: 'environment', note: 'Arable & pasture fields, farm buildings' },
    { key: 'wetland',        label: '💧 Wetland & Marsh',     type: 'environment', note: 'Fens, bogs, reedbeds & carr woodland' },
    { key: 'river',          label: '🌊 River & Stream',      type: 'environment', note: 'Fast & slow-moving freshwater' },
    { key: 'lake',           label: '🌊 Lake & Loch',         type: 'environment', note: 'Still water; reservoirs, lochs & meres' },
    { key: 'estuary',        label: '🌊 Estuary & Mudflat',   type: 'environment', note: 'Tidal mudflats & saltmarsh' },
    { key: 'coastal',        label: '🌊 Coastal & Cliff',     type: 'environment', note: 'Sea cliffs, caves & rocky shores' },
    { key: 'urban',          label: '🏙️ Urban & Rooftop',    type: 'environment', note: 'Rooftops, ledges & urban green space' },
    { key: 'heathland',      label: '🌿 Heathland',           type: 'environment', note: 'Lowland heath; gorse & heather' },
    { key: 'upland',         label: '🏔️ Upland & Moorland',  type: 'environment', note: 'Blanket bog, high moorland & mountain' },
    { key: 'grassland',      label: '🌿 Grassland & Meadow',  type: 'environment', note: 'Hay meadows, chalk downland & rough grass' },
    { key: 'hedgerow',       label: '🌿 Hedgerow & Scrub',    type: 'environment', note: 'Field boundaries, bramble & thick scrub' },
    { key: 'nature-reserve', label: '🌿 Nature Reserve',      type: 'environment', note: 'RSPB, Wildlife Trust & NNR managed sites' },
  ];

  /* Maps habitat key → species group keys commonly found there */
  const HABITAT_GROUPS = {
    'garden':         ['tits', 'small-passerines', 'finches', 'hirundines', 'flycatchers'],
    'woodland':       ['tits', 'finches', 'flycatchers', 'raptors', 'owls'],
    'conifer':        ['tits', 'finches', 'owls'],
    'farmland':       ['small-passerines', 'finches', 'raptors', 'owls', 'fowl'],
    'wetland':        ['waterbirds', 'small-passerines', 'seabirds'],
    'river':          ['waterbirds', 'small-passerines'],
    'lake':           ['waterbirds', 'seabirds'],
    'estuary':        ['waterbirds', 'seabirds'],
    'coastal':        ['seabirds', 'raptors'],
    'urban':          ['small-passerines', 'hirundines', 'seabirds', 'raptors'],
    'heathland':      ['finches', 'raptors', 'owls', 'small-passerines'],
    'upland':         ['finches', 'raptors', 'owls'],
    'grassland':      ['finches', 'raptors', 'owls', 'small-passerines'],
    'hedgerow':       ['finches', 'small-passerines', 'flycatchers', 'tits'],
    'nature-reserve': ['tits', 'finches', 'flycatchers', 'waterbirds', 'seabirds', 'raptors', 'owls'],
  };

  /* Reverse lookup: species group key → array of habitat keys (inverts HABITAT_GROUPS) */
  const GROUP_HABITATS = {};
  Object.entries(HABITAT_GROUPS).forEach(function ([habitatKey, groups]) {
    groups.forEach(function (group) {
      if (!GROUP_HABITATS[group]) GROUP_HABITATS[group] = [];
      GROUP_HABITATS[group].push(habitatKey);
    });
  });

  /* Reverse lookup: stripped lowercase label → environment item */
  const ENVIRONMENT_BY_LABEL = {};
  ENVIRONMENTS.forEach(function (e) {
    ENVIRONMENT_BY_LABEL[e.label.replace(/^.+? /, '').toLowerCase()] = e;
  });

  const LOCATIONS = [
    /* ── England — South West ─────────────────────────────────────────── */
    { label: '📍 Cornwall',              type: 'location', note: 'England' },
    { label: '📍 Devon',                 type: 'location', note: 'England' },
    { label: '📍 Somerset',              type: 'location', note: 'England' },
    { label: '📍 Dorset',                type: 'location', note: 'England' },
    { label: '📍 Wiltshire',             type: 'location', note: 'England' },
    { label: '📍 Gloucestershire',       type: 'location', note: 'England' },
    { label: '📍 Bristol',               type: 'location', note: 'England' },
    /* ── England — South East ─────────────────────────────────────────── */
    { label: '📍 Hampshire',             type: 'location', note: 'England' },
    { label: '📍 Isle of Wight',         type: 'location', note: 'England' },
    { label: '📍 Surrey',                type: 'location', note: 'England' },
    { label: '📍 Kent',                  type: 'location', note: 'England' },
    { label: '📍 East Sussex',           type: 'location', note: 'England' },
    { label: '📍 West Sussex',           type: 'location', note: 'England' },
    { label: '📍 Berkshire',             type: 'location', note: 'England' },
    { label: '📍 Oxfordshire',           type: 'location', note: 'England' },
    { label: '📍 Buckinghamshire',       type: 'location', note: 'England' },
    { label: '📍 Hertfordshire',         type: 'location', note: 'England' },
    { label: '📍 Bedfordshire',          type: 'location', note: 'England' },
    { label: '📍 Essex',                 type: 'location', note: 'England' },
    { label: '📍 Greater London',        type: 'location', note: 'England' },
    /* ── England — East ───────────────────────────────────────────────── */
    { label: '📍 Norfolk',               type: 'location', note: 'England' },
    { label: '📍 Suffolk',               type: 'location', note: 'England' },
    { label: '📍 Cambridgeshire',        type: 'location', note: 'England' },
    { label: '📍 Lincolnshire',          type: 'location', note: 'England' },
    /* ── England — East Midlands ──────────────────────────────────────── */
    { label: '📍 Northamptonshire',      type: 'location', note: 'England' },
    { label: '📍 Leicestershire',        type: 'location', note: 'England' },
    { label: '📍 Rutland',               type: 'location', note: 'England' },
    { label: '📍 Nottinghamshire',       type: 'location', note: 'England' },
    { label: '📍 Derbyshire',            type: 'location', note: 'England' },
    /* ── England — West Midlands ──────────────────────────────────────── */
    { label: '📍 Staffordshire',         type: 'location', note: 'England' },
    { label: '📍 Shropshire',            type: 'location', note: 'England' },
    { label: '📍 Herefordshire',         type: 'location', note: 'England' },
    { label: '📍 Worcestershire',        type: 'location', note: 'England' },
    { label: '📍 Warwickshire',          type: 'location', note: 'England' },
    /* ── England — Yorkshire & the Humber ────────────────────────────── */
    { label: '📍 North Yorkshire',       type: 'location', note: 'England' },
    { label: '📍 East Yorkshire',        type: 'location', note: 'England' },
    { label: '📍 West Yorkshire',        type: 'location', note: 'England' },
    { label: '📍 South Yorkshire',       type: 'location', note: 'England' },
    /* ── England — North West ─────────────────────────────────────────── */
    { label: '📍 Cheshire',              type: 'location', note: 'England' },
    { label: '📍 Lancashire',            type: 'location', note: 'England' },
    { label: '📍 Merseyside',            type: 'location', note: 'England' },
    { label: '📍 Greater Manchester',    type: 'location', note: 'England' },
    { label: '📍 Cumbria',              type: 'location', note: 'England' },
    /* ── England — North East ─────────────────────────────────────────── */
    { label: '📍 Northumberland',        type: 'location', note: 'England' },
    { label: '📍 County Durham',         type: 'location', note: 'England' },
    { label: '📍 Tyne & Wear',           type: 'location', note: 'England' },
    /* ── England — National Parks ────────────────────────────────────── */
    { label: '📍 Lake District',         type: 'location', note: 'National Park' },
    { label: '📍 Peak District',         type: 'location', note: 'National Park' },
    { label: '📍 New Forest',            type: 'location', note: 'National Park' },
    { label: '📍 South Downs',           type: 'location', note: 'National Park' },
    { label: '📍 Dartmoor',              type: 'location', note: 'National Park' },
    { label: '📍 Exmoor',                type: 'location', note: 'National Park' },
    { label: '📍 Yorkshire Dales',       type: 'location', note: 'National Park' },
    { label: '📍 North York Moors',      type: 'location', note: 'National Park' },
    { label: '📍 Broads',                type: 'location', note: 'National Park' },
    /* ── Scotland ─────────────────────────────────────────────────────── */
    { label: '📍 Highlands',             type: 'location', note: 'Scotland' },
    { label: '📍 Aberdeenshire',         type: 'location', note: 'Scotland' },
    { label: '📍 Moray',                 type: 'location', note: 'Scotland' },
    { label: '📍 Angus',                 type: 'location', note: 'Scotland' },
    { label: '📍 Perth & Kinross',       type: 'location', note: 'Scotland' },
    { label: '📍 Fife',                  type: 'location', note: 'Scotland' },
    { label: '📍 Lothian',               type: 'location', note: 'Scotland' },
    { label: '📍 Scottish Borders',      type: 'location', note: 'Scotland' },
    { label: '📍 Dumfries & Galloway',   type: 'location', note: 'Scotland' },
    { label: '📍 Ayrshire',              type: 'location', note: 'Scotland' },
    { label: '📍 Argyll & Bute',         type: 'location', note: 'Scotland' },
    { label: '📍 Stirlingshire',         type: 'location', note: 'Scotland' },
    { label: '📍 Lanarkshire',           type: 'location', note: 'Scotland' },
    { label: '📍 Orkney Islands',        type: 'location', note: 'Scotland' },
    { label: '📍 Shetland Islands',      type: 'location', note: 'Scotland' },
    { label: '📍 Outer Hebrides',        type: 'location', note: 'Scotland' },
    { label: '📍 Inner Hebrides',        type: 'location', note: 'Scotland' },
    { label: '📍 Cairngorms',            type: 'location', note: 'National Park' },
    { label: '📍 Loch Lomond',           type: 'location', note: 'National Park' },
    /* ── Wales ────────────────────────────────────────────────────────── */
    { label: '📍 Gwynedd',               type: 'location', note: 'Wales' },
    { label: '📍 Anglesey',              type: 'location', note: 'Wales' },
    { label: '📍 Conwy',                 type: 'location', note: 'Wales' },
    { label: '📍 Denbighshire',          type: 'location', note: 'Wales' },
    { label: '📍 Flintshire',            type: 'location', note: 'Wales' },
    { label: '📍 Wrexham',               type: 'location', note: 'Wales' },
    { label: '📍 Powys',                 type: 'location', note: 'Wales' },
    { label: '📍 Ceredigion',            type: 'location', note: 'Wales' },
    { label: '📍 Pembrokeshire',         type: 'location', note: 'Wales' },
    { label: '📍 Carmarthenshire',       type: 'location', note: 'Wales' },
    { label: '📍 Swansea',               type: 'location', note: 'Wales' },
    { label: '📍 Neath Port Talbot',     type: 'location', note: 'Wales' },
    { label: '📍 Bridgend',              type: 'location', note: 'Wales' },
    { label: '📍 Vale of Glamorgan',     type: 'location', note: 'Wales' },
    { label: '📍 Cardiff',               type: 'location', note: 'Wales' },
    { label: '📍 Monmouthshire',         type: 'location', note: 'Wales' },
    { label: '📍 Brecknockshire',        type: 'location', note: 'Wales' },
    { label: '📍 Snowdonia',             type: 'location', note: 'National Park' },
    { label: '📍 Brecon Beacons',        type: 'location', note: 'National Park' },
    { label: '📍 Pembrokeshire Coast',   type: 'location', note: 'National Park' },
    /* ── Northern Ireland ─────────────────────────────────────────────── */
    { label: '📍 County Antrim',         type: 'location', note: 'Northern Ireland' },
    { label: '📍 County Armagh',         type: 'location', note: 'Northern Ireland' },
    { label: '📍 County Down',           type: 'location', note: 'Northern Ireland' },
    { label: '📍 County Fermanagh',      type: 'location', note: 'Northern Ireland' },
    { label: '📍 County Londonderry',    type: 'location', note: 'Northern Ireland' },
    { label: '📍 County Tyrone',         type: 'location', note: 'Northern Ireland' },
  ];

  /* Merge and sort alphabetically by display text (stripping the emoji prefix) */
  const ALL_SUGGESTIONS = [...SPECIES, ...LOCATIONS, ...ENVIRONMENTS].sort((a, b) =>
    a.label.replace(/^.+? /, '').localeCompare(b.label.replace(/^.+? /, ''))
  );

  /* ── Browse hints — meta-entries that expand into a category on selection –– */

  /* One entry per species group, count derived live from SPECIES array */
  function countGroup(g) { return SPECIES.filter(s => s.group === g).length; }
  const SPECIES_GROUP_HINTS = [
    { label: '🐦 Finches & Buntings',    type: 'hint', search: 'finches',        note: countGroup('finches')        + ' species' },
    { label: '🐦 Flycatchers & Chats',   type: 'hint', search: 'flycatchers',    note: countGroup('flycatchers')    + ' species' },
    { label: '🐾 Fowl & Poultry',         type: 'hint', search: 'fowl',            note: countGroup('fowl')            + ' species' },
    { label: '🐦 Hirundines & Swifts',   type: 'hint', search: 'hirundines',     note: countGroup('hirundines')     + ' species' },
    { label: '🦉 Owls',                   type: 'hint', search: 'owls',            note: countGroup('owls')            + ' species' },
    { label: '🦅 Raptors & Corvids',      type: 'hint', search: 'raptors',         note: countGroup('raptors')         + ' species' },
    { label: '🐦 Seabirds & Gulls',       type: 'hint', search: 'seabirds',        note: countGroup('seabirds')        + ' species' },
    { label: '🐦 Small Passerines',       type: 'hint', search: 'garden birds',    note: countGroup('small-passerines') + ' species' },
    { label: '🐦 Tits & Woodland',        type: 'hint', search: 'tits',            note: countGroup('tits')            + ' species' },
    { label: '🦆 Waterbirds & Ducks',     type: 'hint', search: 'waterbirds',      note: countGroup('waterbirds')      + ' species' },
  ];

  /* Maps typed terms to a result-set strategy: { type } filters by item type,
     { hints } renders a fixed hint list, { group } delegates to GROUP_ALIASES */
  const TYPE_ALIASES = {
    'species':          { hints: SPECIES_GROUP_HINTS,  heading: 'Browse by species group' },
    'species group':    { hints: SPECIES_GROUP_HINTS,  heading: 'Browse by species group' },
    'species groups':   { hints: SPECIES_GROUP_HINTS,  heading: 'Browse by species group' },
    'bird group':       { hints: SPECIES_GROUP_HINTS,  heading: 'Browse by species group' },
    'bird groups':      { hints: SPECIES_GROUP_HINTS,  heading: 'Browse by species group' },
    'groups':           { hints: SPECIES_GROUP_HINTS,  heading: 'Browse by species group' },
    'location':         { type:  'location',           heading: 'All locations' },
    'locations':        { type:  'location',           heading: 'All locations' },
    'area':             { type:  'location',           heading: 'All locations' },
    'areas':            { type:  'location',           heading: 'All locations' },
    'region':           { type:  'location',           heading: 'All locations' },
    'regions':          { type:  'location',           heading: 'All locations' },
    'environment':      { type:  'environment',        heading: 'All environments' },
    'environments':     { type:  'environment',        heading: 'All environments' },
    'habitat':          { type:  'environment',        heading: 'All environments' },
    'habitats':         { type:  'environment',        heading: 'All environments' },
  };

  /* Popular picks shown before the user types */
  const DEFAULTS = [
    { label: '🐦 Browse by species group', type: 'hint', search: 'species',   note: 'Owls, raptors, finches, seabirds…' },
    { label: '📍 Browse all locations',    type: 'hint', search: 'locations', note: 'UK regions & areas' },
    { label: '🌿 Browse all habitats',     type: 'hint', search: 'habitats',  note: 'Garden, woodland, wetland…' },
    SPECIES.find(s => s.label.includes('Blue Tit')),
    SPECIES.find(s => s.label.includes('Robin')),
    SPECIES.find(s => s.label.includes('Barn Owl')),
    SPECIES.find(s => s.label.includes('Common Swift')),
    SPECIES.find(s => s.label.includes('Kingfisher')),
    LOCATIONS.find(l => l.label.includes('Yorkshire')),
    LOCATIONS.find(l => l.label.includes('Norfolk')),
  ].filter(Boolean);

  /* ── DOM refs ───────────────────────────────────────────────────────── */
  const input = document.getElementById('hub-search-input');
  const list  = document.getElementById('hub-suggestions');
  if (!input || !list) return;

  let activeIndex = -1;

  /* ── Rendering ──────────────────────────────────────────────────────── */
  function render(matches, heading) {
    list.innerHTML = '';
    activeIndex = -1;
    if (!matches.length) { hide(); return; }
    if (heading) {
      const h = document.createElement('li');
      h.className = 'hub-suggestion-heading';
      h.textContent = heading;
      h.setAttribute('aria-hidden', 'true');
      list.appendChild(h);
    }
    /* No cap for full-category views (dropdown is scrollable); cap filtered searches */
    const limit = heading ? Infinity : 8;
    matches.slice(0, limit).forEach(function (item, i) {
      /* Section divider — non-interactive inline heading injected into match arrays */
      if (item.type === 'section-heading') {
        const h = document.createElement('li');
        h.className = 'hub-suggestion-heading hub-suggestion-heading--inline';
        h.textContent = item.text;
        h.setAttribute('aria-hidden', 'true');
        list.appendChild(h);
        return;
      }
      const li = document.createElement('li');
      li.setAttribute('role', 'option');
      li.setAttribute('data-index', i);
      const typeClass = item.type === 'species'     ? ' is-species'
                        : item.type === 'environment' ? ' is-environment'
                        : item.type === 'hint'        ? ' is-hint'
                        : ' is-location';
      li.className = 'hub-suggestion-item' + typeClass;
      const arrow = item.type === 'hint' ? '<span class="sug-arrow">›</span>' : '';
      li.innerHTML = arrow + '<span class="sug-label">' + item.label + '</span>' +
        (item.note ? '<span class="sug-note">' + item.note + '</span>' : '');
      li.addEventListener('mousedown', function (e) {
        e.preventDefault();
        if (item.type === 'hint') {
          /* Hints expand into their target category rather than filling the input */
          input.value = item.search;
          input.dispatchEvent(new Event('input'));
        } else if (item.type === 'environment') {
          /* Environments re-run the filter so related species appear below */
          input.value = item.label.replace(/^.+? /, '');
          input.dispatchEvent(new Event('input'));
        } else {
          input.value = item.label.replace(/^.+? /, '');
          hide();
        }
        input.focus();
      });
      list.appendChild(li);
    });
    list.setAttribute('aria-hidden', 'false');
    list.classList.add('is-open');
  }

  function hide() {
    list.classList.remove('is-open');
    list.setAttribute('aria-hidden', 'true');
    activeIndex = -1;
  }

  function setActive(index) {
    const items = list.querySelectorAll('.hub-suggestion-item');
    items.forEach(function (el) { el.classList.remove('is-active'); });
    if (index >= 0 && index < items.length) {
      items[index].classList.add('is-active');
      activeIndex = index;
    }
  }

  function showDefaults() {
    render(DEFAULTS, 'Popular searches');
  }

  /* ── Event listeners ────────────────────────────────────────────────── */
  input.addEventListener('focus', function () {
    if (input.value.trim() === '') showDefaults();
  });

  input.addEventListener('input', function () {
    const q = input.value.trim().toLowerCase();
    if (q.length < 1) { showDefaults(); return; }
    /* 1. Check TYPE_ALIASES (locations / habitats / species groups) */
    const typeAlias = TYPE_ALIASES[q];
    if (typeAlias) {
      if (typeAlias.hints) { render(typeAlias.hints, typeAlias.heading); return; }
      render(ALL_SUGGESTIONS.filter(item => item.type === typeAlias.type), typeAlias.heading);
      return;
    }
    /* 2. Check if the query exactly matches an environment label — if so,
          show the habitat entry followed by species commonly found there */
    const matchedEnv = ENVIRONMENT_BY_LABEL[q];
    if (matchedEnv) {
      const groups = HABITAT_GROUPS[matchedEnv.key] || [];
      const relatedSpecies = SPECIES.filter(s => groups.includes(s.group));
      const combined = [
        matchedEnv,
        { type: 'section-heading', text: 'Common species in this habitat' },
        ...relatedSpecies,
      ];
      render(combined, matchedEnv.label.replace(/^.+? /, '') + ' — birds & habitat');
      return;
    }
    /* 3. Check GROUP_ALIASES (raptors / owls / finches …) */
    const targetGroup = GROUP_ALIASES[q] || null;
    const matches = ALL_SUGGESTIONS.filter(function (item) {
      if (item.group) {
        if (targetGroup && item.group === targetGroup) return true;
        if (item.group.toLowerCase().includes(q)) return true;
      }
      return item.label.toLowerCase().includes(q);
    });
    /* When species appear in results, suggest the habitats where those groups live */
    const speciesMatches = matches.filter(function (m) { return m.type === 'species'; });
    const relatedEnvs = (function () {
      if (!speciesMatches.length) return [];
      const groups = [...new Set(speciesMatches.map(function (s) { return s.group; }).filter(Boolean))];
      const habitatKeys = [...new Set(groups.reduce(function (acc, g) { return acc.concat(GROUP_HABITATS[g] || []); }, []))];
      return habitatKeys
        .map(function (k) { return ENVIRONMENTS.find(function (e) { return e.key === k; }); })
        .filter(Boolean)
        .slice(0, 5);
    })();
    const augmented = relatedEnvs.length
      ? [...matches, { type: 'section-heading', text: 'Also found in…' }, ...relatedEnvs]
      : matches;
    const heading = targetGroup
      ? ('All ' + targetGroup)
      : (relatedEnvs.length ? 'Matching birds & habitats' : null);
    render(augmented, heading);
  });

  input.addEventListener('keydown', function (e) {
    const items = list.querySelectorAll('.hub-suggestion-item');
    if (e.key === 'ArrowDown' && !list.classList.contains('is-open')) {
      e.preventDefault();
      if (input.value.trim() === '') { showDefaults(); } else { input.dispatchEvent(new Event('input')); }
      setActive(0);
      return;
    }
    if (!list.classList.contains('is-open')) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(Math.min(activeIndex + 1, items.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(Math.max(activeIndex - 1, 0));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      items[activeIndex].dispatchEvent(new MouseEvent('mousedown'));
    } else if (e.key === 'Escape') {
      hide();
    }
  });

  document.addEventListener('click', function (e) {
    if (!input.contains(e.target) && !list.contains(e.target)) hide();
  });
})();
