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

  /* Sparrows, finches & small garden birds */
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
    { label: '🌿 Garden',              type: 'environment', note: 'Domestic gardens, feeders & nest boxes' },
    { label: '🌲 Woodland',            type: 'environment', note: 'Deciduous & mixed woodland' },
    { label: '🌲 Conifer Forest',      type: 'environment', note: 'Pine & spruce plantation' },
    { label: '🌾 Farmland',            type: 'environment', note: 'Arable & pasture fields, farm buildings' },
    { label: '💧 Wetland & Marsh',     type: 'environment', note: 'Fens, bogs, reedbeds & carr woodland' },
    { label: '🌊 River & Stream',      type: 'environment', note: 'Fast & slow-moving freshwater' },
    { label: '🌊 Lake & Loch',         type: 'environment', note: 'Still water; reservoirs, lochs & meres' },
    { label: '🌊 Estuary & Mudflat',   type: 'environment', note: 'Tidal mudflats & saltmarsh' },
    { label: '🌊 Coastal & Cliff',     type: 'environment', note: 'Sea cliffs, caves & rocky shores' },
    { label: '🏙️ Urban & Rooftop',    type: 'environment', note: 'Rooftops, ledges & urban green space' },
    { label: '🌿 Heathland',           type: 'environment', note: 'Lowland heath; gorse & heather' },
    { label: '🏔️ Upland & Moorland',  type: 'environment', note: 'Blanket bog, high moorland & mountain' },
    { label: '🌿 Grassland & Meadow',  type: 'environment', note: 'Hay meadows, chalk downland & rough grass' },
    { label: '🌿 Hedgerow & Scrub',    type: 'environment', note: 'Field boundaries, bramble & thick scrub' },
    { label: '🌿 Nature Reserve',      type: 'environment', note: 'RSPB, Wildlife Trust & NNR managed sites' },
  ];

  const LOCATIONS = [
    { label: '📍 Yorkshire',       type: 'location' },
    { label: '📍 Scotland',        type: 'location' },
    { label: '📍 Wales',           type: 'location' },
    { label: '📍 London',          type: 'location' },
    { label: '📍 Cornwall',        type: 'location' },
    { label: '📍 Lake District',   type: 'location' },
    { label: '📍 Norfolk',         type: 'location' },
    { label: '📍 Snowdonia',       type: 'location' },
    { label: '📍 Peak District',   type: 'location' },
    { label: '📍 New Forest',      type: 'location' },
    { label: '📍 Bristol',         type: 'location' },
    { label: '📍 Edinburgh',       type: 'location' },
    { label: '📍 Manchester',      type: 'location' },
    { label: '📍 Sheffield',       type: 'location' },
    { label: '📍 Exeter',          type: 'location' },
    { label: '📍 Aberdeenshire',   type: 'location' },
    { label: '📍 Pembrokeshire',   type: 'location' },
    { label: '📍 Northumberland',  type: 'location' },
  ];

  /* Merge and sort alphabetically by display text (stripping the emoji prefix) */
  const ALL_SUGGESTIONS = [...SPECIES, ...LOCATIONS, ...ENVIRONMENTS].sort((a, b) =>
    a.label.replace(/^.+? /, '').localeCompare(b.label.replace(/^.+? /, ''))
  );

  /* Popular picks shown before the user types */
  const DEFAULTS = [
    SPECIES.find(s => s.label.includes('Blue Tit')),
    SPECIES.find(s => s.label.includes('Robin')),
    SPECIES.find(s => s.label.includes('Barn Owl')),
    SPECIES.find(s => s.label.includes('Common Swift')),
    SPECIES.find(s => s.label.includes('Kingfisher')),
    SPECIES.find(s => s.label.includes('Mandarin Duck')),
    LOCATIONS.find(l => l.label.includes('Yorkshire')),
    LOCATIONS.find(l => l.label.includes('Scotland')),
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
    /* Show more results for full-category views, cap at 8 for filtered searches */
    const limit = heading && heading.startsWith('All ') ? 20 : 8;
    matches.slice(0, limit).forEach(function (item, i) {
      const li = document.createElement('li');
      li.setAttribute('role', 'option');
      li.setAttribute('data-index', i);
      const typeClass = item.type === 'species'     ? ' is-species'
                        : item.type === 'environment' ? ' is-environment'
                        : ' is-location';
      li.className = 'hub-suggestion-item' + typeClass;
      li.innerHTML = '<span class="sug-label">' + item.label + '</span>' +
        (item.note ? '<span class="sug-note">' + item.note + '</span>' : '');
      li.addEventListener('mousedown', function (e) {
        e.preventDefault();
        input.value = item.label.replace(/^.+? /, '');
        hide();
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
    const targetGroup = GROUP_ALIASES[q] || null;
    const matches = ALL_SUGGESTIONS.filter(function (item) {
      if (item.group) {
        if (targetGroup && item.group === targetGroup) return true;
        if (item.group.toLowerCase().includes(q)) return true;
      }
      return item.label.toLowerCase().includes(q);
    });
    render(matches, targetGroup ? ('All ' + targetGroup) : null);
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
