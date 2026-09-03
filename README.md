# ClosetIQ

An Angular app for cataloging your wardrobe (t-shirts, tops, pants, jackets,
etc.) and getting outfit suggestions based on occasion and color matching.

## Features

- Add clothing items with a name, category, color, optional photo, and the
  occasions you'd wear them for (office, family function, casual outing,
  party, formal event, workout).
- Browse your full closet as a grid.
- Get ranked outfit suggestions (top + bottom + optional jacket) for a chosen
  occasion, scored by color-wheel harmony (complementary, analogous, neutral
  pairings).
- Data is stored locally in the browser (`localStorage`) — no backend or
  account required.

## Tech stack

- Angular 22 (standalone components, signals)
- SCSS
- No backend — client-side persistence via `localStorage`

## Getting started

```bash
npm install
npm start
```

Then open http://localhost:4200.

## Project structure

```
src/app/
  models/                  Clothing item & occasion types
  services/
    closet.service.ts      localStorage-backed closet CRUD
    color-utils.ts          Color-wheel math (hex -> HSL, harmony scoring)
    outfit-matcher.service.ts  Ranks top/bottom/jacket combinations
  components/
    add-item/               Form to add a new clothing item (with photo upload)
    closet-grid/             Grid view of the full closet
    outfit-suggestions/      Occasion picker + ranked outfit suggestions
```

## Roadmap ideas

- Multi-photo items and background removal for cleaner thumbnails
- Weather-aware suggestions
- Outfit history / "worn recently" tracking to encourage rotation
- Cloud sync (backend + auth) so the closet isn't tied to one browser
