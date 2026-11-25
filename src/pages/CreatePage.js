import { compressImageFile, escapeHtml } from "../utils/dom.js";
import {
  createCapsule,
  formatHumanDate,
  getTodayISODate,
  getTomorrowISODate,
} from "../services/capsuleStore.js";
import { waxSealSvg } from "../components/illustrations.js";

export function renderCreatePage() {
  const todayISO = getTodayISODate();
  const minReleaseISO = getTomorrowISODate();

  return `
    <div class="page-enter">
      <header class="page-header">
        <div class="container">
          <p class="section-kicker">The Writing Desk</p>
          <h1 class="page-title">Create a Time Capsule</h1>
          <p class="page-lead">
            Take a quiet moment. Write to someone you love, to your future self,
            or to a stranger who will live long after today.
          </p>
        </div>
      </header>

      <div class="container">
        <div id="create-workspace" class="create-layout">
          <!-- Main Stationery Writing Sheet -->
          <form id="capsule-form" class="stationery-sheet" novalidate>
            <div class="stationery-top-bar">
              <div>
                <span class="handwritten-note" style="font-size: 1.4rem;">
                  Stationery Sheet &middot; TIMEFOLD Archive
                </span>
                <span class="muted-meta" style="display: block;">
                  Created automatically on ${escapeHtml(formatHumanDate(todayISO))}
                </span>
              </div>

              <div class="date-stamp" aria-label="Creation date stamp">
                <span>Stamped</span>
                <span>${escapeHtml(todayISO)}</span>
              </div>
            </div>

            <div id="form-error-box" class="form-error-banner" hidden></div>

            <div class="form-row-two">
              <div class="form-field">
                <label class="form-label" for="author-input">Your Name *</label>
                <input
                  id="author-input"
                  name="author"
                  type="text"
                  class="form-input"
                  placeholder="e.g. Mira Sharma"
                  maxlength="80"
                  required
                />
              </div>

              <div class="form-field">
                <label class="form-label" for="recipient-input">Recipient or Future Audience *</label>
                <input
                  id="recipient-input"
                  name="recipient"
                  type="text"
                  class="form-input"
                  placeholder="e.g. Readers in 2050"
                  maxlength="100"
                  required
                />
              </div>
            </div>

            <div class="form-field">
              <label class="form-label" for="title-input">Letter Title *</label>
              <input
                id="title-input"
                name="title"
                type="text"
                class="form-input"
                placeholder="Give this memory a title you would recognize years from now"
                maxlength="120"
                required
              />
            </div>

            <div class="form-field">
              <label class="form-label" for="content-input">Your Letter *</label>
              <textarea
                id="content-input"
                name="content"
                class="form-textarea form-textarea-letter"
                placeholder="Begin wherever today finds you. What does the room look like? What song have you been playing? What do you hope tomorrow holds?"
                required
              ></textarea>
              <div class="letter-word-count">
                <span class="handwritten-note" style="font-size: 1.15rem; color: var(--ink-muted);">
                  Write freely &mdash; ordinary details age best.
                </span>
                <span id="word-count-label" class="muted-meta">0 words</span>
              </div>
            </div>

            <div class="form-row-two">
              <div class="form-field">
                <label class="form-label" for="created-date-display">Creation Date</label>
                <input
                  id="created-date-display"
                  type="text"
                  class="form-input"
                  value="${escapeHtml(formatHumanDate(todayISO))}"
                  readonly
                  aria-readonly="true"
                />
                <span class="form-hint">Recorded automatically today.</span>
              </div>

              <div class="form-field">
                <label class="form-label" for="release-date-input">Future Release Date *</label>
                <input
                  id="release-date-input"
                  name="releaseDate"
                  type="date"
                  class="form-input"
                  min="${escapeHtml(minReleaseISO)}"
                  value="2035-01-01"
                  required
                />
                <span class="form-hint">Sealed until this date arrives.</span>
              </div>
            </div>

            <div class="form-field">
              <span class="form-label">Capsule Visibility *</span>
              <div class="visibility-options">
                <label class="visibility-choice is-selected" id="vis-label-public">
                  <input type="radio" name="visibility" value="public" checked />
                  <span>
                    <span class="visibility-title">Public Archive</span>
                    <span class="visibility-desc">
                      Appears in Locked Capsules until its unlock date, then joins Explore the Archive.
                    </span>
                  </span>
                </label>

                <label class="visibility-choice" id="vis-label-private">
                  <input type="radio" name="visibility" value="private" />
                  <span>
                    <span class="visibility-title">Private Keepsake</span>
                    <span class="visibility-desc">
                      Never shown in the public Archive. Stored only inside this browser&rsquo;s local storage.
                    </span>
                  </span>
                </label>
              </div>
            </div>

            <div class="form-field">
              <label class="form-label" for="photo-input">Optional Photograph Attachment</label>
              <div class="photo-upload-box">
                <input
                  id="photo-input"
                  type="file"
                  accept="image/*"
                  class="form-input"
                  style="padding: 0.45rem;"
                />
                <span class="form-hint">
                  Attach a photograph from today (automatically resized to fit browser storage).
                </span>

                <div id="photo-preview-container" class="photo-preview-row" hidden>
                  <img id="photo-preview-img" class="photo-preview-thumb" alt="Uploaded preview" />
                  <div style="flex: 1;">
                    <input
                      id="photo-caption-input"
                      type="text"
                      class="form-input"
                      placeholder="Optional caption on the back of the photo..."
                      maxlength="90"
                    />
                    <button
                      type="button"
                      id="remove-photo-btn"
                      class="btn-text"
                      style="margin-top: 0.45rem;"
                    >
                      Remove photograph
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem; margin-top: 1.75rem; padding-top: 1.25rem; border-top: 1px solid var(--border-delicate);">
              <span class="muted-meta">Sealed with a wax mark until your chosen date.</span>
              <button type="submit" class="btn btn-primary" id="seal-submit-btn">
                Seal My Capsule
              </button>
            </div>
          </form>

          <!-- Quiet Desk Margin Prompts -->
          <aside class="desk-aside">
            <div style="display: flex; align-items: center; gap: 0.85rem;">
              ${waxSealSvg(44)}
              <span class="handwritten-note" style="font-size: 1.25rem;">A few prompts if the page feels too blank</span>
            </div>

            <h3>What the future rarely hears</h3>
            <ul>
              <li>What the weather feels like right outside your window tonight.</li>
              <li>A song, book, or film that feels like your life this season.</li>
              <li>Something small that made you laugh recently.</li>
              <li>One worry you carry today, and one quiet hope for tomorrow.</li>
              <li>The taste of your favourite drink or home-cooked meal.</li>
            </ul>

            <p class="muted-meta" style="margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid var(--border-delicate);">
              <strong>Honest MVP Note:</strong> Capsules are saved in your current browser&rsquo;s
              <code>localStorage</code>. Private capsules are excluded from the public archive,
              but client-side storage is not encrypted or synced across devices.
            </p>
          </aside>
        </div>

        <!-- Confirmation Container (Shown After Sealing) -->
        <div id="sealed-confirmation-root" hidden></div>
      </div>
    </div>
  `;
}

