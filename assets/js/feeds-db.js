/* =============================================================================
   NestNinja Hub — Feed database
   ---------------------------------------------------------------------------
   Single source of truth for all camera feed data.

   When Hub launches, replace this static array with a Firebase/API fetch
   in hub-feeds.js and hub-feed-page.js (both call NestNinja.loadFeeds()).

   Schema
   ──────
   slug        {string}  URL-safe unique identifier for this feed.
                         Used to form the feed URL: /feeds/?slug={slug}
                         A slug is a short, lowercase, hyphenated string
                         that uniquely identifies a resource in a URL — e.g.
                         "norfolk-blue-tit" → nestninja.hub/feeds/?slug=norfolk-blue-tit
                         Slugs never change once published (they are permanent identifiers).

   title       {string}  Human-readable name for this camera/box.
   location    {string}  Display location string (town, county, region).
   species     {string[]} Species names observed in this box (must match SPECIES_META keys).
   status      {string}  'live' | 'recording' | 'offline'
   videoId     {string|null} YouTube video/live stream ID for the embed iframe.
                         null for offline-only feeds with no current stream.
   thumbnail   {string|null} Explicit thumbnail image URL.
                         Falls back to YouTube maxresdefault if videoId is set.
                         Can be any URL: local asset, camera snapshot, YouTube thumb.
   watchUrl    {string|null} Canonical YouTube URL for the full-screen watch link.
                         null if there is no recording to link to.
   lastActive  {string|null} Human-readable "last seen" string for offline cards.
                         null for live/recording feeds.
   about       {string}  Markdown description of the box, habitat, and history.
   camera      {string}  Markdown description of the NestNinja hardware setup.
   diary       {Object[]} Chronological list of logged events (newest first).
     diary[].date  {string} ISO 8601 datetime string.
     diary[].type  {string} 'enter' | 'exit' | 'egg' | 'hatch' | 'fledge' | 'note'
     diary[].icon  {string} Emoji to display alongside the entry.
     diary[].text  {string} Human-readable event description.
   ============================================================================= */

