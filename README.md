# ClosetIQ

Upload your wardrobe. Discover your style.

An Angular app for cataloging your wardrobe (t-shirts, tops, pants, jackets,
etc.) and getting outfit suggestions based on occasion and color matching.

## Features

- Start with a clothing photo and get its dominant color estimated locally in
  the browser, then see complementary garment colors and practical outfit ideas.
- Use the same style advisor without a photo by choosing any color, or select an
  item already saved in your closet.
- Get suggestions in both directions: style a top with trousers, jeans, skirts,
  leggings, or layers; style a bottom with shirts, T-shirts, blouses, or kurtas.
- See the best compatible pieces already in your wardrobe with a color-match score.
- Add clothing items with a name, category (including Indian wear like
  saree, blouse, salwar kameez, kurta, dress, and gown), color, gender
  (girls/boys/unisex), optional photo, and the occasions you'd wear them for
  (office, family function, casual outing, party, formal event, workout).
- Browse your full closet as a grid, filterable by gender.
- Explore ready-made color formulas (navy + ivory, saree + cream blouse, and more)
  and open any of them in the style advisor — no stock photos are added to your closet.
- Get ranked outfit suggestions (top + bottom + optional jacket, or a
  complete one-piece outfit) for a chosen occasion, scored by color-wheel
  harmony (complementary, analogous, neutral pairings).
- Data is stored locally in the browser (`localStorage`) — no backend or
  account required.

## Tech stack

- Angular 22 (standalone components, signals)
- SCSS
- No backend — client-side persistence via `localStorage`

## Getting started

You only need [Node.js LTS](https://nodejs.org) (v20 or newer) installed on the computer. Do **not** copy `node_modules` into GitHub — `package-lock.json` is the shared install list, and `npm ci` rebuilds the same packages on every machine.

After cloning:

```bash
npm run setup
```

That one command installs dependencies and starts the app. Your browser should open http://localhost:4200.

On Windows you can also run:

```powershell
.\setup.ps1
```

On macOS or Linux:

```bash
chmod +x setup.sh
./setup.sh
```

If the app is already set up, use `npm start` the next time.

## Project structure

```
setup.ps1 / setup.sh      One-command install + start
package-lock.json         Shared dependency versions for every clone
src/app/
  models/                  Clothing item & occasion types
  services/
    closet.service.ts      localStorage-backed closet CRUD
    color-utils.ts          Color-wheel math (hex -> HSL, harmony scoring)
    outfit-matcher.service.ts  Ranks top/bottom/jacket combinations
    style-advisor.service.ts Color recipes + matching saved closet pieces
    image-color.ts           In-browser dominant color estimation
  components/
    style-advisor/          Photo/color input + bidirectional pairing guidance
    add-item/               Form to add a new clothing item (with photo upload)
    closet-grid/             Grid view of the full closet
    outfit-suggestions/      Occasion picker + ranked outfit suggestions
    style-formulas/          Curated color pairings that open in the advisor
```

## Roadmap ideas

- Multi-photo items and background removal for cleaner thumbnails
- Weather-aware suggestions
- Outfit history / "worn recently" tracking to encourage rotation
- Cloud sync (backend + auth) so the closet isn't tied to one browser
