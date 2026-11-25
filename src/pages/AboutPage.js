import { pressedRoseDivider } from "../components/illustrations.js";
import { resetDemoArchive } from "../services/capsuleStore.js";

export function renderAboutPage() {
  return `
    <div class="page-enter">
      <header class="page-header">
        <div class="container">
          <p class="section-kicker">The Idea Behind TIMEFOLD</p>
          <h1 class="page-title">About TIMEFOLD</h1>
          <p class="page-lead">
            An unhurried corner of the internet dedicated to keeping ordinary human days alive.
          </p>
        </div>
      </header>

      <div class="container about-layout">
        <div class="about-story-grid">
          <div class="about-prose">
            <p>
              History is not only made of kings, wars, treaties, and dates printed in bold.
              It is also made of ordinary people: the late-night tea on a wooden desk, the books
              we lent to friends with pressed flowers still tucked inside, the music we played
              on trains, and the small hopes we carried into uncertain years.
            </p>
            <p>
              When decades pass, monuments remain while everyday voices vanish.
              TIMEFOLD begins with a simple question:
              <em>
                &ldquo;What if someone from the future could have a conversation with someone
                from our time, even if they never got the chance to meet?&rdquo;
              </em>
            </p>
            <p>
              By sealing a letter today for a chosen tomorrow, you give your own memories—or a
              future stranger&rsquo;s afternoon—a quiet bridge across time. No feeds, no noisy
              algorithms, no haste. Only words folded gently and opened when the calendar catches up.
            </p>
          </div>

          <figure class="about-photo-card" style="margin: 0;">
            <img
              src="/assets/about-archive-shelf.jpg"
              alt="Wooden reading room shelves with leather-bound books, linen-tied envelopes, brass magnifying glass, and dried autumn leaves"
            />
            <figcaption class="hero-margin-note">
              <span class="handwritten-note">Every ordinary day deserves a shelf.</span>
            </figcaption>
          </figure>
        </div>

        ${pressedRoseDivider()}

        <section class="mvp-notes-box" aria-labelledby="mvp-heading">
          <p class="section-kicker">Transparency &amp; Architecture</p>
          <h3 id="mvp-heading">How This Working MVP Works (and Its Honest Limitations)</h3>
          <p>
            This MVP runs locally with a zero-dependency Python web server and modular browser
            JavaScript. Capsules and attached photographs are stored in your browser&rsquo;s
            <code>localStorage</code> so your letters remain available after refreshing the page.
          </p>
          <ul style="color: var(--ink-walnut); padding-left: 1.25rem;">
            <li>
              <strong>Automatic Release Separation:</strong> Capsules with an unlock date on or
              before today appear in <em>Explore the Archive</em> (if public). Future-dated capsules
              stay sealed in <em>Locked Capsules</em> with their contents hidden.
            </li>
            <li>
              <strong>Private Capsule Rule:</strong> Capsules marked <em>Private</em> never appear
              in the public archive.
            </li>
            <li>
              <strong>Honest Storage Limitation:</strong> Because this initial MVP uses frontend-only
              <code>localStorage</code> rather than an encrypted remote vault, private capsules are
              not cryptographically secured against anyone using this same browser profile, and clearing
              browser data will remove locally created capsules. Long-term multi-decade delivery would
              require a dedicated backend archive and email/identity infrastructure.
            </li>
          </ul>

          <div style="margin-top: 1.25rem; display: flex; flex-wrap: wrap; align-items: center; gap: 1rem;">
            <button type="button" id="restore-demo-btn" class="btn btn-secondary">
              Restore Default Sample Capsules
            </button>
            <span id="restore-status-msg" class="muted-meta" role="status"></span>
          </div>
        </section>
      </div>
    </div>
  `;
}

export function bindAboutPageEvents({ onDataChanged }) {
  const btn = document.getElementById("restore-demo-btn");
  const statusMsg = document.getElementById("restore-status-msg");
  btn?.addEventListener("click", () => {
    resetDemoArchive();
    if (onDataChanged) onDataChanged();
    if (statusMsg) {
      statusMsg.textContent = "Default sample capsules restored.";
    }
  });
}
