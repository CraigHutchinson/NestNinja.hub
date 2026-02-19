/* =============================================================================
   NestNinja Hub — Search grid renderer
   ---------------------------------------------------------------------------
   Reads feed data from NestNinja.FEEDS (feeds-db.js) and species metadata
   from NestNinja.SPECIES_META (birds-db.js).

   Load order required in search.html:
     1. feeds-db.js      → NestNinja.FEEDS, NestNinja.findFeed
     2. birds-db.js      → NestNinja.SPECIES_META, NestNinja.speciesMeta
     3. hub-search.js    → search input / navigation
     4. hub-feeds.js     → this file (grid renderer + play behaviour)
   ============================================================================= */

(function () {

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
      var m = NestNinja.speciesMeta(name);
      return '<span class="hub-species-tag ' + m.cls + '">' + m.emoji + ' ' + esc(name) + '</span>';
    }).join('');
  }

  function renderFooter(feed) {
    var feedUrl = '/feeds/?slug=' + feed.slug;
    var isDemo = feed.slug.indexOf('demo_') === 0;
    var ownerHtml = '<span class="hub-feed-owner">'
      + (isDemo
        ? '🧪 Demo — simulated data'
        : (feed.lastActive ? 'Last active ' + esc(feed.lastActive) : '▶ Live stream'))
      + '</span>';
    var watchHtml = feed.watchUrl
      ? '<a href="' + esc(feed.watchUrl) + '" target="_blank" rel="noopener" class="hub-feed-watch">Full screen ↗</a>'
      : '<span class="hub-feed-watch hub-feed-watch--none">No recording</span>';
    var diaryHtml = '<a href="' + esc(feedUrl) + '" class="hub-feed-diary">View diary →</a>';
    return ownerHtml + '<div class="hub-feed-links">' + diaryHtml + watchHtml + '</div>';
  }

  function renderCard(feed) {
    var sc = STATUS_CONFIG[feed.status] || STATUS_CONFIG.offline;
    var offlineCls = feed.status === 'offline' ? ' hub-feed-card--offline' : '';
    var feedUrl = '/feeds/?slug=' + feed.slug;
    /* Whole card is a link; individual inner links still work via pointer-events */
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
      '    <h3 class="hub-feed-title"><a href="' + esc(feedUrl) + '" class="hub-feed-title-link">' + esc(feed.title) + '</a>'
      + (feed.slug.indexOf('demo_') === 0 ? '<span class="hub-feed-demo-badge">Demo</span>' : '') + '</h3>',
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
  /* Reads from feeds-db.js. Swap Promise.resolve for a fetch() when going live. */
  function loadFeeds() {
    return Promise.resolve(NestNinja.FEEDS);
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
