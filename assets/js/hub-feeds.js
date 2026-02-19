/* =============================================================================
   NestNinja Hub — Feed data + client-side renderer
   ---------------------------------------------------------------------------
   DEMO_FEEDS is a static array standing in for a future Firebase/API fetch.
   When Hub goes live, replace loadFeeds() with a real data fetch and call
   renderFeeds() with the returned array.
   ============================================================================= */

(function () {

  /* ── Species metadata registry ──────────────────────────────────────────── */
  /* Maps species name → { emoji, cls } where cls is the hub-species-tag modifier */
  var SPECIES_META = {
    'Blue Tit':       { emoji: '🐦', cls: '' },
    'Great Tit':      { emoji: '🐦', cls: '' },
    'Coal Tit':       { emoji: '🐦', cls: '' },
    'Marsh Tit':      { emoji: '🐦', cls: '' },
    'Long-tailed Tit':{ emoji: '🐦', cls: '' },
    'Robin':          { emoji: '🐦', cls: '' },
    'Dunnock':        { emoji: '🐦', cls: '' },
    'Wren':           { emoji: '🐦', cls: '' },
    'House Sparrow':  { emoji: '🐦', cls: '' },
    'Tree Sparrow':   { emoji: '🐦', cls: '' },
    'Pied Flycatcher':{ emoji: '🐦', cls: '' },
    'Barn Owl':       { emoji: '🦉', cls: 'hub-species-tag--owl' },
    'Tawny Owl':      { emoji: '🦉', cls: 'hub-species-tag--owl' },
    'Little Owl':     { emoji: '🦉', cls: 'hub-species-tag--owl' },
    'Common Swift':   { emoji: '🐦', cls: 'hub-species-tag--swift' },
    'Barn Swallow':   { emoji: '🐦', cls: 'hub-species-tag--swift' },
    'House Martin':   { emoji: '🐦', cls: 'hub-species-tag--swift' },
    'Mandarin Duck':  { emoji: '🦆', cls: 'hub-species-tag--waterbird' },
    'Goldeneye':      { emoji: '🦆', cls: 'hub-species-tag--waterbird' },
    'Kingfisher':     { emoji: '🐦', cls: 'hub-species-tag--swift' },
  };

  function speciesMeta(name) {
    return SPECIES_META[name] || { emoji: '🐦', cls: '' };
  }

  /* ── Demo feed data ─────────────────────────────────────────────────────── */
  /*
   * status:     'live' | 'recording' | 'offline'
   * videoId:    YouTube video/live ID used for the iframe embed (null for offline-only feeds)
   * thumbnail:  explicit thumbnail URL for offline/placeholder cards
   *             — if omitted, falls back to the YouTube maxresdefault for videoId
   *             — can be any image URL: local asset, YouTube thumb, camera snapshot, etc.
   * watchUrl:   canonical YouTube URL for the full-screen link (null if no recording)
   * lastActive: human-readable string shown on offline cards (null for live/recording)
   */
  var DEMO_FEEDS = [
    {
      videoId:    'WuGlpr3xXU8',
      title:      'Garden Blue Tit Box',
      location:   'Norfolk',
      species:    ['Blue Tit', 'Great Tit'],
      status:     'live',
      watchUrl:   'https://www.youtube.com/live/WuGlpr3xXU8',
      lastActive: null,
    },
    {
      videoId:    'K2keQ345dDM',
      title:      'Barn Owl Nest Cam',
      location:   'United Kingdom',
      species:    ['Barn Owl'],
      status:     'live',
      watchUrl:   'https://www.youtube.com/live/K2keQ345dDM',
      lastActive: null,
    },
    {
      videoId:    '7EPJEg6R3SM',
      title:      'Garden Blue Tit Box',
      location:   'Loughborough, Leicestershire',
      species:    ['Blue Tit'],
      status:     'recording',
      watchUrl:   'https://youtu.be/7EPJEg6R3SM',
      lastActive: null,
    },
    {
      videoId:    null,
      thumbnail:  'https://img.youtube.com/vi/WuGlpr3xXU8/maxresdefault.jpg',
      title:      'Robin Open-Box',
      location:   'Dartmoor, Devon',
      species:    ['Robin', 'Dunnock'],
      status:     'offline',
      watchUrl:   null,
      lastActive: '2 hrs ago',
    },
    {
      videoId:    null,
      thumbnail:  'https://img.youtube.com/vi/K2keQ345dDM/maxresdefault.jpg',
      title:      'Tawny Owl Box',
      location:   'Derbyshire',
      species:    ['Tawny Owl'],
      status:     'offline',
      watchUrl:   null,
      lastActive: 'yesterday',
    },
    {
      videoId:    null,
      thumbnail:  'https://img.youtube.com/vi/7EPJEg6R3SM/maxresdefault.jpg',
      title:      'Suburban Blue Tit Box',
      location:   'Yorkshire',
      species:    ['Blue Tit', 'Coal Tit'],
      status:     'offline',
      watchUrl:   null,
      lastActive: '3 hrs ago',
    },
  ];

  /* ── Status config ──────────────────────────────────────────────────────── */
  var STATUS_CONFIG = {
    live:      { cls: 'hub-feed-status--live',      label: '🔴 Live' },
    recording: { cls: 'hub-feed-status--recording', label: '🟢 Recording' },
    offline:   { cls: 'hub-feed-status--offline',   label: '⚫ Offline' },
  };

  /* ── HTML helpers ───────────────────────────────────────────────────────── */
  function esc(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* Resolves the thumbnail URL for a feed.
     Explicit feed.thumbnail takes priority; falls back to YouTube's maxresdefault
     for feeds that have a videoId but no explicit thumbnail set. */
  function thumbUrl(feed) {
    if (feed.thumbnail) return feed.thumbnail;
    if (feed.videoId)   return 'https://img.youtube.com/vi/' + feed.videoId + '/maxresdefault.jpg';
    return '/assets/images/placeholder-nest.jpg'; /* final fallback */
  }

  function renderMedia(feed) {
    var thumb = esc(thumbUrl(feed));
    if (feed.status === 'offline') {
      return '<div class="hub-feed-thumb" style="background-image:url(\'' + thumb + '\')" aria-hidden="true"></div>';
    }
    /* Non-offline: thumbnail with play overlay; iframe injected on hover/scroll */
    return [
      '<div class="hub-feed-thumb hub-feed-thumb--playable"',
      '     style="background-image:url(\'' + thumb + '\')"',
      '     data-video-id="' + esc(feed.videoId) + '"',
      '     data-video-title="' + esc(feed.title) + '">',
      '  <button class="hub-play-btn" aria-label="Play ' + esc(feed.title) + '">',
      '    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>',
      '  </button>',
      '</div>',
    ].join('\n');
  }

  function renderSpeciesTags(species) {
    return species.map(function (name) {
      var m = speciesMeta(name);
      return '<span class="hub-species-tag ' + m.cls + '">' + m.emoji + ' ' + esc(name) + '</span>';
    }).join('');
  }

  function renderFooter(feed) {
    var ownerHtml = '<span class="hub-feed-owner">'
      + (feed.lastActive ? 'Last active ' + esc(feed.lastActive) : '▶ Example YouTube video')
      + '</span>';
    var watchHtml = feed.watchUrl
      ? '<a href="' + esc(feed.watchUrl) + '" target="_blank" rel="noopener" class="hub-feed-watch">Full screen ↗</a>'
      : '<span class="hub-feed-watch hub-feed-watch--none">No recording</span>';
    return ownerHtml + watchHtml;
  }

  function renderCard(feed) {
    var sc = STATUS_CONFIG[feed.status] || STATUS_CONFIG.offline;
    var offlineCls = feed.status === 'offline' ? ' hub-feed-card--offline' : '';
    /* data-* attributes drive client-side filtering */
    return [
      '<article class="hub-feed-card' + offlineCls + '"',
      '         data-status="' + esc(feed.status) + '"',
      '         data-species="' + esc(feed.species.join(',').toLowerCase()) + '"',
      '         data-location="' + esc(feed.location.toLowerCase()) + '">',
      '  <div class="hub-feed-video">',
      '    ' + renderMedia(feed),
      '    <span class="hub-feed-status ' + sc.cls + '">' + sc.label + '</span>',
      '  </div>',
      '  <div class="hub-feed-info">',
      '    <h3 class="hub-feed-title">' + esc(feed.title) + '</h3>',
      '    <p class="hub-feed-location">📍 ' + esc(feed.location) + '</p>',
      '    <div class="hub-feed-species">' + renderSpeciesTags(feed.species) + '</div>',
      '    <div class="hub-feed-footer">' + renderFooter(feed) + '</div>',
      '  </div>',
      '</article>',
    ].join('\n');
  }

  /* ── Video play / deactivate ────────────────────────────────────────────── */

  var currentMobileThumb = null; /* tracks the active mobile card */

  /* Swaps the thumbnail div for an autoplaying muted iframe */
  function activateVideo(thumbEl) {
    if (!thumbEl || thumbEl.dataset.active === '1') return;
    thumbEl.dataset.active = '1';
    var id    = thumbEl.dataset.videoId;
    var title = thumbEl.dataset.videoTitle || '';
    var src   = 'https://www.youtube-nocookie.com/embed/' + id
              + '?autoplay=1&mute=1&rel=0&modestbranding=1';
    var iframe = document.createElement('iframe');
    iframe.src               = src;
    iframe.title             = title;
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    iframe.setAttribute('allowfullscreen', '');
    /* Keep thumbnail visible underneath while iframe loads */
    iframe.style.position = 'absolute';
    iframe.style.top      = '0';
    iframe.style.left     = '0';
    iframe.style.width    = '100%';
    iframe.style.height   = '100%';
    iframe.style.border   = '0';
    thumbEl.appendChild(iframe);
    thumbEl.classList.add('is-playing');
  }

  /* Removes the iframe and restores the thumbnail */
  function deactivateVideo(thumbEl) {
    if (!thumbEl || thumbEl.dataset.active !== '1') return;
    thumbEl.dataset.active = '0';
    var iframe = thumbEl.querySelector('iframe');
    if (iframe) iframe.remove();
    thumbEl.classList.remove('is-playing');
  }

  /* ── Behaviour wiring (called after each render) ─────────────────────────── */

  var mobileObserver = null;

  function isTouchDevice() {
    return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  }

  function attachPlayBehaviour(container) {
    /* Tear down any previous mobile observer */
    if (mobileObserver) { mobileObserver.disconnect(); mobileObserver = null; }
    if (currentMobileThumb) { deactivateVideo(currentMobileThumb); currentMobileThumb = null; }

    var thumbEls = Array.from(container.querySelectorAll('.hub-feed-thumb--playable'));
    if (!thumbEls.length) return;

    if (isTouchDevice()) {
      /* ── Mobile: IntersectionObserver — play the most-central visible card ── */
      var ratios = new Map();
      thumbEls.forEach(function (el) { ratios.set(el, 0); });

      function pickMostCentral() {
        var best = null, bestRatio = 0.15; /* minimum threshold to be considered */
        ratios.forEach(function (ratio, el) {
          if (ratio > bestRatio) { bestRatio = ratio; best = el; }
        });
        if (best === currentMobileThumb) return;
        deactivateVideo(currentMobileThumb);
        currentMobileThumb = best;
        activateVideo(currentMobileThumb);
      }

      var thresholds = [];
      for (var t = 0; t <= 20; t++) thresholds.push(t / 20);

      mobileObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          ratios.set(entry.target, entry.intersectionRatio);
        });
        pickMostCentral();
      }, { threshold: thresholds });

      thumbEls.forEach(function (el) { mobileObserver.observe(el); });

    } else {
      /* ── Desktop: hover to play ──────────────────────────────────────────── */
      thumbEls.forEach(function (thumbEl) {
        var videoEl = thumbEl.closest('.hub-feed-video');
        videoEl.addEventListener('mouseenter', function () { activateVideo(thumbEl); });
        videoEl.addEventListener('mouseleave', function () { deactivateVideo(thumbEl); });
      });
    }
  }

  /* ── Filtering ──────────────────────────────────────────────────────────── */
  var PILL_FILTERS = {
    'all':      function ()     { return true; },
    'live':     function (feed) { return feed.status === 'live'; },
    'blue-tit': function (feed) { return feed.species.some(function (s) { return s.toLowerCase().includes('blue tit'); }); },
    'owls':     function (feed) { return feed.species.some(function (s) { return s.toLowerCase().includes('owl'); }); },
    'near-me':  function ()     { return true; /* geolocation stub — show all */ },
  };

  function applyFilters(feeds, pillFilter) {
    var pillFn = PILL_FILTERS[pillFilter] || PILL_FILTERS.all;
    return feeds.filter(function (feed) { return pillFn(feed); });
  }

  /* ── Data loader ────────────────────────────────────────────────────────── */
  /* Async-ready: swap the body of loadFeeds() for a fetch() call when live.  */
  function loadFeeds() {
    return Promise.resolve(DEMO_FEEDS);
  }

  /* ── Mount ──────────────────────────────────────────────────────────────── */
  function mount() {
    var grid        = document.getElementById('hub-feed-grid');
    var countEl     = document.getElementById('hub-result-count');
    var queryEl     = document.getElementById('hub-results-query');
    var queryWrapEl = document.getElementById('hub-results-query-wrap');
    var searchInput = document.getElementById('hub-search-input');

    if (!grid) return;

    var params        = new URLSearchParams(window.location.search);
    var activeQuery   = params.get('q') || '';
    var activeFilter  = 'all';
    var allFeeds      = [];

    /* Populate query display + search input from URL param */
    if (activeQuery) {
      if (queryEl)     queryEl.textContent      = activeQuery;
      if (searchInput) searchInput.value        = activeQuery;
    } else {
      if (queryWrapEl) queryWrapEl.style.display = 'none';
    }

    function render() {
      /* Deactivate any playing mobile card before re-rendering */
      if (currentMobileThumb) { deactivateVideo(currentMobileThumb); currentMobileThumb = null; }
      var visible = applyFilters(allFeeds, activeFilter);
      grid.innerHTML = visible.length
        ? visible.map(renderCard).join('\n')
        : '<p class="hub-no-results">No feeds match — <a href="/search/">clear filters</a></p>';
      if (countEl) countEl.textContent = visible.length;
      attachPlayBehaviour(grid);
    }

    /* Filter pill wiring */
    document.querySelectorAll('.hub-pill[data-filter]').forEach(function (pill) {
      pill.addEventListener('click', function () {
        document.querySelectorAll('.hub-pill').forEach(function (p) {
          p.classList.remove('hub-pill--active');
          p.setAttribute('aria-pressed', 'false');
        });
        pill.classList.add('hub-pill--active');
        pill.setAttribute('aria-pressed', 'true');
        activeFilter = pill.dataset.filter;
        render();
      });
    });

    /* Load data then render */
    loadFeeds().then(function (feeds) {
      allFeeds = feeds;
      render();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }

})();
