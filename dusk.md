---
dusk: v1alpha1
namespace: stout
kind: repository
name: wtc-the-game
title: WTC The Game
attributes:
  visibility: public
  language: javascript
  framework: create-react-app
---

A text-based browser walk through the original World Trade Center, built to explain the towers' vertical transit system.
You pick a tower, land on a floor, and see that floor's real tenant directory, a historical fact, and the ways out: stairs to the floor above and below, and each elevator bank that actually served that floor, listing only the floors that bank actually reached.
The landing page calls it a "game" in quotes, and that is the right expectation.
There is no state, score, objective or win condition, and every move is a plain anchor and a full page load.
Read it as a finished hyperlinked exhibit rather than an unfinished game: all seven routes are implemented and the data is complete for both towers.

Two halves.
The repository root is a Python data pipeline: `tower_1.html` and `tower_2.html` are saved Wikipedia floor tables, `tower_generator.py` parses them with BeautifulSoup into `tower_N.json` (113 floors each, tenant names carrying their Wikipedia links), `tower_N_facts.py` and `common_facts.py` supply the per-floor facts, and `floor_to_elevator.json` with `elevator_map_generator.py` describes the elevator zones, banks and sky-lobby shuttles.
`wtc-the-game/` is the Create React App front end, with its seven routes declared in `src/index.js`: the landing page, the map hub, a directory per tower, the elevator map, and the floor view.

Historical accuracy lives in the generator rather than the UI.
Floor 110 of Tower 1 was radio antennas and is reachable only by stairs, while Tower 2's was the observation deck served by an express shuttle.

## Gotchas

**The generated JSON exists twice and nothing keeps the copies in sync.** `tower_generator.py` writes `tower_N.json` and `elevator_map.json` to the repository root, but the React app imports them from `wtc-the-game/src/data/`. They are byte-identical today only because somebody copied them across. Regenerating the data at the root changes nothing the app renders until you copy it.

**The only `README.md` is untouched Create React App boilerplate.** What this project is, and the TikTok post that prompted it, is written in `src/App.js` as landing page copy. There is no prose at the repository root at all.

**Three deployment paths have accumulated and only the newest is live.** `wrangler.jsonc` serves `wtc-the-game/build` as Cloudflare static assets. Before that, a GitHub Actions workflow built an arm64 image to GHCR and bumped an image tag in a separate GitOps repository, and `deployment.yaml` is a leftover manifest still carrying an `<IMAGE>` placeholder. The `Dockerfile` runs `npm start`, the development server, rather than serving a production build.
