# Running Energy DB locally

Double-click `Start-Energy-DB.command` to start the app, then open http://127.0.0.1:5173. Keep its Terminal window open. Press Control-C there to stop it.

The app is tracked in the vpetsev/Energy-DB Git repository.

Requires Node.js 22. Run `npm ci` and `npm start` in client/. The macOS launcher uses Node from your PATH, with a fallback to the runtime in this Codex workspace's work directory. That runtime and the npm cache are local setup files and are not versioned.

Repairs include Vite in place of the old Create React App tooling, explicit map dependencies, a token-free CARTO/MapLibre basemap, working category filtering and colors, immutable category state, and valid category bars. The app continues to display a 2,500-well subset of the bundled historical Houston data; the subset is randomly sampled across the full dataset on each reload, matching the Surge app. No live well data is fetched. Map styles and tiles require internet access.

Build: `npm run build` in client/. Output: client/dist/.

Comparison with https://energy-db.surge.sh/ confirmed all 98,554 bundled records are identical. Three seeded runs produced identical sets of 2,500 wells, coordinates, colors, categories, and counts. The map once again spans the full viewport behind the sidebar, matching Surge's placement. The CARTO basemap remains visually different from Surge's Mapbox basemap.
