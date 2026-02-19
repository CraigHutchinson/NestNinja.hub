# NestNinja Hub — Species Coverage Analysis

**Reference:** BOU British List, 10th edition (McInerny et al., 2022; *Ibis* 164: 860–910)  
**DOI:** <https://doi.org/10.1111/ibi.13065>  
**British List total:** 628 species (Cat A: 610, Cat B: 8, Cat C: 10)  
**Last reviewed:** 2026-02-19

---

## Overview

The Hub autocomplete (`assets/js/hub-search.js`) is scoped to species that are:

1. **Actively relevant to bird box / nest box users** (use boxes, are monitored via cameras)
2. **Common UK resident or migrant breeders** likely to be searched for
3. **Identifiable by a general audience** (not rare vagrants or subspecific curiosities)

The full BOU British List is **not** the target — rare vagrants (Category B, most Cat A with <100 records, Category D) should be omitted unless they gain nest-box relevance. Category C species that are naturalised, common, and camera-relevant (e.g. Ring-necked Parakeet) warrant inclusion.

---

## Current Coverage

| Group key | Species in hub-search.js | Count |
|---|---|---|
| `tits` | Blue Tit, Great Tit, Coal Tit, Marsh Tit, Long-tailed Tit, Nuthatch, Treecreeper | 7 |
| `small-passerines` | House Sparrow, Tree Sparrow, Robin, Wren, Starling, Pied Wagtail, Grey Wagtail, Dipper | 8 |
| `finches` | Chaffinch, Brambling, Goldfinch, Siskin, Linnet, Twite, Lesser Redpoll, Common Crossbill, Parrot Crossbill, Scottish Crossbill, Bullfinch, Hawfinch, Greenfinch, Yellowhammer, Reed Bunting, Corn Bunting, Snow Bunting | 17 |
| `flycatchers` | Pied Flycatcher, Spotted Flycatcher, Common Redstart, Black Redstart, Blackbird | 5 |
| `hirundines` | Common Swift, Barn Swallow, House Martin, Sand Martin | 4 |
| `owls` | Barn Owl, Tawny Owl, Little Owl, Long-eared Owl | 4 |
| `raptors` | Common Kestrel, Peregrine Falcon, Carrion Crow, Hooded Crow, Rook, Jackdaw, Raven, Magpie, Jay, Chough, Stock Dove, Great Spotted Woodpecker, Lesser Spotted Woodpecker, Green Woodpecker | 14 |
| `waterbirds` | Mandarin Duck, Goldeneye, Goosander, Common Merganser, Tufted Duck, Wood Duck, Kingfisher | 7 |
| `seabirds` | Herring Gull, Lesser Black-backed Gull, Greater Black-backed Gull, Black-headed Gull, Common Gull, Kittiwake, Common Tern, Arctic Tern, Little Tern, Sandwich Tern, Puffin, Razorbill, Common Guillemot, Gannet, Fulmar | 15 |
| `fowl` | Chicken, Bantam, Turkey, Domestic Duck, Khaki Campbell, Indian Runner Duck, Muscovy Duck, Domestic Goose, Embden Goose, Toulouse Goose, Guinea Fowl, Helmeted Guinea Fowl, Peafowl, Quail, Pheasant, Red-legged Partridge, Grey Partridge, Domestic Pigeon, Racing Homer, Dove | 20 |

**Total species currently indexed:** 101  
**Species on BOU British List relevant to boxes/cameras:** ~90–130 (see gaps below)

---

## Gaps: Common UK Species Not Yet Covered

Species below appear on the BOU British List as Resident Breeders (RB) or Migrant Breeders (MB) and are routinely searched for by UK birdwatchers. Priority:

- 🔴 **High** — common, likely searched, box-relevant or very high public profile
- 🟡 **Medium** — noteworthy UK birds, camera interest
- 🟢 **Low** — present on the list but niche; add at later iteration

### Tits & Small Woodland Birds

| Species | BOU Status | Priority | Notes |
|---|---|---|---|
| Willow Tit | RB | 🔴 | Declining; uses nest boxes; easy to confuse with Marsh Tit |
| Crested Tit | RB | 🟡 | Scotland only; nest box user; Caledonian pine specialist |
| Bearded Tit | RB | 🟡 | Reed-bed specialist; does not use boxes but high camera interest |
| Penduline Tit | SM | 🟢 | Rare; scarce migrant; not a box user |

