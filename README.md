# Math Game

A game-show-style ESL math classroom web app.

## GitHub Pages

This project is ready for GitHub Pages. Push it to a GitHub repository named `aev-math-game`, then enable Pages with **GitHub Actions** as the source.

The live URL will look like:

`https://YOUR-USERNAME.github.io/aev-math-game/`

## Offline Use

After opening the GitHub Pages site once with internet, the app caches the main files, music, and victory sound using `service-worker.js`.

For offline class use:

1. Open the website once while online.
2. Wait for the page to fully load.
3. Keep the same browser/device.
4. The app should open again without internet from the cached version.

If you update the app later, open it online once again so the browser can cache the new version.
