/* =============================================================================
   NestNinja Hub — Search autocomplete
   Demo data only; live search will be powered by Firebase once Hub launches.
   ============================================================================= */

(function () {
  /* ── Demo autocomplete data ─────────────────────────────────────────── */

  /* Helper: maps [label, note] pairs → species objects with shared type & group */
  function grp(group, pairs) {
    return pairs.map(([label, note]) => ({ label, note, type: 'species', group }));
  }

  /* All species — type & group injected by grp(); entries are [label, note] pairs */
  const SPECIES = [
    ...grp('tits', [
      ['🐦 Blue Tit',              'Most common nest box occupant'],
      ['🐦 Great Tit',             'Prefers larger entrance holes'],
      ['🐦 Coal Tit',              'Prefers conifer woodland'],
      ['🐦 Marsh Tit',             'Declining; 25–28 mm entrance hole'],
      ['🐦 Long-tailed Tit',       'Builds own domed nest; uses boxes to roost'],
      ['🐦 Nuthatch',              'Plasters mud around the entrance to fit'],
      ['🐦 Treecreeper',           'Needs wedge-shaped open-back box'],
      ['🐦 Willow Tit',            'Critically declining; excavates own cavity in rotting wood'],
      ['🐦 Crested Tit',           'Scotland only; Caledonian pine forests; uses nest boxes'],
    ]),
    ...grp('small-passerines', [
      ['🐦 House Sparrow',         'Colonial nesters; use terrace-style boxes'],
      ['🐦 Tree Sparrow',          'Red-listed; prefers colonial boxes in farmland'],
      ['🐦 Robin',                 'Open-fronted box specialist'],
      ['🐦 Wren',                  'Tiny but loud; loves dense cover'],
      ['🐦 Starling',              'Noisy, gregarious, red-listed in UK'],
      ['🐦 Pied Wagtail',          'Open-fronted box in farmyards/buildings'],
      ['🐦 Grey Wagtail',          'Open-fronted box near fast-moving streams'],
      ['🐦 Dipper',                'Open-fronted box over upland streams'],
      ['🐦 Dunnock',               'Hedge Sparrow; very common garden & hedgerow bird'],
      ['🐦 Song Thrush',           'Red-listed; uses anvil stone to smash snails'],
      ['🐦 Mistle Thrush',         'Largest UK thrush; sings boldly in bad weather'],
      ['🐦 Goldcrest',             'Smallest UK bird; conifer woodland & gardens'],
      ['🐦 Waxwing',               'Irruption winter visitor; berries in carparks & hedges'],
      ['🐦 Nightingale',           'Declining summer visitor; remarkable nocturnal song'],
      ['🦜 Ring-necked Parakeet',  'Naturalised; common SE England gardens; uses nest boxes'],
    ]),
    ...grp('finches', [
      ['🐦 Chaffinch',             'Most common UK finch; open woodland & gardens'],
      ['🐦 Brambling',             'Winter visitor; beech mast specialist'],
      ['🐦 Goldfinch',             'Loves teasel & nyjer seed; garden feeder regular'],
      ['🐦 Siskin',                'Conifer & alder specialist; garden feeder in winter'],
      ['🐦 Linnet',                'Farmland & heath; declining in UK'],
      ['🐦 Twite',                 'Upland moorland specialist; red-listed'],
      ['🐦 Lesser Redpoll',        'Birch & alder woodland; declining'],
      ['🐦 Common Crossbill',      'Conifer specialist; nomadic; Scottish pinewoods'],
      ['🐦 Parrot Crossbill',      'Rare; Scots pine specialist in Scotland'],
      ['🐦 Scottish Crossbill',    'Endemic UK species; Caledonian pinewoods only'],
      ['🐦 Bullfinch',             'Orchard & woodland edges; eats flower buds'],
      ['🐦 Hawfinch',              'Large secretive finch; hornbeam & cherry woods'],
      ['🐦 Greenfinch',            'Garden regular; declining due to trichomonosis'],
      ['🐦 Yellowhammer',          'Farmland bunting; red-listed; hedgerow nester'],
      ['🐦 Reed Bunting',          'Wetland & farmland; open-cup nest in vegetation'],
      ['🐦 Corn Bunting',          'Arable farmland; red-listed in UK'],
      ['🐦 Snow Bunting',          'Winter visitor to coasts & uplands; rare breeder'],
    ]),
    ...grp('flycatchers', [
      ['🐦 Pied Flycatcher',       'Summer visitor from Africa; Welsh oak woods'],
      ['🐦 Spotted Flycatcher',    'Open-fronted box on wall or trellis'],
      ['🐦 Common Redstart',       'Striking red tail; Welsh & northern woodlands'],
      ['🐦 Black Redstart',        'Urban specialist; industrial brownfield sites'],
      ['🐦‍⬛ Blackbird',             'Open-fronted box in dense shrubs'],
      ['🐦 Fieldfare',             'Winter visitor from Scandinavia; hawthorn berry specialist'],
      ['🐦 Redwing',               'Winter visitor; smallest UK thrush; ivy berry favoured'],
      ['🐦 Ring Ouzel',            'Mountain Blackbird; upland summer visitor; declining'],
      ['🐦 Stonechat',             'Year-round on heathland & coastal scrub'],
      ['🐦 Whinchat',              'Summer visitor to upland & rough grassland; declining'],
      ['🐦 Wheatear',              'First spring migrant; upland & coastal; nests in cavities'],
    ]),
    ...grp('hirundines', [
      ['🐦 Common Swift',          'Specialist swift box under eaves; declining fast'],
      ['🐦 Barn Swallow',          'Open barns & sheds; declining in UK'],
      ['🐦 House Martin',          'Artificial cup nests under eaves'],
      ['🐦 Sand Martin',           'Colonial burrow boxes in earth banks'],
    ]),
    ...grp('warblers', [
      ['🐦 Blackcap',              'Very common; increasingly overwinters; easy to see'],
      ['🐦 Garden Warbler',        'Plain but lovely song; common woodland & scrub'],
      ['🐦 Whitethroat',           'Most common UK Sylvia; hedgerows & farmland scrub'],
      ['🐦 Lesser Whitethroat',    'Common but skulking; rattle song; overgrown hedges'],
      ['🐦 Chiffchaff',            'First spring migrant; "chiff-chaff" song; widespread'],
      ['🐦 Willow Warbler',        'Most abundant summer visitor; declining in south'],
      ['🐦 Wood Warbler',          'Declining sessile oak woodland specialist; shivering song'],
      ['🐦 Sedge Warbler',         'Wetland scrub; loud varied song; mimics other birds'],
      ['🐦 Reed Warbler',          'Reed-bed specialist; main Cuckoo host in England'],
      ['🐦 Grasshopper Warbler',   'Reeling insect-like song; wet grassland & scrub'],
      ["🐦 Cetti's Warbler",       'Loud explosive song; resident; expanding northward'],
      ['🐦 Dartford Warbler',      'Heathland specialist; southern England; year-round'],
    ]),
    ...grp('countryside', [
      ['🐦 Woodpigeon',            'Most abundant UK breeding bird; gardens & farmland'],
      ['🕊️ Collared Dove',        'Ubiquitous garden dove; colonised UK from 1950s'],
      ['🕊️ Turtle Dove',          'Red-listed; summer visitor; dramatically declining'],
      ['🐦 Cuckoo',                'Declining migrant; brood parasite; iconic call'],
      ['🐦 Skylark',               'Red-listed; song-flight icon; arable farmland'],
      ['🐦 Lapwing',               'Red-listed; peewit call; declining farmland wader'],
      ['🐦 Curlew',                'Red-listed; at-risk upland & coastal wader'],
      ['🐦 Woodcock',              'Woodland wader; roding display at dusk'],
      ['🐦 Snipe',                 'Wetland wader; drumming aerial display'],
      ['🐦 Nightjar',              'Heathland; churring nocturnal migrant; declining'],
      ['🐦 Red Grouse',            'Iconic Scottish moor bird; endemic UK subspecies'],
      ['🐦 Capercaillie',          'Critically endangered; Scottish Caledonian pine'],
    ]),
    ...grp('owls', [
      ['🦉 Barn Owl',              'Tall open box on pole or inside barn'],
      ['🦉 Tawny Owl',             'Woodland owl; large chimney-style box'],
      ['🦉 Little Owl',            'Farmland edges; stone wall & pole boxes'],
      ['🦉 Long-eared Owl',        'Conifer plantation; uses open basket platforms'],
      ['🦉 Short-eared Owl',       'Day-flying; open moorland, marsh & coastal grassland'],
    ]),
    ...grp('raptors', [
      ['🦅 Common Kestrel',        'Open farmland; tall pole or tower boxes'],
      ['🦅 Peregrine Falcon',      'Cliff ledge trays; now also urban buildings'],
      ['🦅 Sparrowhawk',           'Most common UK garden raptor; dashes through hedges'],
      ['🦅 Buzzard',               'Now most common UK raptor; broad wings; mewing call'],
      ['🦅 Red Kite',              'Conservation success; forked tail; widespread in Wales & England'],
      ['🦅 Osprey',                'Artificial nest platforms; Scottish lochs & rivers'],
      ['🦅 Merlin',                'Smallest UK falcon; dashing flight over upland'],
      ['🦅 Hobby',                 'Summer visitor; uses old crow nests; hunts hirundines'],
      ['🦅 Marsh Harrier',         'Reed-bed hunter; recovering; glides on tilted wings'],
      ['🦅 Hen Harrier',           'Upland harrier; ghost-grey male; conservation controversy'],
      ['🦅 Goshawk',               'Large secretive woodland raptor; rare breeder'],
      ['🐦‍⬛ Carrion Crow',           'Highly intelligent; uses ledges & large trees'],
      ['🐦 Hooded Crow',             'Grey & black; replaces Carrion Crow in Scotland & Ireland'],
      ['🐦‍⬛ Rook',                   'Colonial treetop nester; rookeries in tall elms & beeches'],
      ['🐦‍⬛ Jackdaw',                'Will take over large chimney & cavity boxes'],
      ['🐦‍⬛ Raven',                  'Largest corvid; cliff ledge & crag nester'],
      ['🐦 Magpie',                  'Dome-shaped stick nest in dense shrubs & trees'],
      ['🐦 Jay',                     'Secretive woodland corvid; acorn specialist'],
      ['🐦‍⬛ Chough',                 'Red bill & legs; cliff caves & old mine entrances'],
      ['�️ Stock Dove',            'Farmland; uses barn-owl style boxes'],
      ['🐦 Great Spotted Woodpecker', 'Excavates own holes; may enlarge box entrance'],
      ['🐦 Lesser Spotted Woodpecker', 'Tiny; declining woodland specialist'],
      ['🐦 Green Woodpecker',      'Ant specialist; rarely uses boxes'],
    ]),
    ...grp('waterbirds', [
      ['🦆 Mandarin Duck',         'Large oval box near woodland water'],
      ['🦆 Goldeneye',             'Scottish lochs; large hole boxes on trees'],
      ['🦆 Goosander',             'Large box near rivers & lochs in Scotland'],
      ['🦆 Common Merganser',      'Same box spec as Goosander; river specialist'],
      ['🦆 Tufted Duck',           'Ground nester near water; uses cover boxes'],
      ['🦆 Wood Duck',             'Escaped breeder; takes Mandarin-style boxes'],
      ['🦢 Mute Swan',             'Unmistakable; common on rivers, lakes & parks'],
      ['🦆 Mallard',               'Most common UK duck; often nests in gardens near water'],
      ['🦆 Teal',                  'Smallest UK dabbling duck; wetland & river margins'],
      ['🐦 Moorhen',               'Very common; red forehead shield; streamsides & ponds'],
      ['🐦 Coot',                  'White bill & forehead; open water nester'],
      ['🐦 Grey Heron',            'Very common; patient fisher; colonial treetop nester'],
      ['🐦 Little Egret',          'Now common; colonial nester; white with yellow feet'],
      ['🐦 Kingfisher',            'Tunnel box in river bank; requires specialist setup'],
    ]),
    ...grp('seabirds', [
      ['🐦 Herring Gull',          'Nests on rooftops & sea cliffs; urban & coastal'],
      ['🐦 Lesser Black-backed Gull', 'Rooftop nester in many UK cities'],
      ['🐦 Greater Black-backed Gull', 'Large coastal cliff & island nester'],
      ['🐦 Black-headed Gull',     'Colonial ground nester on marshes & islands'],
      ['🐦 Common Gull',           'Ground nester on moorland, coasts & rooftops'],
      ['🐦 Kittiwake',             'Cliff ledge specialist; artificial ledge boxes'],
      ['🐦 Common Tern',           'Floating tern raft platforms on lakes & coasts'],
      ['🐦 Arctic Tern',           'Ground nester on northern islands & coasts'],
      ['🐦 Little Tern',           'Shingle beach nester; red-listed in UK'],
      ['🐦 Sandwich Tern',         'Colonial coastal sand & shingle nester'],
      ['🐦 Puffin',                'Excavates burrows; artificial burrow tubes used'],
      ['🐦 Razorbill',             'Rocky cliff ledges & crevices'],
      ['🐦 Common Guillemot',      'Bare cliff ledge colonies; no nest structure'],
      ['🐦 Gannet',                'Cliff-top colonies; Bass Rock & Grassholm'],
      ['🐦 Fulmar',                'Cliff ledge nester; expanding inland'],
    ]),
    ...grp('fowl', [
      ['🐔 Chicken',               'Most common coop bird; hundreds of breeds'],
      ['🐔 Bantam',                'Miniature chicken; great for small gardens'],
      ['🦃 Turkey',                'Large poultry; needs spacious covered run'],
      ['🦆 Domestic Duck',         'Needs access to water; messy but friendly'],
      ['🦆 Khaki Campbell',        'Prolific egg-laying duck breed'],
      ['🦆 Indian Runner Duck',    'Upright posture; excellent forager'],
      ['🦆 Muscovy Duck',          'Perches & roosts; prefers raised box'],
      ['🪿 Domestic Goose',        'Loud guard animal; grazes pasture'],
      ['🪿 Embden Goose',          'Large white breed; common UK farm goose'],
      ['🪿 Toulouse Goose',        'Heavy breed; calm temperament'],
      ['🐦 Guinea Fowl',           'Excellent pest control; very loud alarm calls'],
      ['🐦 Helmeted Guinea Fowl',  'Most common guinea breed kept in UK'],
      ['🦚 Peafowl',               'Peacock & peahen; free-range with high roost'],
      ['🐦 Quail',                 'Japanese quail common for eggs; small pen'],
      ['🐦 Pheasant',              'Game bird; large aviary or woodland pen'],
      ['🐦 Red-legged Partridge',  'Game bird; ground-nesting, aviary kept'],
      ['🐦 Grey Partridge',        'Native game bird; declining in the wild'],
      ['🕊️ Domestic Pigeon',       'Racing, fancy & utility breeds; loft kept'],
      ['🕊️ Racing Homer',          'Homing pigeon bred for endurance races'],
      ['🕊️ Dove',                  'Ringneck & diamond doves; dovecote or aviary'],
    ]),
  /* deduplicate by label */
  ].filter((item, idx, arr) => arr.findIndex(x => x.label === item.label) === idx);

  /* Aliases: maps taxonomic/common terms to internal species group keys.
     Only include FAMILY/GROUP-level synonyms — individual species names are
     intentionally omitted so label-text matching finds them directly.
     Group-key substrings (e.g. 'raptor' for group 'raptors') are also omitted
     because the item-level filter already checks group.includes(query).
     Habitat & environment terms are intentionally excluded here — they resolve
     via label-text search against the ENVIRONMENTS array instead. */
  const GROUP_ALIASES = {
    // raptors
    'bird of prey':     'raptors',
    'birds of prey':    'raptors',
    'birds-of-prey':    'raptors',
    'corvid':           'raptors',
    'corvids':          'raptors',
    // owls
    'night bird':       'owls',
    'night birds':      'owls',
    // finches & buntings
    'bunting':          'finches',
    'buntings':         'finches',
    // small passerines
    'garden bird':      'small-passerines',
    'garden birds':     'small-passerines',
    // flycatchers, chats & thrushes
    'chat':             'flycatchers',
    'chats':            'flycatchers',
    'thrush':           'flycatchers',
    'thrushes':         'flycatchers',
    // hirundines
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
    'water bird':       'waterbirds',
    'water birds':      'waterbirds',
    // seabirds
    'sea bird':         'seabirds',
    'sea birds':        'seabirds',
    'gull':             'seabirds',
    'gulls':            'seabirds',
    'tern':             'seabirds',
    'terns':            'seabirds',
    'auk':              'seabirds',
    'auks':             'seabirds',
    // fowl & poultry
    'poultry':          'fowl',
    'chicken':          'fowl',
    'chickens':         'fowl',
    'hen':              'fowl',
    'hens':             'fowl',
    'cockerel':         'fowl',
    'coop':             'fowl',
    'chicken coop':     'fowl',
    'goose':            'fowl',
    'geese':            'fowl',
    'guinea':           'fowl',
    'game bird':        'fowl',
    'game birds':       'fowl',
    'farmyard':         'fowl',
    'farmyard bird':    'fowl',
    // warblers
    'leaf warbler':     'warblers',
    // countryside, open land & waders
    'wader':            'countryside',
    'waders':           'countryside',
    'shorebird':        'countryside',
  };

  /* Environments — type:'environment' injected by .map(); entries are [key, label, note] */
  const ENVIRONMENTS = [
    ['garden',         '🌿 Garden',              'Domestic gardens, feeders & nest boxes'],
    ['woodland',       '🌲 Woodland',            'Deciduous & mixed woodland'],
    ['conifer',        '🌲 Conifer Forest',      'Pine & spruce plantation'],
    ['farmland',       '🌾 Farmland',            'Arable & pasture fields, farm buildings'],
    ['wetland',        '💧 Wetland & Marsh',     'Fens, bogs, reedbeds & carr woodland'],
    ['river',          '🌊 River & Stream',      'Fast & slow-moving freshwater'],
    ['lake',           '🌊 Lake & Loch',         'Still water; reservoirs, lochs & meres'],
    ['estuary',        '🌊 Estuary & Mudflat',   'Tidal mudflats & saltmarsh'],
    ['coastal',        '🌊 Coastal & Cliff',     'Sea cliffs, caves & rocky shores'],
    ['urban',          '🏙️ Urban & Rooftop',    'Rooftops, ledges & urban green space'],
    ['heathland',      '🌿 Heathland',           'Lowland heath; gorse & heather'],
    ['upland',         '🏔️ Upland & Moorland',  'Blanket bog, high moorland & mountain'],
    ['grassland',      '🌿 Grassland & Meadow',  'Hay meadows, chalk downland & rough grass'],
    ['hedgerow',       '🌿 Hedgerow & Scrub',    'Field boundaries, bramble & thick scrub'],
    ['nature-reserve', '🌿 Nature Reserve',      'RSPB, Wildlife Trust & NNR managed sites'],
  ].map(([key, label, note]) => ({ key, label, type: 'environment', note }));

  /* Maps habitat key → species group keys commonly found there */
  const HABITAT_GROUPS = {
    'garden':         ['tits', 'small-passerines', 'finches', 'hirundines', 'flycatchers', 'warblers', 'countryside'],
    'woodland':       ['tits', 'finches', 'flycatchers', 'warblers', 'raptors', 'owls'],
    'conifer':        ['tits', 'finches', 'owls', 'countryside'],
    'farmland':       ['small-passerines', 'finches', 'raptors', 'owls', 'fowl', 'countryside'],
    'wetland':        ['waterbirds', 'small-passerines', 'seabirds', 'warblers', 'countryside'],
    'river':          ['waterbirds', 'small-passerines'],
    'lake':           ['waterbirds', 'seabirds'],
    'estuary':        ['waterbirds', 'seabirds', 'countryside'],
    'coastal':        ['seabirds', 'raptors', 'countryside'],
    'urban':          ['small-passerines', 'hirundines', 'seabirds', 'raptors'],
    'heathland':      ['finches', 'raptors', 'owls', 'small-passerines', 'warblers', 'countryside'],
    'upland':         ['finches', 'raptors', 'owls', 'countryside'],
    'grassland':      ['finches', 'raptors', 'owls', 'small-passerines', 'countryside'],
    'hedgerow':       ['finches', 'small-passerines', 'flycatchers', 'tits', 'warblers', 'countryside'],
    'nature-reserve': ['tits', 'finches', 'flycatchers', 'warblers', 'waterbirds', 'seabirds', 'raptors', 'owls', 'countryside'],
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

  /* Helper: maps plain name strings → location objects with shared type & note */
  function locs(note, names) {
    return names.map(n => ({ label: '📍 ' + n, type: 'location', note }));
  }

  const LOCATIONS = [
    ...locs('England', [
      'Cornwall', 'Devon', 'Somerset', 'Dorset', 'Wiltshire', 'Gloucestershire', 'Bristol',
      'Hampshire', 'Isle of Wight', 'Surrey', 'Kent', 'East Sussex', 'West Sussex',
      'Berkshire', 'Oxfordshire', 'Buckinghamshire', 'Hertfordshire', 'Bedfordshire', 'Essex', 'Greater London',
      'Norfolk', 'Suffolk', 'Cambridgeshire', 'Lincolnshire',
      'Northamptonshire', 'Leicestershire', 'Rutland', 'Nottinghamshire', 'Derbyshire',
      'Staffordshire', 'Shropshire', 'Herefordshire', 'Worcestershire', 'Warwickshire',
      'North Yorkshire', 'East Yorkshire', 'West Yorkshire', 'South Yorkshire',
      'Cheshire', 'Lancashire', 'Merseyside', 'Greater Manchester', 'Cumbria',
      'Northumberland', 'County Durham', 'Tyne & Wear',
    ]),
    ...locs('Scotland', [
      'Highlands', 'Aberdeenshire', 'Moray', 'Angus', 'Perth & Kinross', 'Fife',
      'Lothian', 'Scottish Borders', 'Dumfries & Galloway', 'Ayrshire', 'Argyll & Bute',
      'Stirlingshire', 'Lanarkshire', 'Orkney Islands', 'Shetland Islands', 'Outer Hebrides', 'Inner Hebrides',
    ]),
    ...locs('Wales', [
      'Gwynedd', 'Anglesey', 'Conwy', 'Denbighshire', 'Flintshire', 'Wrexham',
      'Powys', 'Ceredigion', 'Pembrokeshire', 'Carmarthenshire', 'Swansea',
      'Neath Port Talbot', 'Bridgend', 'Vale of Glamorgan', 'Cardiff', 'Monmouthshire', 'Brecknockshire',
    ]),
    ...locs('Northern Ireland', [
      'County Antrim', 'County Armagh', 'County Down', 'County Fermanagh', 'County Londonderry', 'County Tyrone',
    ]),
    ...locs('National Park', [
      'Lake District', 'Peak District', 'New Forest', 'South Downs', 'Dartmoor', 'Exmoor',
      'Yorkshire Dales', 'North York Moors', 'Broads',
      'Cairngorms', 'Loch Lomond',
      'Snowdonia', 'Brecon Beacons', 'Pembrokeshire Coast',
    ]),
  ];

  /* Merge and sort alphabetically by display text (stripping the emoji prefix) */
  const ALL_SUGGESTIONS = [...SPECIES, ...LOCATIONS, ...ENVIRONMENTS].sort((a, b) =>
    a.label.replace(/^.+? /, '').localeCompare(b.label.replace(/^.+? /, ''))
  );

  /* ── Browse hints — meta-entries that expand into a category on selection –– */

  /* One entry per species group, count derived live from SPECIES array */
  /* Entries are [label, search, groupKey] — type:'hint' and note injected by .map() */
  function countGroup(g) { return SPECIES.filter(s => s.group === g).length; }
  const SPECIES_GROUP_HINTS = [
    ['🐦 Countryside & Open Land', 'countryside',  'countryside'],
    ['🐦 Finches & Buntings',      'finches',      'finches'],
    ['🐦 Flycatchers & Thrushes',  'flycatchers',  'flycatchers'],
    ['🐾 Fowl & Poultry',          'fowl',         'fowl'],
    ['🐦 Hirundines & Swifts',     'hirundines',   'hirundines'],
    ['🦉 Owls',                    'owls',         'owls'],
    ['🦅 Raptors & Corvids',       'raptors',      'raptors'],
    ['🐦 Seabirds & Gulls',        'seabirds',     'seabirds'],
    ['🐦 Small Passerines',        'garden birds', 'small-passerines'],
    ['🐦 Tits & Woodland',         'tits',         'tits'],
    ['🦆 Waterbirds & Ducks',      'waterbirds',   'waterbirds'],
    ['🐦 Warblers',                'warblers',     'warblers'],
  ].map(([label, search, g]) => ({ label, type: 'hint', search, note: countGroup(g) + ' species' }));

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
    /* 3. Check GROUP_ALIASES — exact first, then prefix-match for partial typing
          (e.g. 'rap' → raptors, 'fin' → finches, 'sea' → seabirds) */
    const targetGroup = GROUP_ALIASES[q] || null;
    /* Collect all groups whose alias keys start with the query string */
    const partialGroups = targetGroup ? null : (function () {
      const found = new Set();
      Object.keys(GROUP_ALIASES).forEach(function (alias) {
        if (alias.startsWith(q)) found.add(GROUP_ALIASES[alias]);
      });
      return found.size ? [...found] : null;
    })();
    const matches = ALL_SUGGESTIONS.filter(function (item) {
      if (item.group) {
        if (targetGroup  && item.group === targetGroup) return true;
        if (partialGroups && partialGroups.includes(item.group)) return true;
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
    /* Use a specific heading when one group is unambiguously resolved */
    const resolvedGroup = targetGroup || (partialGroups && partialGroups.length === 1 ? partialGroups[0] : null);
    const heading = resolvedGroup
      ? ('All ' + resolvedGroup)
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