### Garden & Small Passerines

| Species | BOU Status | Priority | Notes |
|---|---|---|---|
| Dunnock | RB | 🔴 | Extremely common garden bird; often nests in boxes with open access or dense hedges |
| Song Thrush | RB | 🔴 | Red-listed; common garden bird; iconic |
| Mistle Thrush | RB | 🟡 | Larger thrush; parks & gardens |
| Fieldfare | WM CB | 🟡 | Winter visitor; popular in gardens |
| Redwing | WM MB | 🟡 | Winter visitor; very common |
| Ring Ouzel | MB | 🟡 | Upland version of Blackbird; declining |
| Nightingale | MB | 🔴 | Famous song bird; declining; conservation interest |
| Stonechat | RB | 🟡 | Heathland & coastal; camera-friendly |
| Whinchat | MB | 🟡 | Upland & farmland; summer visitor |
| Wheatear | MB PM | 🟡 | First migrant of spring; upland & coastal |
| Goldcrest | RB | 🔴 | Smallest UK bird; conifer woodland; nest box interest |
| Firecrest | MB RB | 🟡 | Uncommon; increasing; sought-after sighting |
| Waxwing | WM | 🔴 | Irruption visitor; berry feeder; very popular with public |
| Blackcap | MB WM | 🔴 | Very common garden warbler; overwinters increasingly |
| Whitethroat | MB | 🔴 | Most common UK Sylvia; hedgerows |
| Garden Warbler | MB | 🟡 | Common; often confused with Blackcap |
| Chiffchaff | MB WM | 🔴 | First spring migrant; ubiquitous |
| Willow Warbler | MB | 🔴 | Most abundant summer visitor; ubiquitous |
| Wood Warbler | MB | 🟡 | Declining; sessile oak woodland |
| Grasshopper Warbler | MB | 🟡 | Reeling call; declining |
| Sedge Warbler | MB | 🟡 | Wetland & farmland scrub |
| Reed Warbler | MB | 🟡 | Reed-bed specialist; hosts Cuckoo |
| Cetti's Warbler | RB | 🟡 | Expanding; loud explosive call |
| Dartford Warbler | RB | 🟡 | Heathland specialist; southern England |
| Lesser Whitethroat | MB | 🟡 | Common but less familiar than Whitethroat |
| Skylark | RB | 🔴 | Red-listed; iconic farmland bird; declining |
| Woodlark | RB | 🟡 | Heathland & forest clearings; Schedule 1 |

### Thrushes (missing from flycatchers group)

| Species | BOU Status | Priority | Notes |
|---|---|---|---|
| Song Thrush | RB | 🔴 | (see above; also fits flycatchers group) |
| Mistle Thrush | RB | 🟡 | (see above) |
| Fieldfare | WM CB | 🟡 | (see above) |
| Redwing | WM MB | 🟡 | (see above) |
| Ring Ouzel | MB | 🟡 | (see above) |

### Raptors & Birds of Prey

| Species | BOU Status | Priority | Notes |
|---|---|---|---|
| Sparrowhawk | RB | 🔴 | Most commonly seen garden raptor in UK |
| Buzzard | RB | 🔴 | Now most common UK raptor; ubiquitous |
| Red Kite | AC3 RB | 🔴 | Conservation success story; high public profile |
| Osprey | MB | 🔴 | Uses artificial nest platforms; conservation icon |
| Merlin | RB MB | 🟡 | Smallest UK falcon; upland |
| Hobby | MB | 🟡 | Summer visitor; uses old crow nests |
| Goshawk | AC3 NB | 🟡 | Secretive; rare; woodland raptor |
| Short-eared Owl | RB MB | 🔴 | Open land owl; very visible; often searched for |
| Marsh Harrier | RB MB | 🟡 | Wetland raptor; expanding |
| Hen Harrier | RB MB | 🟡 | Upland; conservation controversy |
| Golden Eagle | RB | 🟡 | Scotland; low search but high profile |
| White-tailed Eagle | AC3 NB | 🟡 | Conservation success; Scotland & England reintro |
| Honey Buzzard | MB | 🟢 | Rare; scarce breeder |
| Montagu's Harrier | MB | 🟢 | Very rare breeder |
| Red-footed Falcon | SM | 🟢 | Passage migrant only |

### Woodpeckers (already in `raptors` group; review placement)

