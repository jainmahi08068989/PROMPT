import { escapeHtml } from "../utils/dom.js";
import {
  formatHumanDate,
  getCapsuleById,
  getPublicReleasedCapsules,
  getYearFromISO,
} from "../services/capsuleStore.js";
import { pressedRoseDivider } from "../components/illustrations.js";
import { openLetterModal } from "../components/LetterModal.js";

export function renderHomePage() {
  const featured = getPublicReleasedCapsules().slice(0, 4);

  const featuredCards = featured
    .map((capsule) => {
      const yearWritten = getYearFromISO(capsule.createdAt);
      const yearReleased = getYearFromISO(capsule.releaseDate);
      return `
        <article class="letter-folio">
          <div>
            <div class="folio-meta-row">
              <span class="folio-years">Written ${escapeHtml(yearWritten)} &middot; Opened ${escapeHtml(yearReleased)}</span>
              <span>${capsule.photoUrl ? "Includes photograph" : "Handwritten letter"}</span>
            </div>
            <h3 class="folio-title">${escapeHtml(capsule.title)}</h3>
            <p class="folio-excerpt">${escapeHtml(capsule.content)}</p>
          </div>
          <div class="folio-footer">
            <span class="folio-author">&mdash; ${escapeHtml(capsule.author)}</span>
            <button
              type="button"
              class="btn-text js-open-letter"
              data-capsule-id="${escapeHtml(capsule.id)}"
            >
              Read letter &rarr;
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  return `
    <div class="page-enter">
      <!-- Literary Opening Hero -->
      <section class="hero-section">
        <div class="container hero-journal-frame">
          <div>
            <div class="hero-eyebrow">
              <span>Digital Time Capsule &middot; Est. Today</span>
            </div>

            <h1 class="hero-heading">
              Today becomes history. Let the future hear our stories.
            </h1>

            <div class="hero-prose">
              <p>Somewhere in the future, someone might wonder what it was like to be us.</p>
              <p>
                What we dreamed about, what made us laugh, what songs we played on repeat,
                the people we loved, and what we hoped the world would become.
              </p>
              <p>Perhaps they will never know our names.</p>
              <p>But they can still know our stories.</p>
              <p>So, let&rsquo;s leave a little piece of today for tomorrow.</p>
            </div>

            <div class="hero-actions">
              <a href="/create" data-link class="btn btn-primary">
                Write a Letter to the Future
              </a>
              <a href="/archive" data-link class="btn btn-secondary">
                Explore the Archive
              </a>
            </div>
          </div>

          <div class="hero-visual-wrapper">
            <figure class="hero-photo-mat" style="margin: 0;">
              <img
                src="/assets/hero-library-desk.jpg"
                alt="A quiet walnut desk beside a rain-streaked autumn window with a brass lamp, pressed burgundy rose in an open book, teacup, and unsealed letter"
              />
              <figcaption class="hero-margin-note">
                <span class="handwritten-note">For a rainy afternoon, years from now.</span>
                <span class="muted-meta">Reading Room Desk</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <!-- How TIMEFOLD Works -->
      <section class="how-section" aria-labelledby="how-heading">
        <div class="container">
          <div class="section-intro">
            <p class="section-kicker">How TIMEFOLD Works</p>
            <h2 id="how-heading" class="section-title">
              Three quiet steps from this evening to a distant tomorrow
            </h2>
          </div>

          <div class="steps-triptych">
            <div class="step-entry">
              <div class="step-roman">I.</div>
              <h3>Write what feels ordinary</h3>
              <p>
                Describe the weather outside your window, the song stuck in your head,
                a friend&rsquo;s joke, or what you hope life looks like years from now.
              </p>
            </div>

            <div class="step-entry">
              <div class="step-roman">II.</div>
              <h3>Choose a date &amp; fold the seal</h3>
              <p>
                Pick the future day your capsule may open. Keep it as a private keepsake
                or offer it to the public reading room once time catches up.
              </p>
            </div>

            <div class="step-entry">
              <div class="step-roman">III.</div>
              <h3>Wait for time to unlock it</h3>
              <p>
                Until that date arrives, the envelope stays sealed. When the day finally
                comes, your words join the living archive of human days.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Letters -->
      <section class="featured-letters-section" aria-labelledby="featured-heading">
        <div class="container">
          <div class="section-header-row">
            <div>
              <p class="section-kicker">Opened Capsules</p>
              <h2 id="featured-heading" class="section-title">A Few Letters Through Time</h2>
            </div>
            <a href="/archive" data-link class="btn-text">Browse the full archive &rarr;</a>
          </div>

          <div class="letters-ledger">
            ${featuredCards}
          </div>
        </div>
      </section>

      ${pressedRoseDivider()}

      <!-- Why Preserving Everyday Memories Matters -->
      <section class="essay-band" aria-labelledby="why-heading">
        <div class="container">
          <div class="essay-paper">
            <p class="section-kicker">Why Everyday Memories Matter</p>
            <h2 id="why-heading" class="section-title">
              History remembers monuments. Letters remember how it felt to be alive.
            </h2>

            <div class="essay-columns">
              <div>
                <p>
                  Centuries from now, textbooks will have plenty of dates, treaties,
                  and headlines. What almost always vanishes is the texture of an ordinary
                  Tuesday: the tea cooling beside a notebook, the smell of wet autumn leaves,
                  or the quiet courage it took to start over in a new city.
                </p>
              </div>
              <div>
                <p>
                  When you preserve a small story today, you build a bridge across decades
                  for someone you may never meet. Maybe it is your future self, a grandchild,
                  or a stranger sitting in a library on a rainy evening wondering if people
                  in 2026 felt the same quiet hopes they do.
                </p>
              </div>
            </div>
          </div>

          <div class="closing-invitation">
            <blockquote>
              &ldquo;What if someone from the future could have a conversation with someone
              from our time, even if they never got the chance to meet?&rdquo;
            </blockquote>
            <a href="/create" data-link class="btn btn-forest">
              Open a Blank Sheet &amp; Begin
            </a>
          </div>
        </div>
      </section>
    </div>
  `;
}

export function bindHomePageEvents() {
  document.querySelectorAll(".js-open-letter").forEach((btn) => {
    btn.addEventListener("click", () => {
      const capsule = getCapsuleById(btn.dataset.capsuleId);
      if (capsule) openLetterModal(capsule);
    });
  });
}