(function () {
  'use strict';

  window.NestNinja = window.NestNinja || {};

  NestNinja.FEEDS = [
    /* ── 1. Norfolk Blue Tit ──────────────────────────────────────────────── */
    {
      slug:      'demo_norfolk-blue-tit',
      title:     'Garden Blue Tit Box',
      location:  'Holt, Norfolk',
      species:   ['Blue Tit', 'Great Tit'],
      status:    'live',
      videoId:   'WuGlpr3xXU8',
      thumbnail: null,
      watchUrl:  'https://www.youtube.com/live/WuGlpr3xXU8',
      lastActive: null,

      about: [
        'This nest box has been in place in a private garden near Holt since 2023.',
        'It sits roughly 2 metres high on a north-facing fence, sheltered by a mature',
        'beech hedge — ideal conditions for Blue Tits, which prefer to avoid direct',
        'afternoon sun during incubation.',
        '',
        'The box has a 25 mm entrance hole, which keeps Starlings and House Sparrows out.',
        'Last season a pair successfully fledged eight chicks from this box.',
      ].join('\n'),

      camera: [
        '- **Device:** NestNinja prototype unit',
        '- **Sensor:** OV5647, 1080p, 160° fisheye',
        '- **Night vision:** IR LEDs, monochrome at night',
        '- **Motion sensor:** HC-SR501 PIR on GPIO46',
        '- **Storage:** 64 GB microSD (local recording)',
        '- **Power:** USB-C mains adapter',
        '- **Online since:** March 2024',
      ].join('\n'),

      diary: [
        { date: '2026-02-19T08:14:00', type: 'enter',  icon: '🐦', text: 'Female Blue Tit entered and spent 4 minutes inspecting the nest cup. Appears to be carrying dry grass.' },
        { date: '2026-02-19T08:18:00', type: 'exit',   icon: '🚪', text: 'Female exited. Male perched on entrance briefly before flying off.' },
        { date: '2026-02-18T16:42:00', type: 'enter',  icon: '🐦', text: 'First visit of the day by the female. Nest cup is taking shape — moss and grass visible.' },
        { date: '2026-02-17T11:05:00', type: 'note',   icon: '📝', text: 'Owner note: Clearly a pair — the male is singing from the beech hedge most mornings. Nest building looks to be starting.' },
        { date: '2026-02-14T09:30:00', type: 'enter',  icon: '🐦', text: 'First camera detection of the season. Single Blue Tit entered and examined the interior for approximately 90 seconds.' },
        { date: '2025-06-02T14:00:00', type: 'fledge', icon: '🎉', text: 'Season complete — 8 of 9 eggs fledged successfully. Nest cleared for next season.' },
        { date: '2025-04-28T07:15:00', type: 'hatch',  icon: '🐣', text: 'First chick confirmed hatched. Faint cheeping audible on audio channel.' },
        { date: '2025-04-10T08:20:00', type: 'egg',    icon: '🥚', text: '9th and final egg laid. Clutch now complete. Incubation expected to last ~14 days.' },
        { date: '2025-04-02T07:45:00', type: 'egg',    icon: '🥚', text: 'First egg of the season detected.' },
      ],
    },

    /* ── 2. Barn Owl Cam ──────────────────────────────────────────────────── */
    {
      slug:      'demo_barn-owl-cam',
      title:     'Barn Owl Nest Cam',
      location:  'Rural Lincolnshire',
      species:   ['Barn Owl'],
      status:    'live',
      videoId:   'K2keQ345dDM',
      thumbnail: null,
      watchUrl:  'https://www.youtube.com/live/K2keQ345dDM',
      lastActive: null,

      about: [
        'Purpose-built barn owl tower box installed on a working arable farm in',
        'Lincolnshire in partnership with the local Wildlife Trust. The box sits',
        'on a 5-metre aluminium pole at the field edge, overlooking rough grass',
        'strips managed specifically to support short-tailed field voles — the',
        'barn owl\'s primary prey.',
        '',
        'Barn owls have used this site since 2022. A second box nearby is',
        'monitored by a separate unconnected camera.',
      ].join('\n'),

      camera: [
        '- **Device:** NestNinja prototype unit',
        '- **Sensor:** OV5647, 1080p, 160° fisheye',
        '- **Night vision:** IR LEDs — critical for this species; most activity is nocturnal',
        '- **Motion sensor:** HC-SR501 PIR on GPIO46',
        '- **Storage:** 128 GB microSD (rolling 30-day recording)',
        '- **Power:** Solar panel + LiFePO₄ battery pack',
        '- **Online since:** January 2025',
      ].join('\n'),

      diary: [
        { date: '2026-02-19T02:47:00', type: 'enter',  icon: '🦉', text: 'Female returned to box carrying prey — likely a field vole. Spent 22 minutes inside.' },
        { date: '2026-02-19T02:25:00', type: 'exit',   icon: '🚪', text: 'Male departed on hunting flight.' },
        { date: '2026-02-18T23:10:00', type: 'enter',  icon: '🦉', text: 'Both birds present simultaneously — rare event. Courtship behaviour observed: male presenting prey to female.' },
        { date: '2026-02-17T03:15:00', type: 'note',   icon: '📝', text: 'Owner note: Screech calls audible outside the box at dusk. The pair seem to be strengthening their bond ahead of nesting — very exciting.' },
        { date: '2026-02-10T22:58:00', type: 'enter',  icon: '🦉', text: 'Female began spending extended periods in the box — over 3 hours overnight. Possible early nesting behaviour.' },
        { date: '2026-01-04T01:30:00', type: 'note',   icon: '📝', text: 'Owner note: Female ringed by local BTO ringer — ring number UK72485. Confirmed to have fledged from a box 4 km away in 2023.' },
        { date: '2025-07-14T19:00:00', type: 'fledge', icon: '🎉', text: 'Second brood complete — 3 owlets fledged. Exceptional season: 2 broods, 7 owlets total.' },
        { date: '2025-04-20T21:00:00', type: 'hatch',  icon: '🐣', text: 'First owlet of the season hatched. Clutch of 4 eggs laid in late March.' },
      ],
    },

    /* ── 3. Loughborough Blue Tit ─────────────────────────────────────────── */
    {
      slug:      'demo_loughborough-blue-tit',
      title:     'Garden Blue Tit Box',
      location:  'Loughborough, Leicestershire',
      species:   ['Blue Tit'],
      status:    'recording',
      videoId:   '7EPJEg6R3SM',
      thumbnail: null,
      watchUrl:  'https://youtu.be/7EPJEg6R3SM',
      lastActive: null,

      about: [
        'A suburban garden box in a quiet residential street in Loughborough.',
        'The box has been used by Blue Tits every year since 2021, making it',
        'one of the most reliably occupied boxes in our community.',
        '',
        'The garden backs onto a small patch of mature oak and ash woodland',
        'which provides ideal foraging habitat. The box faces east, getting',
        'gentle morning sun but protected from the prevailing south-westerly wind.',
      ].join('\n'),

      camera: [
        '- **Device:** NestNinja prototype unit',
        '- **Sensor:** OV5647, 1080p, 160° fisheye',
        '- **Night vision:** IR LEDs',
        '- **Motion sensor:** HC-SR501 PIR on GPIO46',
        '- **Storage:** 32 GB microSD',
        '- **Power:** USB-C mains adapter via exterior cable',
        '- **Online since:** February 2025',
      ].join('\n'),

      diary: [
        { date: '2026-02-19T09:02:00', type: 'enter',  icon: '🐦', text: 'Female entered carrying a strip of dry grass — third nest building visit today.' },
        { date: '2026-02-19T08:44:00', type: 'enter',  icon: '🐦', text: 'First visit of the day. Quick inspection, no material carried.' },
        { date: '2026-02-18T15:30:00', type: 'note',   icon: '📝', text: 'Owner note: The male has been singing continuously from the apple tree this afternoon. Spring really is arriving early this year.' },
        { date: '2026-02-16T13:10:00', type: 'enter',  icon: '🐦', text: 'Motion trigger — female spent 7 minutes inside rearranging previously deposited material.' },
        { date: '2026-02-12T10:00:00', type: 'note',   icon: '📝', text: 'Owner note: First visit of 2026! A single Blue Tit — almost certainly the female from last year given the territory familiarity.' },
        { date: '2025-05-28T08:00:00', type: 'fledge', icon: '🎉', text: 'All 7 chicks fledged over 2 days — fantastic result. Box cleared and cleaned ready for next season.' },
        { date: '2025-05-04T06:30:00', type: 'hatch',  icon: '🐣', text: 'Hatching underway — at least 3 chicks confirmed. Female brooding continuously.' },
        { date: '2025-04-18T07:22:00', type: 'egg',    icon: '🥚', text: '7th egg confirmed — clutch complete. Incubation begins in earnest.' },
        { date: '2025-04-12T07:55:00', type: 'egg',    icon: '🥚', text: 'First egg of 2025 season.' },
      ],
    },

    /* ── 4. Dartmoor Robin (offline) ──────────────────────────────────────── */
    {
      slug:      'demo_dartmoor-robin',
      title:     'Robin Open-Box',
      location:  'Dartmoor, Devon',
      species:   ['Robin', 'Dunnock'],
      status:    'offline',
      videoId:   null,
      thumbnail: 'https://img.youtube.com/vi/WuGlpr3xXU8/maxresdefault.jpg',
      watchUrl:  null,
      lastActive: '2 hrs ago',

      about: [
        'An open-fronted nest box fixed to a drystone wall at the edge of',
        'moorland on the southern fringe of Dartmoor National Park. Open-fronted',
        'boxes suit Robins and Dunnocks far better than enclosed boxes — they',
        'prefer to see out while sitting on eggs.',
        '',
        'The box is nestled under a granite overhang which provides shelter from',
        'the heavy rainfall Dartmoor is known for. Last season a Robin raised',
        'two successful broods here; a Dunnock used the box for a third brood',
        'in late summer.',
      ].join('\n'),

      camera: [
        '- **Device:** NestNinja prototype unit',
        '- **Sensor:** OV5647, 1080p, 160° fisheye',
        '- **Night vision:** IR LEDs (Robin is occasionally active pre-dawn)',
        '- **Motion sensor:** HC-SR501 PIR on GPIO46',
        '- **Storage:** 64 GB microSD',
        '- **Power:** Solar panel (intermittent — moorland cloud cover can reduce output)',
        '- **Online since:** April 2024',
        '- **Current status:** Offline — suspected low battery; should reconnect within 48 hours',
      ].join('\n'),

      diary: [
        { date: '2026-02-19T06:58:00', type: 'exit',   icon: '🚪', text: 'Last recorded event before feed went offline. Robin exited at first light.' },
        { date: '2026-02-18T17:44:00', type: 'enter',  icon: '🐦', text: 'Robin returned to roost for the night — confirmed by IR camera.' },
        { date: '2026-02-17T08:20:00', type: 'note',   icon: '📝', text: 'Owner note: Both the Robin and a Dunnock investigated the box this morning. The Robin appears dominant and chased the Dunnock off twice.' },
        { date: '2026-02-14T13:00:00', type: 'note',   icon: '📝', text: 'Owner note: Valentine\'s Day and the Robin is singing his heart out from the gorse nearby. The box is being inspected most days now.' },
        { date: '2026-02-08T09:15:00', type: 'enter',  icon: '🐦', text: 'First visit of 2026. Robin spent 3 minutes inside the box, appearing to re-familiarise with the space.' },
        { date: '2025-08-30T16:00:00', type: 'fledge', icon: '🎉', text: 'Third brood of season fledged — this time a Dunnock family of 4. Exceptional year for this box.' },
        { date: '2025-06-10T08:00:00', type: 'fledge', icon: '🎉', text: 'Robin\'s second brood fledged — 5 chicks. Female immediately began re-lining the nest.' },
        { date: '2025-04-22T06:30:00', type: 'hatch',  icon: '🐣', text: 'Robin chicks hatching — 4 confirmed. Female brooding closely.' },
        { date: '2025-04-08T07:10:00', type: 'egg',    icon: '🥚', text: 'First robin egg of 2025.' },
      ],
    },

    /* ── 5. Derbyshire Tawny Owl (offline) ───────────────────────────────── */
    {
      slug:      'demo_derbyshire-tawny-owl',
      title:     'Tawny Owl Box',
      location:  'Peak District, Derbyshire',
      species:   ['Tawny Owl'],
      status:    'offline',
      videoId:   null,
      thumbnail: 'https://img.youtube.com/vi/K2keQ345dDM/maxresdefault.jpg',
      watchUrl:  null,
      lastActive: 'yesterday',

      about: [
        'A large chimney-style box fixed high in a veteran oak at the edge of',
        'ancient woodland in the Peak District. Tawny Owls require a significantly',
        'larger box than small passerines — this one is 600 mm deep with a 150 mm',
        'entrance hole positioned near the top.',
        '',
        'The woodland is managed primarily for conservation and holds good populations',
        'of wood mice, bank voles, and common shrews — ideal Tawny Owl prey. This is',
        'the third year this pair have occupied the box.',
      ].join('\n'),

      camera: [
        '- **Device:** NestNinja prototype unit',
        '- **Sensor:** OV5647, 1080p, 160° fisheye',
        '- **Night vision:** IR LEDs (all meaningful activity is nocturnal)',
        '- **Motion sensor:** HC-SR501 PIR on GPIO46',
        '- **Storage:** 128 GB microSD',
        '- **Power:** USB-C mains adapter via long exterior cable run from nearby barn',
        '- **Online since:** September 2023',
        '- **Current status:** Offline — network dropout; engineer visit planned',
      ].join('\n'),

      diary: [
        { date: '2026-02-18T23:55:00', type: 'exit',   icon: '🚪', text: 'Last recorded event before network dropout. Female departed on what appeared to be a brief excursion.' },
        { date: '2026-02-18T22:10:00', type: 'enter',  icon: '🦉', text: 'Female settled in box for extended period. Remains motionless — likely entering full rest.' },
        { date: '2026-02-17T01:30:00', type: 'note',   icon: '📝', text: 'Owner note: Could hear the pair calling in the wood during a late walk — kewick and twit-twoo. Sounds like courtship is well underway.' },
        { date: '2026-02-15T03:22:00', type: 'enter',  icon: '🦉', text: 'Male visited briefly and deposited a prey item in the box. Courtship feeding — a very good sign.' },
        { date: '2026-02-07T22:48:00', type: 'enter',  icon: '🦉', text: 'Female returned to box — first prolonged visit of 2026. Duration: 4 hours 12 minutes.' },
        { date: '2025-06-18T22:00:00', type: 'fledge', icon: '🎉', text: 'Both owlets confirmed fledged. One seen perched on a low branch 40 m from the box — branching stage complete.' },
        { date: '2025-04-10T23:15:00', type: 'hatch',  icon: '🐣', text: 'Movement in box — hatching confirmed. At least one owlet visible beneath the female.' },
        { date: '2025-03-08T02:30:00', type: 'egg',    icon: '🥚', text: 'First egg of season detected. Female has been in the box for 11 days continuously.' },
      ],
    },

    /* ── 6. Yorkshire Blue Tit (offline) ─────────────────────────────────── */
    {
      slug:      'demo_yorkshire-blue-tit',
      title:     'Suburban Blue Tit Box',
      location:  'Harrogate, Yorkshire',
      species:   ['Blue Tit', 'Coal Tit'],
      status:    'offline',
      videoId:   null,
      thumbnail: 'https://img.youtube.com/vi/7EPJEg6R3SM/maxresdefault.jpg',
      watchUrl:  null,
      lastActive: '3 hrs ago',

      about: [
        'A nest box in a mature suburban garden on the outskirts of Harrogate.',
        'The garden contains several large conifers which attract Coal Tits as well',
        'as the perennial Blue Tit occupants. The box originally attracted a',
        'House Sparrow in its first year but the entrance hole was reduced to',
        '25 mm to favour tits going forward.',
        '',
        'The owner has kept a handwritten nest diary for this box since 2018 —',
        'historical records have been digitised and added to the diary below.',
      ].join('\n'),

      camera: [
        '- **Device:** NestNinja prototype unit',
        '- **Sensor:** OV5647, 1080p, 160° fisheye',
        '- **Night vision:** IR LEDs',
        '- **Motion sensor:** HC-SR501 PIR on GPIO46',
        '- **Storage:** 64 GB microSD',
        '- **Power:** USB-C mains adapter',
        '- **Online since:** March 2025',
        '- **Current status:** Offline — router firmware update caused DHCP issue; expected back online this evening',
      ].join('\n'),

      diary: [
        { date: '2026-02-19T06:30:00', type: 'exit',   icon: '🚪', text: 'Last event before connectivity dropped. Blue Tit exited at dawn.' },
        { date: '2026-02-18T14:22:00', type: 'enter',  icon: '🐦', text: 'Coal Tit briefly investigated the entrance but did not enter. Blue Tit pair arrived shortly after and appeared to assert ownership.' },
        { date: '2026-02-17T10:45:00', type: 'note',   icon: '📝', text: 'Owner note: Both species visiting the box — could be interesting competition this season. Blue Tits here every year so I\'d back them.' },
        { date: '2026-02-13T09:00:00', type: 'enter',  icon: '🐦', text: 'First visit of 2026. A female Blue Tit spent 5 minutes inside, appeared to be inspecting the old nest material.' },
        { date: '2025-06-05T08:30:00', type: 'fledge', icon: '🎉', text: 'Six chicks fledged over the morning — owner watched from the kitchen window. Wonderful end to the season.' },
        { date: '2025-05-08T07:00:00', type: 'hatch',  icon: '🐣', text: 'Chicks confirmed hatching. Female barely leaving the box.' },
        { date: '2025-04-20T07:30:00', type: 'egg',    icon: '🥚', text: '6th and final egg laid. Clutch complete.' },
        { date: '2025-04-14T07:55:00', type: 'egg',    icon: '🥚', text: 'First egg of the 2025 season.' },
      ],
    },
  ];

  /* Convenience lookup: find a feed by its slug. Returns undefined if not found. */
  NestNinja.findFeed = function (slug) {
    return NestNinja.FEEDS.find(function (f) { return f.slug === slug; });
  };

})();
