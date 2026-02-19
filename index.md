---
layout: base
title: ""
---

<div class="hub-hero">
  <div class="hub-status">🚧 Coming Soon</div>
  <h1>🦅 NestNinja Hub</h1>
  <p class="hub-tagline">Discover live bird box cameras near you</p>
  <p class="hub-sub">
    NestNinja Hub will let bird watchers share and discover live nest camera feeds
    from NestNinja boxes across the UK — browse what's happening in bird boxes
    right now, wherever you are.
  </p>

  <div class="hub-search-wrap">
    <div class="hub-search">
      <input type="text" id="hub-search-input" placeholder="Search by location or species…" autocomplete="off" aria-label="Search bird boxes by location or species" aria-autocomplete="list" aria-controls="hub-suggestions">
      <button id="hub-search-btn" title="Search demo feeds">
        <span class="btn-icon" aria-hidden="true">🔍</span>
        <span class="btn-text">Search</span>
      </button>
    </div>
    <ul class="hub-suggestions" id="hub-suggestions" role="listbox" aria-hidden="true"></ul>
  </div>
  <p class="hub-search-note">✨ Try searching for a species or location to see demo results</p>

  <div class="cta-buttons">
    <a href="{{ site.uk_url }}" class="btn btn-primary">Get a NestNinja →</a>
    <a href="https://twitter.com/NestNinjaUK" class="btn btn-secondary">Follow for updates</a>
  </div>
</div>

---

## What is NestNinja Hub?

Hub is the **community discovery layer** for NestNinja devices. Once live, owners who opt in can share their camera feed so anyone can watch birds nesting in real time.

<div class="hub-feature-grid">
  <div class="hub-feature">
    <h3>📍 Discover by Location</h3>
    <p>Browse active bird box cameras on a map or filter by region across the UK.</p>
  </div>
  <div class="hub-feature">
    <h3>🐦 Filter by Species</h3>
    <p>Looking for blue tits? Robins? Find boxes with the species you want to watch.</p>
  </div>
  <div class="hub-feature">
    <h3>🔴 Live Feeds</h3>
    <p>Watch what's happening right now — hatching, feeding, fledging — in real time.</p>
  </div>
  <div class="hub-feature">
    <h3>🔒 Owner-Controlled</h3>
    <p>Feeds are only listed with the camera owner's explicit opt-in. Privacy first.</p>
  </div>
  <div class="hub-feature">
    <h3>🌐 No Account Needed</h3>
    <p>Browse freely as a guest. No sign-up required to watch shared feeds.</p>
  </div>
  <div class="hub-feature">
    <h3>📱 Works Everywhere</h3>
    <p>A fast, client-side site that works on any device, no app required.</p>
  </div>
</div>

---

## How will it work?

1. **Set up a NestNinja device** — [nestninja.uk]({{ site.uk_url }}) for hardware options
2. **Opt in to sharing** — enable feed listing in your NestNinja settings
3. **Your box appears on Hub** — other users can browse and watch your stream
4. **Change your mind?** — opt out any time; your feed stops appearing immediately

---

## When is it launching?

Hub is in the planning stage. Development will begin after the NestNinja firmware reaches stable release (targeting late 2026).

Want to be notified? Follow [@NestNinjaUK](https://twitter.com/NestNinjaUK) or [join the community](https://github.com/CraigHutchinson/NestNinja.open/discussions).

<script src="/assets/js/hub-search.js" defer></script>
