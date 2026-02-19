/* =============================================================================
   NestNinja Hub — Individual feed page renderer
   ---------------------------------------------------------------------------
   The page structure lives in _layouts/feed.html.
   This script reads the feed slug from #feed-app[data-feed-slug], looks up
   the feed in NestNinja.FEEDS (feeds-db.js), then populates each named
   element with data.

   Element IDs targeted (see feed.html for their HTML context):
     #feed-demo-banner  shown + filled for demo_ feeds (hidden by default)
     #feed-hero         video iframe or offline thumbnail (status-dependent)
     #feed-title        h1 feed name
     #feed-location     location paragraph
     #feed-species-row  species tag chips
     #feed-status       live / recording / offline badge
     #feed-watch-btn    YouTube watch link (or empty for offline feeds)
     #feed-about        rendered Markdown — about this box
     #feed-camera       rendered Markdown — camera setup
     #feed-diary-note   subtitle above diary entries
     #feed-diary-list   <ol> of diary entries
     #feed-diary-empty  shown instead of the list when diary is empty
     #feed-footer-note  note in the page footer

   Load order in _layouts/feed.html:
     1. feeds-db.js      → NestNinja.FEEDS, NestNinja.findFeed
     2. birds-db.js      → NestNinja.SPECIES_META, NestNinja.speciesMeta
     3. hub-feed-page.js → this file
   ============================================================================= */

