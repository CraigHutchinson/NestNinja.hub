/* =============================================================================
   NestNinja Hub — Individual feed page renderer
   ---------------------------------------------------------------------------
   Reads the feed slug from data-feed-slug on #feed-app, looks up the feed in
   NestNinja.FEEDS (feeds-db.js), and renders the full page client-side.

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

  /* ── String helpers ─────────────────────────────────────────────────────── */
  function esc(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* Minimal Markdown → HTML renderer.
     Handles:  **bold**,  `code`,  leading "- " bullet lists,  blank-line paragraphs. */
  function md(text) {
    if (!text) return '';

    /* Inline: code before bold to avoid double-processing */
    function inlineRender(line) {
      return line
        .replace(/`([^`]+)`/g,  '<code>$1</code>')
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
        if (line.trim() === '') {
          /* blank line — paragraph break only if something is open */
          out += '</p><p>';
        } else {
          out += inlineRender(line) + ' ';
        }
      }
    }
    if (inList) out += '</ul>';

    /* Wrap in a paragraph, then collapse empty ones */
    out = '<p>' + out + '</p>';
    out = out.replace(/<p>\s*<\/p>/g, '');
    out = out.replace(/<p><\/p>/g, '');
    return out;
  }

  /* ── Date formatter ─────────────────────────────────────────────────────── */
  var MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];

  function formatDate(isoStr) {
    /* Accepts "2026-02-19T08:14:00" or "2026-02-19 08:14:00" */
    var d = new Date(isoStr.replace(' ', 'T'));
    if (isNaN(d.getTime())) return isoStr;
    var day  = d.getDate();
    var mon  = MONTHS[d.getMonth()];
    var yr   = d.getFullYear();
    var hh   = ('0' + d.getHours()).slice(-2);
    var mm   = ('0' + d.getMinutes()).slice(-2);
    return day + '\u00a0' + mon + '\u00a0' + yr + ', ' + hh + ':' + mm;
  }

  /* ── Demo feed detection ──────────────────────────────────────────────────── */
  function isDemo(feed) {
    return feed.slug.indexOf('demo_') === 0;
  }

  function renderDemoBanner() {
    return [
      '<div class="feed-demo-banner">',
      '  <span aria-hidden="true">🧪</span>',
      '  <span><strong>Demo feed</strong> — this box, its diary, and all logged events are entirely',
      '  simulated for illustration purposes. No real camera exists at this location.</span>',
      '</div>',
    ].join('\n');
  }

  /* ── Hero section ───────────────────────────────────────────────────────── */
  function renderHero(feed) {
    if (feed.videoId) {
      var src = 'https://www.youtube-nocookie.com/embed/' + esc(feed.videoId)
              + '?rel=0&modestbranding=1';
      return [
        '<div class="feed-hero">',
        '  <div class="feed-hero-video">',
        '    <iframe src="' + src + '"',
        '            title="' + esc(feed.title) + '"',
        '            frameborder="0"',
        '            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"',
        '            allowfullscreen></iframe>',
        '  </div>',
        '</div>',
      ].join('\n');
    }
    /* Offline — show thumbnail with overlay */
    var thumb = feed.thumbnail || '/assets/images/placeholder-nest.jpg';
    return [
      '<div class="feed-hero">',
      '  <div class="feed-hero-thumb" style="background-image:url(\'' + esc(thumb) + '\')">',
      '    <div class="feed-hero-offline-msg">⚫ Feed currently offline</div>',
      '  </div>',
      '</div>',
    ].join('\n');
  }

  /* ── Meta bar ───────────────────────────────────────────────────────────── */
  function renderMetaBar(feed) {
    var sc       = STATUS_CONFIG[feed.status] || STATUS_CONFIG.offline;
    var specHtml = feed.species.map(function (name) {
      var m = NestNinja.speciesMeta(name);
      return '<span class="hub-species-tag ' + m.cls + '">' + m.emoji + ' ' + esc(name) + '</span>';
    }).join('');

    var watchBtn = feed.watchUrl
      ? '<a href="' + esc(feed.watchUrl) + '" target="_blank" rel="noopener" class="btn btn-secondary feed-youtube-btn">▶ Watch on YouTube</a>'
      : '';

    return [
      '<div class="feed-meta-bar">',
      '  <div class="feed-meta-left">',
      '    <h1 class="feed-title">' + esc(feed.title) + '</h1>',
      '    <p class="feed-location">📍 ' + esc(feed.location) + '</p>',
      '    <div class="feed-species-row">' + specHtml + '</div>',
      '  </div>',
      '  <div class="feed-meta-right">',
      '    <span class="hub-feed-status ' + sc.cls + '">' + sc.label + '</span>',
      '    ' + watchBtn,
      '  </div>',
      '</div>',
    ].join('\n');
  }

  /* ── Sidebar (about + camera) ───────────────────────────────────────────── */
  function renderSidebar(feed) {
    return [
      '<aside class="feed-sidebar">',
      '  <section class="feed-info-card">',
      '    <h2>📦 About this box</h2>',
      '    ' + md(feed.about),
      '  </section>',
      '  <section class="feed-info-card">',
      '    <h2>📷 Camera setup</h2>',
      '    ' + md(feed.camera),
      '  </section>',
      '</aside>',
    ].join('\n');
  }

  /* ── Diary ──────────────────────────────────────────────────────────────── */
  function renderDiary(feed) {
    var entries = (feed.diary || []).map(function (entry) {
      return [
        '<li class="feed-diary-entry feed-diary-entry--' + esc(entry.type) + '">',
        '  <span class="diary-icon">' + esc(entry.icon) + '</span>',
        '  <div class="diary-body">',
        '    <time class="diary-time" datetime="' + esc(entry.date) + '">' + formatDate(entry.date) + '</time>',
        '    <p class="diary-text">' + esc(entry.text) + '</p>',
        '  </div>',
        '</li>',
      ].join('\n');
    }).join('\n');

    var diaryNote = isDemo(feed)
      ? '⚠️ All entries below are simulated demo data — timestamps, events, and owner notes are entirely fictional.'
      : 'Events logged automatically by the NestNinja device and supplemented with owner notes.';
    return [
      '<main class="feed-diary">',
      '  <h2>📒 Nest diary</h2>',
      '  <p class="feed-diary-note">' + diaryNote + '</p>',
      entries.length
        ? '<ol class="feed-diary-list">' + entries + '</ol>'
        : '<p class="feed-diary-empty">No diary entries yet — check back soon.</p>',
      '</main>',
    ].join('\n');
  }

  /* ── Full page renderer ─────────────────────────────────────────────────── */
  function renderPage(container, feed) {
    var footerNote = isDemo(feed)
      ? '🧪 This is a simulated demo feed. All content is fictional and for illustration purposes only.'
      : '🔒 This camera owner has opted in to share their feed publicly.';
    container.innerHTML = [
      '<div class="feed-page">',
      '  <div class="feed-page-back">',
      '    <a href="/search/" class="btn-back">← Back to results</a>',
      '  </div>',
      '  ' + (isDemo(feed) ? renderDemoBanner() : ''),
      '  ' + renderHero(feed),
      '  ' + renderMetaBar(feed),
      '  <hr>',
      '  <div class="feed-body">',
      '    ' + renderSidebar(feed),
      '    ' + renderDiary(feed),
      '  </div>',
      '  <div class="feed-page-footer">',
      '    <p>' + footerNote + '</p>',
      '    <a href="/search/" class="btn btn-primary">← Browse all feeds</a>',
      '  </div>',
      '</div>',
    ].join('\n');
  }

  /* ── Mount ──────────────────────────────────────────────────────────────── */
  function mount() {
    var container = document.getElementById('feed-app');
    if (!container) return;

    var slug = container.getAttribute('data-feed-slug');
    if (!slug) {
      container.innerHTML = '<p class="feed-error">Feed slug not specified.</p>';
      return;
    }

    var feed = NestNinja.findFeed(slug);
    if (!feed) {
      container.innerHTML = [
        '<div class="feed-page">',
        '  <div class="feed-page-back"><a href="/search/" class="btn-back">← Back to results</a></div>',
        '  <p class="feed-error">Feed &ldquo;' + esc(slug) + '&rdquo; not found.</p>',
        '</div>',
      ].join('\n');
      return;
    }

    /* Update the browser tab title to match the feed */
    document.title = feed.title + ' — NestNinja Hub';

    renderPage(container, feed);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }

})();