export function bindCreatePageEvents({ onCapsuleCreated }) {
  const form = document.getElementById("capsule-form");
  if (!form) return;

  const contentInput = document.getElementById("content-input");
  const wordCountLabel = document.getElementById("word-count-label");
  const errorBox = document.getElementById("form-error-box");
  const photoInput = document.getElementById("photo-input");
  const photoPreviewContainer = document.getElementById("photo-preview-container");
  const photoPreviewImg = document.getElementById("photo-preview-img");
  const photoCaptionInput = document.getElementById("photo-caption-input");
  const removePhotoBtn = document.getElementById("remove-photo-btn");
  const workspace = document.getElementById("create-workspace");
  const confirmationRoot = document.getElementById("sealed-confirmation-root");

  let attachedPhotoDataUrl = null;

  // Live word counter
  contentInput?.addEventListener("input", () => {
    const words = contentInput.value.trim().split(/\s+/).filter(Boolean).length;
    wordCountLabel.textContent = words === 1 ? "1 word" : `${words} words`;
  });

  // Visibility radio visual state
  form.querySelectorAll('input[name="visibility"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      document
        .getElementById("vis-label-public")
        ?.classList.toggle("is-selected", radio.value === "public" && radio.checked);
      document
        .getElementById("vis-label-private")
        ?.classList.toggle("is-selected", radio.value === "private" && radio.checked);
    });
  });

  // Image attachment + canvas compression
  photoInput?.addEventListener("change", async () => {
    const file = photoInput.files?.[0];
    if (!file) return;

    errorBox.hidden = true;
    try {
      attachedPhotoDataUrl = await compressImageFile(file);
      photoPreviewImg.src = attachedPhotoDataUrl;
      photoPreviewContainer.hidden = false;
    } catch (err) {
      attachedPhotoDataUrl = null;
      photoInput.value = "";
      photoPreviewContainer.hidden = true;
      errorBox.textContent = err.message;
      errorBox.hidden = false;
    }
  });

  removePhotoBtn?.addEventListener("click", () => {
    attachedPhotoDataUrl = null;
    photoInput.value = "";
    photoCaptionInput.value = "";
    photoPreviewContainer.hidden = true;
  });

  // Submit & Seal
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    errorBox.hidden = true;

    const formData = new FormData(form);
    try {
      const saved = createCapsule({
        author: String(formData.get("author") || ""),
        title: String(formData.get("title") || ""),
        recipient: String(formData.get("recipient") || ""),
        content: String(formData.get("content") || ""),
        releaseDate: String(formData.get("releaseDate") || ""),
        visibility: String(formData.get("visibility") || "public"),
        photoUrl: attachedPhotoDataUrl,
        photoCaption: photoCaptionInput?.value || "",
      });

      if (onCapsuleCreated) onCapsuleCreated();

      workspace.hidden = true;
      confirmationRoot.hidden = false;
      confirmationRoot.innerHTML = `
        <section class="sealed-confirmation" aria-live="polite">
          <div style="display: inline-block; filter: drop-shadow(0 4px 10px rgba(86,31,43,0.25));">
            ${waxSealSvg(74)}
          </div>
          <h2>Your words have been folded into time.</h2>
          <p class="muted-meta" style="max-width: 460px; margin: 0 auto; font-size: 1rem;">
            The envelope has been stamped and placed safely away until its chosen date arrives.
          </p>

          <div class="sealed-summary-box">
            <p style="margin: 0 0 0.45rem;"><strong>Title:</strong> ${escapeHtml(saved.title)}</p>
            <p style="margin: 0 0 0.45rem;"><strong>Written by:</strong> ${escapeHtml(saved.author)}</p>
            <p style="margin: 0 0 0.45rem;"><strong>Unlocks on:</strong> ${escapeHtml(formatHumanDate(saved.releaseDate))}</p>
            <p style="margin: 0;">
              <strong>Visibility:</strong>
              ${
                saved.visibility === "private"
                  ? "Private Keepsake (stored locally, hidden from the public archive)"
                  : "Public Archive (visible under Locked Capsules until release date)"
              }
            </p>
          </div>

          <div class="hero-actions" style="justify-content: center;">
            <a href="/locked" data-link class="btn btn-primary">
              View in Locked Capsules
            </a>
            <button type="button" id="write-another-btn" class="btn btn-secondary">
              Write Another Letter
            </button>
          </div>
        </section>
      `;

      document.getElementById("write-another-btn")?.addEventListener("click", () => {
        form.reset();
        attachedPhotoDataUrl = null;
        photoPreviewContainer.hidden = true;
        wordCountLabel.textContent = "0 words";
        document.getElementById("vis-label-public")?.classList.add("is-selected");
        document.getElementById("vis-label-private")?.classList.remove("is-selected");
        confirmationRoot.hidden = true;
        workspace.hidden = false;
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      errorBox.textContent = err.message;
      errorBox.hidden = false;
      errorBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });
}