All three UK woodpecker species are already indexed. Consider breaking into a dedicated `woodpeckers` group for discoverability.

### Pigeons & Doves (wild species; distinct from fowl)

| Species | BOU Status | Priority | Notes |
|---|---|---|---|
| Woodpigeon | RB | 🔴 | Most abundant UK bird; very common garden visitor |
| Collared Dove | RB | 🔴 | Ubiquitous garden bird |
| Turtle Dove | MB | 🔴 | Red-listed; dramatic decline; conservation focus |
| Rock Dove / Feral Pigeon | AC4 | 🟡 | Urban; ancestor of domestic pigeon |
| Stock Dove | RB | ✅ already indexed | — |

### Gamebirds (wild species; distinct from fowl)

| Species | BOU Status | Priority | Notes |
|---|---|---|---|
| Red Grouse | RB | 🟡 | Iconic Scottish moor bird; Willow Ptarmigan subspecies |
| Ptarmigan | RB | 🟡 | Scottish mountain specialist; fine-grained habitat |
| Black Grouse | RB | 🟡 | Lek display; upland edge; declining |
| Capercaillie | AC3 NB | 🔴 | Conservation critical; Scotland; high public interest |
| Cuckoo | MB | 🔴 | Iconic; dramatic decline; public awareness very high |

### Waterbirds & Waders

| Species | BOU Status | Priority | Notes |
|---|---|---|---|
| Mute Swan | AC2 RB | 🔴 | Unmistakable; very common; public favourite |
| Mallard | AC2 RB | 🔴 | Most common duck; easily identified |
| Teal | RB | 🟡 | Small dabbling duck; wetland |
| Greylag Goose | AC2 RB | 🟡 | Common; ancestor of farmyard goose |
| Canada Goose | AC2 NB | 🟡 | Very common park & lake bird |
| Moorhen | RB | 🔴 | Very common; uses open box near water |
| Coot | RB | 🔴 | Common; open-water platforms |
| Grey Heron | RB | 🔴 | Very common; iconic; garden pond visitor |
| Little Egret | RB | 🟡 | Recent colonist; now common; high profile |
| Cormorant | RB MB | 🟡 | Rivers & coasts; increasingly inland |
| Bittern | RB | 🟡 | Reed-bed boom; conservation success |
| Lapwing | RB | 🔴 | Red-listed; decline widely publicised |
| Curlew | RB | 🔴 | Red-listed; most at-risk UK wading bird |
| Snipe | RB | 🟡 | Wetland; drumming display |
| Woodcock | RB | 🟡 | Woodland wader; roding display |
| Oystercatcher | RB | 🟡 | Coastal & inland; distinctive call |
| Avocet | RB MB | 🟡 | RSPB symbol; conservation success |
| Common Sandpiper | MB | 🟢 | Common passage migrant |
| Redshank | RB | 🟢 | Wetland wader |
| Grey Plover | WM | 🟢 | Coastal passage |
| Ringed Plover | RB | 🟢 | Coastal & inland nester |
| Golden Plover | RB | 🟡 | Upland & estuaries |
| Little Ringed Plover | MB | 🟢 | Inland gravel pits & rivers |
| Crane | RB FB | 🟡 | Conservation story; Norfolk broads; growing colony |

### Seabirds (supplementary to current coverage)

| Species | BOU Status | Priority | Notes |
|---|---|---|---|
| Manx Shearwater | MB | 🟡 | Very large colony; Skomer; pelagic |
| Storm Petrel | MB | 🟢 | Nocturnal; offshore islands |
| Leach's Petrel | MB | 🟢 | Remote offshore islands |
| Gannet | RB MB | ✅ already indexed | — |
| Shag | RB | 🟡 | Coastal cliff nester |
| Cormorant | ✅ see waterbirds | — | — |
| Roseate Tern | MB | 🟡 | Rare tern; conservation concern |
| Black Guillemot | RB | 🟡 | Scottish coasts; uses cavities |
| Little Auk | WM | 🟢 | Winter visitor; offshore |

### Other Notable Species

| Species | BOU Status | Priority | Notes |
|---|---|---|---|
| Ring-necked Parakeet | C1 NB | 🔴 | Naturalised; very common SE England; growing interest |
| Nightjar | MB | 🟡 | Heathland; conservation interest; mysterious |
| Kingfisher | RB MB | ✅ already indexed | — |
| Bee-eater | SM CB | 🟢 | Rare but visible nester when occurs |
| Hoopoe | SM CB | 🟡 | Stunning; regular spring visitor; memorable |
| Wryneck | SM FB | 🟢 | Scarce passage migrant |

