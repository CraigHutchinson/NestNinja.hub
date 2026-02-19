/* =============================================================================
   NestNinja Hub — Bird species metadata database
   ---------------------------------------------------------------------------
   NestNinja.SPECIES_META maps a species name (matching the strings used in
   feeds-db.js) to display metadata used by both the search grid and the
   individual feed pages.

   Schema per entry
   ────────────────
   emoji  {string}  Representative emoji character for the species/group.
   cls    {string}  CSS modifier class to append to .hub-species-tag.
                    Empty string → default teal style.
                    Available modifiers (defined in style.scss):
                      'hub-species-tag--owl'       Owls (brown/amber)
                      'hub-species-tag--swift'     Swifts, martins, swallows, kingfisher
                      'hub-species-tag--waterbird' Ducks and waterbirds
   ============================================================================= */

(function () {
  'use strict';

  window.NestNinja = window.NestNinja || {};

  NestNinja.SPECIES_META = {
    /* ── Tits ────────────────────────────────────────────────────────────── */
    'Blue Tit':           { emoji: '🐦', cls: '' },
    'Great Tit':          { emoji: '🐦', cls: '' },
    'Coal Tit':           { emoji: '🐦', cls: '' },
    'Marsh Tit':          { emoji: '🐦', cls: '' },
    'Long-tailed Tit':    { emoji: '🐦', cls: '' },

    /* ── Common garden birds ─────────────────────────────────────────────── */
    'Robin':              { emoji: '🐦', cls: '' },
    'Dunnock':            { emoji: '🐦', cls: '' },
    'Wren':               { emoji: '🐦', cls: '' },
    'House Sparrow':      { emoji: '🐦', cls: '' },
    'Tree Sparrow':       { emoji: '🐦', cls: '' },
    'Pied Flycatcher':    { emoji: '🐦', cls: '' },
    'Spotted Flycatcher': { emoji: '🐦', cls: '' },
    'Nuthatch':           { emoji: '🐦', cls: '' },
    'Treecreeper':        { emoji: '🐦', cls: '' },
    'Starling':           { emoji: '🐦', cls: '' },

    /* ── Owls ────────────────────────────────────────────────────────────── */
    'Barn Owl':           { emoji: '🦉', cls: 'hub-species-tag--owl' },
    'Tawny Owl':          { emoji: '🦉', cls: 'hub-species-tag--owl' },
    'Little Owl':         { emoji: '🦉', cls: 'hub-species-tag--owl' },
    'Long-eared Owl':     { emoji: '🦉', cls: 'hub-species-tag--owl' },
    'Short-eared Owl':    { emoji: '🦉', cls: 'hub-species-tag--owl' },

    /* ── Aerial species ──────────────────────────────────────────────────── */
    'Common Swift':       { emoji: '🐦', cls: 'hub-species-tag--swift' },
    'Barn Swallow':       { emoji: '🐦', cls: 'hub-species-tag--swift' },
    'House Martin':       { emoji: '🐦', cls: 'hub-species-tag--swift' },
    'Sand Martin':        { emoji: '🐦', cls: 'hub-species-tag--swift' },
    'Kingfisher':         { emoji: '🐦', cls: 'hub-species-tag--swift' },

    /* ── Waterbirds ──────────────────────────────────────────────────────── */
    'Mandarin Duck':      { emoji: '🦆', cls: 'hub-species-tag--waterbird' },
    'Goldeneye':          { emoji: '🦆', cls: 'hub-species-tag--waterbird' },
    'Goosander':          { emoji: '🦆', cls: 'hub-species-tag--waterbird' },
    'Common Merganser':   { emoji: '🦆', cls: 'hub-species-tag--waterbird' },
  };

  /* Lookup helper — returns the metadata for a species name, or a safe default. */
  NestNinja.speciesMeta = function (name) {
    return NestNinja.SPECIES_META[name] || { emoji: '🐦', cls: '' };
  };

})();