(function () {
  'use strict';

  /* ── Status display config ─────────────────────────────────────────────── */
  var STATUS_CONFIG = {
    live:      { cls: 'hub-feed-status--live',      label: '🔴 Live' },
    recording: { cls: 'hub-feed-status--recording', label: '🟢 Recording' },
    offline:   { cls: 'hub-feed-status--offline',   label: '⚫ Offline' },
  };

  /* ── Helpers ────────────────────────────────────────────────────────────── */

  /* Escape for use inside HTML attribute values and innerHTML */
  function esc(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* Minimal Markdown → HTML: **bold**, `code`, "- " bullets, blank-line paragraphs. */
  function md(text) {
    if (!text) return '';

    function inlineRender(line) {
      return line
        .replace(/`([^`]+)`/g,       '<code>$1</code>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    }

    var lines  = text.split('\n');
    var out    = '';
    var inList = false;

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      if (/^- /.test(line)) {
        if (!inList) { out += '<ul>'; inList = true; }
        out += '<li>' + inlineRender(line.slice(2)) + '</li>';
      } else {
        if (inList) { out += '</ul>'; inList = false; }
        out += line.trim() === '' ? '</p><p>' : inlineRender(line) + ' ';
      }
    }
    if (inList) out += '</ul>';

    out = '<p>' + out + '</p>';
    out = out.replace(/<p>\s*<\/p>/g, '');
    return out;
  }

  var MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];

  function formatDate(isoStr) {
    var d = new Date(isoStr.replace(' ', 'T'));
    if (isNaN(d.getTime())) return isoStr;
    var hh = ('0' + d.getHours()).slice(-2);
    var mm = ('0' + d.getMinutes()).slice(-2);
    return d.getDate() + '\u00a0' + MONTHS[d.getMonth()] + '\u00a0' + d.getFullYear()
           + ', ' + hh + ':' + mm;
  }

  function isDemo(feed) { return feed.slug.indexOf('demo_') === 0; }

  /* ── Section populators ─────────────────────────────────────────────────── */

  function populateDemoBanner(feed) {
    var el = document.getElementById('feed-demo-banner');
    if (!el || !isDemo(feed)) return;
    el.innerHTML = '<span aria-hidden="true">🧪</span>'
      + '<span><strong>Demo feed</strong> \u2014 this box, its diary, and all logged events'
      + ' are entirely simulated for illustration purposes.'
      + ' No real camera exists at this location.</span>';
    el.hidden = false;
  }

  function populateHero(feed) {
    var el = document.getElementById('feed-hero');
    if (!el) return;
    if (feed.videoId) {
      var src = 'https://www.youtube-nocookie.com/embed/' + esc(feed.videoId) + '?rel=0&modestbranding=1';
      el.innerHTML = '<div class="feed-hero-video">'
        + '<iframe src="' + src + '" title="' + esc(feed.title) + '" frameborder="0"'
        + ' allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"'
        + ' allowfullscreen></iframe>'
        + '</div>';
    } else {
      var thumb = feed.thumbnail || '/assets/images/placeholder-nest.jpg';
      el.innerHTML = '<div class="feed-hero-thumb" style="background-image:url(\'' + esc(thumb) + '\')">'
        + '<div class="feed-hero-offline-msg">\u26AB Feed currently offline</div>'
        + '</div>';
    }
  }

  function populateMetaBar(feed) {
    var sc = STATUS_CONFIG[feed.status] || STATUS_CONFIG.offline;

    var titleEl = document.getElementById('feed-title');
    if (titleEl) titleEl.textContent = feed.title;

    var locEl = document.getElementById('feed-location');
    if (locEl) locEl.textContent = '📍 ' + feed.location;

    var specEl = document.getElementById('feed-species-row');
    if (specEl) {
      specEl.innerHTML = feed.species.map(function (name) {
        var m = NestNinja.speciesMeta(name);
        return '<span class="hub-species-tag ' + m.cls + '">' + m.emoji + ' ' + esc(name) + '</span>';
      }).join('');
    }

    var statusEl = document.getElementById('feed-status');
    if (statusEl) {
      statusEl.className   = 'hub-feed-status ' + sc.cls;
      statusEl.textContent = sc.label;
    }

    var watchEl = document.getElementById('feed-watch-btn');
    if (watchEl) {
      watchEl.innerHTML = feed.watchUrl
        ? '<a href="' + esc(feed.watchUrl) + '" target="_blank" rel="noopener"'
          + ' class="btn btn-secondary feed-youtube-btn">\u25B6 Watch on YouTube</a>'
        : '';
    }
  }

  function populateSidebar(feed) {
    var aboutEl = document.getElementById('feed-about');
    if (aboutEl) aboutEl.innerHTML = md(feed.about);

    var cameraEl = document.getElementById('feed-camera');
    if (cameraEl) cameraEl.innerHTML = md(feed.camera);
  }

  function populateDiary(feed) {
    var noteEl = document.getElementById('feed-diary-note');
    if (noteEl) {
      noteEl.textContent = isDemo(feed)
        ? '\u26A0\uFE0F All entries below are simulated demo data \u2014'
          + ' timestamps, events, and owner notes are entirely fictional.'
        : 'Events logged automatically by the NestNinja device and supplemented with owner notes.';
    }

    var entries  = feed.diary || [];
    var listEl   = document.getElementById('feed-diary-list');
    var emptyEl  = document.getElementById('feed-diary-empty');

    if (!entries.length) {
      if (listEl)  listEl.hidden  = true;
      if (emptyEl) emptyEl.hidden = false;
      return;
    }

    if (listEl) {
      listEl.innerHTML = entries.map(function (entry) {
        return '<li class="feed-diary-entry feed-diary-entry--' + esc(entry.type) + '">'
          + '<span class="diary-icon">' + esc(entry.icon) + '</span>'
          + '<div class="diary-body">'
          + '<time class="diary-time" datetime="' + esc(entry.date) + '">' + formatDate(entry.date) + '</time>'
          + '<p class="diary-text">' + esc(entry.text) + '</p>'
          + '</div></li>';
      }).join('');
    }
  }

  function populateFooter(feed) {
    var el = document.getElementById('feed-footer-note');
    if (el) {
      el.textContent = isDemo(feed)
        ? '🧪 This is a simulated demo feed. All content is fictional and for illustration purposes only.'
        : '🔒 This camera owner has opted in to share their feed publicly.';
    }
  }

  /* ── Mount ──────────────────────────────────────────────────────────────── */
  function mount() {
    var container = document.getElementById('feed-app');
    if (!container) return;

    var slug = new URLSearchParams(window.location.search).get('slug');

    if (!slug) {
      /* No slug param — nothing to show; send the user to search */
      window.location.replace('/search/');
      return;
    }

    var feed = NestNinja.findFeed(slug);

    if (!feed) {
      var errEl = document.getElementById('feed-diary-note') || container;
      errEl.textContent = 'Feed \u201C' + slug + '\u201D not found.';
      return;
    }

    document.title = feed.title + ' \u2014 NestNinja Hub';

    populateDemoBanner(feed);
    populateHero(feed);
    populateMetaBar(feed);
    populateSidebar(feed);
    populateDiary(feed);
    populateFooter(feed);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }

})();
