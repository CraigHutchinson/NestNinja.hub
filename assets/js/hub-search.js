/* =============================================================================
   NestNinja Hub — Search autocomplete
   Demo data only; live search will be powered by Firebase once Hub launches.
   ============================================================================= */

(function () {
  /* ── Demo autocomplete data ─────────────────────────────────────────── */

  /* Tits & small woodland birds */
  const SPECIES_TITS = [
    { label: '🐦 Blue Tit',           note: 'Most common nest box occupant' },
    { label: '🐦 Great Tit',          note: 'Prefers larger entrance holes' },
    { label: '🐦 Coal Tit',           note: 'Prefers conifer woodland' },
    { label: '🐦 Marsh Tit',          note: 'Declining; 25–28 mm entrance hole' },
    { label: '🐦 Long-tailed Tit',    note: 'Builds own domed nest; uses boxes to roost' },
    { label: '🐦 Nuthatch',           note: 'Plasters mud around the entrance to fit' },
    { label: '🐦 Treecreeper',        note: 'Needs wedge-shaped open-back box' },
    { label: '🐦 Willow Tit',         note: 'Critically declining; excavates own cavity in rotting wood' },
    { label: '🐦 Crested Tit',        note: 'Scotland only; Caledonian pine forests; uses nest boxes' },
  ];

  /* Sparrows & small garden passerines */
  const SPECIES_GARDEN = [
    { label: '🐦 House Sparrow',      note: 'Colonial nesters; use terrace-style boxes' },
    { label: '🐦 Tree Sparrow',       note: 'Red-listed; prefers colonial boxes in farmland' },
    { label: '🐦 Robin',              note: 'Open-fronted box specialist' },
    { label: '🐦 Wren',               note: 'Tiny but loud; loves dense cover' },
    { label: '🐦 Starling',           note: 'Noisy, gregarious, red-listed in UK' },
    { label: '🐦 Pied Wagtail',       note: 'Open-fronted box in farmyards/buildings' },
    { label: '🐦 Grey Wagtail',       note: 'Open-fronted box near fast-moving streams' },
    { label: '🐦 Dipper',             note: 'Open-fronted box over upland streams' },
    { label: '🐦 Dunnock',            note: 'Hedge Sparrow; very common garden & hedgerow bird' },
    { label: '🐦 Song Thrush',        note: 'Red-listed; uses anvil stone to smash snails' },
    { label: '🐦 Mistle Thrush',      note: 'Largest UK thrush; sings boldly in bad weather' },
    { label: '🐦 Goldcrest',          note: 'Smallest UK bird; conifer woodland & gardens' },
    { label: '🐦 Waxwing',            note: 'Irruption winter visitor; berries in carparks & hedges' },
    { label: '🐦 Nightingale',        note: 'Declining summer visitor; remarkable nocturnal song' },
    { label: '🐦 Ring-necked Parakeet', note: 'Naturalised; common SE England gardens; uses nest boxes' },
  ];

  /* Finches & buntings */
  const SPECIES_FINCHES = [
    { label: '🐦 Chaffinch',           note: 'Most common UK finch; open woodland & gardens' },
    { label: '🐦 Brambling',           note: 'Winter visitor; beech mast specialist' },
    { label: '🐦 Goldfinch',           note: 'Loves teasel & nyjer seed; garden feeder regular' },
    { label: '🐦 Siskin',              note: 'Conifer & alder specialist; garden feeder in winter' },
    { label: '🐦 Linnet',              note: 'Farmland & heath; declining in UK' },
    { label: '🐦 Twite',               note: 'Upland moorland specialist; red-listed' },
    { label: '🐦 Lesser Redpoll',      note: 'Birch & alder woodland; declining' },
    { label: '🐦 Common Crossbill',    note: 'Conifer specialist; nomadic; Scottish pinewoods' },
    { label: '🐦 Parrot Crossbill',    note: 'Rare; Scots pine specialist in Scotland' },
    { label: '🐦 Scottish Crossbill',  note: 'Endemic UK species; Caledonian pinewoods only' },
    { label: '🐦 Bullfinch',           note: 'Orchard & woodland edges; eats flower buds' },
    { label: '🐦 Hawfinch',            note: 'Large secretive finch; hornbeam & cherry woods' },
    { label: '🐦 Greenfinch',          note: 'Garden regular; declining due to trichomonosis' },
    { label: '🐦 Yellowhammer',        note: 'Farmland bunting; red-listed; hedgerow nester' },
    { label: '🐦 Reed Bunting',        note: 'Wetland & farmland; open-cup nest in vegetation' },
    { label: '🐦 Corn Bunting',        note: 'Arable farmland; red-listed in UK' },
    { label: '🐦 Snow Bunting',        note: 'Winter visitor to coasts & uplands; rare breeder' },
  ];

  /* Flycatchers, chats & thrushes */
  const SPECIES_FLYCATCHERS = [
    { label: '🐦 Pied Flycatcher',    note: 'Summer visitor from Africa; Welsh oak woods' },
    { label: '🐦 Spotted Flycatcher', note: 'Open-fronted box on wall or trellis' },
    { label: '🐦 Common Redstart',    note: 'Striking red tail; Welsh & northern woodlands' },
    { label: '🐦 Black Redstart',     note: 'Urban specialist; industrial brownfield sites' },
    { label: '🐦 Blackbird',          note: 'Open-fronted box in dense shrubs' },
    { label: '🐦 Fieldfare',          note: 'Winter visitor from Scandinavia; hawthorn berry specialist' },
    { label: '🐦 Redwing',            note: 'Winter visitor; smallest UK thrush; ivy berry favoured' },
    { label: '🐦 Ring Ouzel',         note: 'Mountain Blackbird; upland summer visitor; declining' },
    { label: '🐦 Stonechat',          note: 'Year-round on heathland & coastal scrub' },
    { label: '🐦 Whinchat',           note: 'Summer visitor to upland & rough grassland; declining' },
    { label: '🐦 Wheatear',           note: 'First spring migrant; upland & coastal; nests in cavities' },
  ];

  /* Swifts, swallows & martins */
  const SPECIES_HIRUNDINES = [
    { label: '🐦 Common Swift',       note: 'Specialist swift box under eaves; declining fast' },
    { label: '🐦 Barn Swallow',       note: 'Open barns & sheds; declining in UK' },
    { label: '🐦 House Martin',       note: 'Artificial cup nests under eaves' },
    { label: '🐦 Sand Martin',        note: 'Colonial burrow boxes in earth banks' },
  ];

  /* Warblers */
  const SPECIES_WARBLERS = [
    { label: '🐦 Blackcap',            note: 'Very common; increasingly overwinters; easy to see' },
    { label: '🐦 Garden Warbler',      note: 'Plain but lovely song; common woodland & scrub' },
    { label: '🐦 Whitethroat',         note: 'Most common UK Sylvia; hedgerows & farmland scrub' },
    { label: '🐦 Lesser Whitethroat',  note: 'Common but skulking; rattle song; overgrown hedges' },
    { label: '🐦 Chiffchaff',          note: 'First spring migrant; "chiff-chaff" song; widespread' },
    { label: '🐦 Willow Warbler',      note: 'Most abundant summer visitor; declining in south' },
    { label: '🐦 Wood Warbler',        note: 'Declining sessile oak woodland specialist; shivering song' },
    { label: '🐦 Sedge Warbler',       note: 'Wetland scrub; loud varied song; mimics other birds' },
    { label: '🐦 Reed Warbler',        note: 'Reed-bed specialist; main Cuckoo host in England' },
    { label: '🐦 Grasshopper Warbler', note: 'Reeling insect-like song; wet grassland & scrub' },
    { label: "🐦 Cetti's Warbler",     note: 'Loud explosive song; resident; expanding northward' },
    { label: '🐦 Dartford Warbler',    note: 'Heathland specialist; southern England; year-round' },
  ];

  /* Countryside — open land, waders, pigeons & cuckoo */
  const SPECIES_COUNTRYSIDE = [
    { label: '🐦 Woodpigeon',          note: 'Most abundant UK breeding bird; gardens & farmland' },
    { label: '🕊️ Collared Dove',      note: 'Ubiquitous garden dove; colonised UK from 1950s' },
    { label: '🕊️ Turtle Dove',        note: 'Red-listed; summer visitor; dramatically declining' },
    { label: '🐦 Cuckoo',              note: 'Declining migrant; brood parasite; iconic call' },
    { label: '🐦 Skylark',             note: 'Red-listed; song-flight icon; arable farmland' },
    { label: '🐦 Lapwing',             note: 'Red-listed; peewit call; declining farmland wader' },
    { label: '🐦 Curlew',              note: 'Red-listed; at-risk upland & coastal wader' },
    { label: '🐦 Woodcock',            note: 'Woodland wader; roding display at dusk' },
    { label: '🐦 Snipe',               note: 'Wetland wader; drumming aerial display' },
    { label: '🐦 Nightjar',            note: 'Heathland; churring nocturnal migrant; declining' },
    { label: '🐦 Red Grouse',          note: 'Iconic Scottish moor bird; endemic UK subspecies' },
    { label: '🐦 Capercaillie',        note: 'Critically endangered; Scottish Caledonian pine' },
  ];

  /* Owls */
  const SPECIES_OWLS = [
    { label: '🦉 Barn Owl',           note: 'Tall open box on pole or inside barn' },
    { label: '🦉 Tawny Owl',          note: 'Woodland owl; large chimney-style box' },
    { label: '🦉 Little Owl',         note: 'Farmland edges; stone wall & pole boxes' },
    { label: '🦉 Long-eared Owl',     note: 'Conifer plantation; uses open basket platforms' },
    { label: '🦉 Short-eared Owl',    note: 'Day-flying; open moorland, marsh & coastal grassland' },
  ];

  /* Raptors, corvids & woodpeckers */
  const SPECIES_RAPTORS = [
    { label: '🦅 Common Kestrel',          note: 'Open farmland; tall pole or tower boxes' },
    { label: '🦅 Peregrine Falcon',        note: 'Cliff ledge trays; now also urban buildings' },
    { label: '🦅 Sparrowhawk',             note: 'Most common UK garden raptor; dashes through hedges' },
    { label: '🦅 Buzzard',                 note: 'Now most common UK raptor; broad wings; mewing call' },
    { label: '🦅 Red Kite',                note: 'Conservation success; forked tail; widespread in Wales & England' },
    { label: '🦅 Osprey',                  note: 'Artificial nest platforms; Scottish lochs & rivers' },
    { label: '🦅 Merlin',                  note: 'Smallest UK falcon; dashing flight over upland' },
    { label: '🦅 Hobby',                   note: 'Summer visitor; uses old crow nests; hunts hirundines' },
    { label: '🦅 Marsh Harrier',           note: 'Reed-bed hunter; recovering; glides on tilted wings' },
    { label: '🦅 Hen Harrier',             note: 'Upland harrier; ghost-grey male; conservation controversy' },
    { label: '🦅 Goshawk',                 note: 'Large secretive woodland raptor; rare breeder' },
    { label: '🐦 Carrion Crow',            note: 'Highly intelligent; uses ledges & large trees' },
    { label: '🐦 Hooded Crow',             note: 'Grey & black; replaces Carrion Crow in Scotland & Ireland' },
    { label: '🐦 Rook',                    note: 'Colonial treetop nester; rookeries in tall elms & beeches' },
    { label: '🐦 Jackdaw',                 note: 'Will take over large chimney & cavity boxes' },
    { label: '🐦 Raven',                   note: 'Largest corvid; cliff ledge & crag nester' },
    { label: '🐦 Magpie',                  note: 'Dome-shaped stick nest in dense shrubs & trees' },
    { label: '🐦 Jay',                     note: 'Secretive woodland corvid; acorn specialist' },
    { label: '🐦 Chough',                  note: 'Red bill & legs; cliff caves & old mine entrances' },
    { label: '🐦 Stock Dove',              note: 'Farmland; uses barn-owl style boxes' },
    { label: '🐦 Great Spotted Woodpecker',note: 'Excavates own holes; may enlarge box entrance' },
    { label: '🐦 Lesser Spotted Woodpecker',note: 'Tiny; declining woodland specialist' },
    { label: '🐦 Green Woodpecker',        note: 'Ant specialist; rarely uses boxes' },
  ];

  /* Waterbirds & ducks */
  const SPECIES_WATER = [
    { label: '🦆 Mandarin Duck',      note: 'Large oval box near woodland water' },
    { label: '🦆 Goldeneye',          note: 'Scottish lochs; large hole boxes on trees' },
    { label: '🦆 Goosander',          note: 'Large box near rivers & lochs in Scotland' },
    { label: '🦆 Common Merganser',   note: 'Same box spec as Goosander; river specialist' },
    { label: '🦆 Tufted Duck',        note: 'Ground nester near water; uses cover boxes' },
    { label: '🦆 Wood Duck',          note: 'Escaped breeder; takes Mandarin-style boxes' },
    { label: '🦢 Mute Swan',          note: 'Unmistakable; common on rivers, lakes & parks' },
    { label: '🦆 Mallard',            note: 'Most common UK duck; often nests in gardens near water' },
    { label: '🦆 Teal',               note: 'Smallest UK dabbling duck; wetland & river margins' },
    { label: '🐦 Moorhen',            note: 'Very common; red forehead shield; streamsides & ponds' },
    { label: '🐦 Coot',               note: 'White bill & forehead; open water nester' },
    { label: '🐦 Grey Heron',         note: 'Very common; patient fisher; colonial treetop nester' },
    { label: '🐦 Little Egret',       note: 'Now common; colonial nester; white with yellow feet' },
    { label: '🐦 Kingfisher',         note: 'Tunnel box in river bank; requires specialist setup' },
  ];

  /* Domestic & farmyard fowl — chicken coops, runs & enclosures */
  const SPECIES_FOWL = [
    { label: '🐔 Chicken',              note: 'Most common coop bird; hundreds of breeds' },
    { label: '🐔 Bantam',              note: 'Miniature chicken; great for small gardens' },
    { label: '🦃 Turkey',              note: 'Large poultry; needs spacious covered run' },
    { label: '🦆 Domestic Duck',       note: 'Needs access to water; messy but friendly' },
    { label: '🦆 Khaki Campbell',      note: 'Prolific egg-laying duck breed' },
    { label: '🦆 Indian Runner Duck',  note: 'Upright posture; excellent forager' },
    { label: '🦆 Muscovy Duck',        note: 'Perches & roosts; prefers raised box' },
    { label: '🪿 Domestic Goose',      note: 'Loud guard animal; grazes pasture' },
    { label: '🪿 Embden Goose',        note: 'Large white breed; common UK farm goose' },
    { label: '🪿 Toulouse Goose',      note: 'Heavy breed; calm temperament' },
    { label: '🐦 Guinea Fowl',         note: 'Excellent pest control; very loud alarm calls' },
    { label: '🐦 Helmeted Guinea Fowl',note: 'Most common guinea breed kept in UK' },
    { label: '🐦 Peafowl',             note: 'Peacock & peahen; free-range with high roost' },
    { label: '🐦 Quail',               note: 'Japanese quail common for eggs; small pen' },
    { label: '🐦 Pheasant',            note: 'Game bird; large aviary or woodland pen' },
    { label: '🐦 Red-legged Partridge',note: 'Game bird; ground-nesting, aviary kept' },
    { label: '🐦 Grey Partridge',      note: 'Native game bird; declining in the wild' },
    { label: '🕊️ Domestic Pigeon',     note: 'Racing, fancy & utility breeds; loft kept' },
    { label: '🕊️ Racing Homer',        note: 'Homing pigeon bred for endurance races' },
    { label: '🕊️ Dove',               note: 'Ringneck & diamond doves; dovecote or aviary' },
  ];

  /* Gulls, terns & seabirds */
  const SPECIES_SEABIRDS = [
    { label: '🐦 Herring Gull',           note: 'Nests on rooftops & sea cliffs; urban & coastal' },
    { label: '🐦 Lesser Black-backed Gull',note: 'Rooftop nester in many UK cities' },
    { label: '🐦 Greater Black-backed Gull',note: 'Large coastal cliff & island nester' },
    { label: '🐦 Black-headed Gull',      note: 'Colonial ground nester on marshes & islands' },
    { label: '🐦 Common Gull',            note: 'Ground nester on moorland, coasts & rooftops' },
    { label: '🐦 Kittiwake',              note: 'Cliff ledge specialist; artificial ledge boxes' },
    { label: '🐦 Common Tern',            note: 'Floating tern raft platforms on lakes & coasts' },
    { label: '🐦 Arctic Tern',            note: 'Ground nester on northern islands & coasts' },
    { label: '🐦 Little Tern',            note: 'Shingle beach nester; red-listed in UK' },
    { label: '🐦 Sandwich Tern',          note: 'Colonial coastal sand & shingle nester' },
    { label: '🐦 Puffin',                 note: 'Excavates burrows; artificial burrow tubes used' },
    { label: '🐦 Razorbill',              note: 'Rocky cliff ledges & crevices' },
    { label: '🐦 Common Guillemot',       note: 'Bare cliff ledge colonies; no nest structure' },
    { label: '🐦 Gannet',                 note: 'Cliff-top colonies; Bass Rock & Grassholm' },
    { label: '🐦 Fulmar',                 note: 'Cliff ledge nester; expanding inland' },
  ];

  /* Merge all species groups — type & group injected here; omitted from source arrays */
  const SPECIES = [
    ...SPECIES_TITS.map(s          => ({ ...s, type: 'species', group: 'tits' })),
    ...SPECIES_GARDEN.map(s        => ({ ...s, type: 'species', group: 'small-passerines' })),
    ...SPECIES_FINCHES.map(s       => ({ ...s, type: 'species', group: 'finches' })),
    ...SPECIES_FLYCATCHERS.map(s   => ({ ...s, type: 'species', group: 'flycatchers' })),
    ...SPECIES_HIRUNDINES.map(s    => ({ ...s, type: 'species', group: 'hirundines' })),
    ...SPECIES_WARBLERS.map(s      => ({ ...s, type: 'species', group: 'warblers' })),
    ...SPECIES_COUNTRYSIDE.map(s   => ({ ...s, type: 'species', group: 'countryside' })),
    ...SPECIES_OWLS.map(s          => ({ ...s, type: 'species', group: 'owls' })),
    ...SPECIES_RAPTORS.map(s       => ({ ...s, type: 'species', group: 'raptors' })),
    ...SPECIES_WATER.map(s         => ({ ...s, type: 'species', group: 'waterbirds' })),
    ...SPECIES_SEABIRDS.map(s      => ({ ...s, type: 'species', group: 'seabirds' })),
    ...SPECIES_FOWL.map(s          => ({ ...s, type: 'species', group: 'fowl' })),
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
  function countGroup(g) { return SPECIES.filter(s => s.group === g).length; }
  const SPECIES_GROUP_HINTS = [
    { label: '🐦 Countryside & Open Land', type: 'hint', search: 'countryside',   note: countGroup('countryside')      + ' species' },
    { label: '🐦 Finches & Buntings',      type: 'hint', search: 'finches',       note: countGroup('finches')          + ' species' },
    { label: '🐦 Flycatchers & Thrushes',  type: 'hint', search: 'flycatchers',   note: countGroup('flycatchers')      + ' species' },
    { label: '🐾 Fowl & Poultry',           type: 'hint', search: 'fowl',          note: countGroup('fowl')             + ' species' },
    { label: '🐦 Hirundines & Swifts',     type: 'hint', search: 'hirundines',    note: countGroup('hirundines')       + ' species' },
    { label: '🦉 Owls',                     type: 'hint', search: 'owls',          note: countGroup('owls')             + ' species' },
    { label: '🦅 Raptors & Corvids',        type: 'hint', search: 'raptors',       note: countGroup('raptors')          + ' species' },
    { label: '🐦 Seabirds & Gulls',         type: 'hint', search: 'seabirds',      note: countGroup('seabirds')         + ' species' },
    { label: '🐦 Small Passerines',         type: 'hint', search: 'garden birds',  note: countGroup('small-passerines') + ' species' },
    { label: '🐦 Tits & Woodland',          type: 'hint', search: 'tits',          note: countGroup('tits')             + ' species' },
    { label: '🦆 Waterbirds & Ducks',       type: 'hint', search: 'waterbirds',    note: countGroup('waterbirds')       + ' species' },
    { label: '🐦 Warblers',                 type: 'hint', search: 'warblers',      note: countGroup('warblers')         + ' species' },
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
