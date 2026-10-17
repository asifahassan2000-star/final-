# UCP Bahawalpur Campus - GitHub Pages & Deployment Guide

This guide explains how to deploy the **University of Central Punjab (UCP) Bahawalpur Campus** website to GitHub Pages without encountering blank white screens or routing issues.

---

## 1. Why Did a Blank White Screen Occur on GitHub Pages?

When deploying a modern React + Vite application to GitHub, there are two common causes for a blank white screen:

1. **Default Source Setting ("Deploy from a branch")**:
   - By default, GitHub Pages serves files directly from the root `/` of your `main` branch.
   - The root `index.html` contains `<script type="module" src="/src/main.tsx"></script>`.
   - Web browsers cannot execute uncompiled TypeScript (`.tsx`) files directly without a build step. Because the browser cannot run `main.tsx`, JavaScript halts before React can mount, leaving a blank white screen.

2. **Absolute vs. Relative Base Paths**:
   - GitHub Pages project sites are served under a subpath (e.g., `https://<username>.github.io/<repository-name>/`).
   - If asset paths are absolute (`/assets/index.js`), the browser looks at the root domain (`https://<username>.github.io/assets/index.js`) and gets a 404 error.
   - We configured `base: './'` in `vite.config.ts` so that all generated links and assets use relative paths.

---

## 2. The 1-Minute Fix: Switch GitHub Pages to "GitHub Actions"

This repository includes an automated GitHub Actions deployment workflow at `.github/workflows/deploy.yml`.

### Steps to activate:
1. Open your repository on GitHub.
2. Click on **Settings** (gear icon at the top navigation).
3. In the left sidebar, click on **Pages** (under the "Code and automation" section).
4. Under **Build and deployment**:
   - Find the dropdown labeled **Source**.
   - Change it from **"Deploy from a branch"** to **"GitHub Actions"**.
5. Once selected, GitHub will automatically trigger the workflow on your next push, or you can run it immediately:
   - Go to the **Actions** tab.
   - Click **Deploy to GitHub Pages** in the left menu.
   - Click **Run workflow** &rarr; select **main** &rarr; click **Run workflow**.

Your site will be built with `npm run build` and published live at:
`https://<username>.github.io/<repository-name>/`

---

## 3. Alternative: Deploy to a `gh-pages` Branch Manually

If you prefer deploying compiled files without GitHub Actions:

```bash
# 1. Install dependencies
npm install

# 2. Compile the production build into /dist
npm run build

# 3. Deploy the dist folder to the gh-pages branch
npx gh-pages -d dist
```

Then in **Settings > Pages**, set **Source** to **"Deploy from a branch"**, select the **`gh-pages`** branch and the **`/ (root)`** folder.

---

## 4. What is the `[vite] failed to connect to websocket` message?

When running in preview or sandbox iframe environments, Hot Module Replacement (HMR) WebSockets are intentionally disabled for security and proxy isolation. 

- This notice is **purely informational** in local/iframe development.
- It has **zero impact** on application functionality, compilation, or performance.
- It is completely absent from the production build (`npm run build`).
