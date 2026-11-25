import { escapeHtml } from "../utils/dom.js";
import { formatHumanDate } from "../services/capsuleStore.js";
import { waxSealSvg } from "./illustrations.js";

/**
 * Renders and opens the unfolded-letter modal for a released capsule.
 */
export function openLetterModal(capsule) {
  if (!capsule) return;

  // Remove any previous modal cleanly
  const existing = document.getElementById("letter-modal-root");
  if (existing) existing.remove();

  const modalRoot = document.createElement("div");
  modalRoot.id = "letter-modal-root";
  modalRoot.className = "modal-backdrop";
  modalRoot.setAttribute("role", "dialog");
  modalRoot.setAttribute("aria-modal", "true");
  modalRoot.setAttribute("aria-labelledby", "modal-letter-heading");

  const photoHtml = capsule.photoUrl
    ? `
      <figure class="modal-photo-frame">
        <img src="${escapeHtml(capsule.photoUrl)}" alt="Attached photograph from ${escapeHtml(capsule.author)}" />
        ${
          capsule.photoCaption
            ? `<figcaption class="modal-photo-caption">${escapeHtml(capsule.photoCaption)}</figcaption>`
            : ""
        }
      </figure>
    `
    : "";

  const visibilityLabel =
    capsule.visibility === "private" ? "Private Browser Keepsake" : "Public Archive";

  modalRoot.innerHTML = `
    <article class="letter-sheet-modal">
      <button type="button" class="modal-close-btn" id="close-letter-modal" aria-label="Close letter">
        Close &times;
      </button>

      <header class="modal-letter-header">
        <div>
          <p class="section-kicker" style="margin-bottom: 0.3rem;">
            ${escapeHtml(visibilityLabel)} &middot; Written ${escapeHtml(formatHumanDate(capsule.createdAt))}
          </p>
          <h2 id="modal-letter-heading" class="modal-letter-title">${escapeHtml(capsule.title)}</h2>
          <p class="muted-meta" style="margin: 0;">
            Addressed to: <em>${escapeHtml(capsule.recipient)}</em>
          </p>
        </div>

        <div class="date-stamp" aria-label="Released date">
          <span>Opened</span>
          <span>${escapeHtml(formatHumanDate(capsule.releaseDate))}</span>
        </div>
      </header>

      <div class="modal-letter-body">${escapeHtml(capsule.content)}</div>

      ${photoHtml}

      <footer class="modal-letter-signature">
        <div>
          <span class="muted-meta" style="display: block;">With warmth across time,</span>
          <span class="handwritten-note" style="font-size: 1.55rem;">${escapeHtml(capsule.author)}</span>
        </div>
        <div title="TIMEFOLD Seal">${waxSealSvg(44)}</div>
      </footer>
    </article>
  `;

  document.body.appendChild(modalRoot);
  document.body.style.overflow = "hidden";

  const closeModal = () => {
    modalRoot.remove();
    document.body.style.overflow = "";
    document.removeEventListener("keydown", onKeyDown);
  };

  const onKeyDown = (event) => {
    if (event.key === "Escape") closeModal();
  };

  document.addEventListener("keydown", onKeyDown);
  document.getElementById("close-letter-modal")?.addEventListener("click", closeModal);
  modalRoot.addEventListener("click", (event) => {
    if (event.target === modalRoot) closeModal();
  });
}
