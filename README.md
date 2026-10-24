# TripWise — Full-Stack Version
Frontend: HTML + CSS + JavaScript (`public/`). Backend: Node.js + Express REST API (`server/`).
Trips are saved in `data/trips.json` (a JSON file — this is file storage, not a database). Prices are illustrative samples.

## Run
1. Install Node.js (LTS) from nodejs.org.
2. Open a terminal in this folder and run: `npm install` then `npm start`
3. Open http://localhost:3000 (do NOT open index.html directly — the page needs the server).

## Structure
- `server/server.js` – Express server, validation, budget calculation, trips API
- `server/destinations.js` – predefined destination data and price multipliers
- `data/trips.json` – saved trips
- `public/index.html, styles.css, app.js` – frontend, which talks to the API with `fetch`

## API
GET /api/destinations · POST /api/estimate · GET /api/trips · POST /api/trips · PUT /api/trips/:id · DELETE /api/trips/:id

## Limits
No login (all visitors share one trips file), no real database, no live prices. Theme preference stays in the browser's localStorage.
