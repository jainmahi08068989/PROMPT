# TIMEFOLD — Messages Across Generations

> **Today becomes history. Let the future hear our stories.**

TIMEFOLD is a digital time capsule web application where people living today can write letters, attach photographs, and seal memories until a chosen future date.

---

## How to Run Locally

This project requires **only Python 3** (no Node.js, `npm install`, or build step needed).

1. Open a terminal in this folder (`timefold/`).
2. Run:
   ```bash
   python server.py
   ```
3. Open your browser to:
   ```
   http://127.0.0.1:8000
   ```

---

## Project Structure

- `server.py` — Minimal Python standard-library HTTP server with SPA fallback so refreshing `/create`, `/archive`, `/locked`, or `/about` works cleanly.
- `index.html` — Root HTML document and typography setup.
- `styles/`
  - `tokens.css` — Colour palette, fonts, shadows, and subtle design tokens.
  - `main.css` — Shared layout, literary header, buttons, modal reading sheet, and footer.
  - `pages.css` — Page-specific styles for Home, Create, Archive, Locked Capsules, and About.
- `assets/` — Editorial photographs used on the Home, About, and sample letter views.
- `src/`
  - `main.js` — Client-side router and app shell.
  - `data/sampleCapsules.js` — Sample released and locked letters.
  - `services/capsuleStore.js` — `localStorage` persistence, date-based release/lock separation, and countdown formatting.
  - `components/` — Reusable UI modules (`Navbar.js`, `Footer.js`, `LetterModal.js`, `illustrations.js`).
  - `pages/` — Five main pages (`HomePage.js`, `CreatePage.js`, `ArchivePage.js`, `LockedPage.js`, `AboutPage.js`).
  - `utils/dom.js` — HTML escaping and image compression helpers.

---

## MVP Notes & Honest Limitations

- **Persistence:** Capsules are stored locally in the browser via `localStorage` under key `timefold_capsules_v1`.
- **Public vs. Private:** Private capsules are strictly excluded from *Explore the Archive*. Because this MVP has no remote backend or encryption, private capsules remain readable within the local browser storage of the device that created them, and clearing browser site data removes locally created capsules.
- **Future Delivery:** Long-term multi-decade preservation across devices would require a dedicated server database and scheduled delivery service.