---

## Taxonomy & Naming Notes

Naming in hub-search.js should follow BOU 10th edition where practical:

| hub-search.js name | BOU 10th ed. name | Action |
|---|---|---|
| Common Kestrel | Kestrel (= Common Kestrel) | ✅ OK |
| Common Merganser | Goosander (= Common Merganser) | Consider adding "Goosander" as alias |
| Common Swift | Swift (= Common Swift) | ✅ OK |
| Barn Swallow | Swallow (= Barn Swallow) | Consider adding "Swallow" as alias |
| Common Crossbill | Crossbill (= Red Crossbill) | ✅ OK — BOU uses Red Crossbill formally |
| Pied Wagtail | Pied Wagtail (= White Wagtail *yarrellii*) | ✅ OK for UK context |

---

## Notes on BOU Category C Nature Species in Hub

Category C species on the British List that are naturalised and camera-relevant:

| Species | Category | In hub? |
|---|---|---|
| Ring-necked Parakeet | C1 | ❌ Missing — 🔴 high priority |
| Canada Goose | AC2 | ❌ Missing — 🟡 medium |
| Greylag Goose | AC2 C4 | ❌ Missing — 🟡 medium |
| Mallard | AC2 C4 | ❌ Missing — 🔴 high priority |
| Mute Swan | AC2 | ❌ Missing — 🔴 high priority |
| Barnacle Goose | AC2 | ❌ Missing — 🟢 low |
| Mandarin Duck | C1 | ✅ indexed |
| Little Owl | C1 | ✅ indexed |
| Red Kite (naturalised) | AC3 | ❌ Missing — 🔴 high |
| White-tailed Eagle | AC3 | ❌ Missing — 🟡 medium |

---

## Suggested Next Additions (Recommended Priority Order)

For the next dev iteration, suggest adding these groups to hub-search.js:

### Priority 1 — Common UK Birds Almost Everyone Searches For

1. Willow Tit
2. Dunnock
3. Goldcrest
4. Song Thrush
5. Waxwing
6. Blackcap
7. Chiffchaff
8. Willow Warbler
9. Whitethroat
10. Skylark
11. Sparrowhawk
12. Buzzard
13. Red Kite
14. Osprey
15. Short-eared Owl
16. Woodpigeon
17. Collared Dove
18. Turtle Dove
19. Cuckoo
20. Ring-necked Parakeet
21. Mallard
22. Mute Swan
23. Moorhen
24. Coot
25. Grey Heron
26. Lapwing
27. Curlew
28. Capercaillie (Red-listed, conservation)
29. Nightingale

### Priority 2 — Noteworthy; High Camera/Box Interest

- Mistle Thrush, Fieldfare, Redwing, Ring Ouzel
- Firecrest, Crested Tit
- Black Grouse, Red Grouse, Ptarmigan
- Little Egret, Cormorant, Bittern
- Marsh Harrier, Hen Harrier, Golden Eagle, White-tailed Eagle
- Hobby, Merlin, Goshawk
- Nightjar, Hoopoe
- Canada Goose, Greylag Goose, Teal
- Snipe, Woodcock, Oystercatcher, Avocet, Golden Plover
- Shag, Manx Shearwater, Black Guillemot, Roseate Tern

---

## BOU Species Excluded Deliberately

These categories are NOT suitable for the Hub autocomplete:

| Category | Reason |
|---|---|
| Category B (only pre-1950) | Effectively extinct in Britain; not searchable |
| Category D | Uncertain natural occurrence |
| Rare vagrants (<100 records, † in BOU list) | Not discoverable in practice via NestNinja boxes |
| Domestic / captive-derived (Category E, not self-sustaining) | Not wild-living; outside scope |
| Category F (before 1800 only) | Extinct in Britain |
| Non-BOU species (introduced game birds in large numbers) | Where wild populations aren't self-sustaining |

---

## Source

BOU (2022). *The British List: a checklist of birds of Britain (10th edition).*  
Ibis 164: 860–910. <https://doi.org/10.1111/ibi.13065>

Maintainer: NestNinja internal.  
Hub autocomplete data: `NestNinja.hub/assets/js/hub-search.js`
