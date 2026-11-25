import { escapeHtml } from "../utils/dom.js";
import {
  formatCountdown,
  formatHumanDate,
  getCapsuleById,
  getPrivateCapsules,
  getPublicLockedCapsules,
  isCapsuleReleased,
} from "../services/capsuleStore.js";
import { sealedEnvelopeSvg } from "../components/illustrations.js";
import { openLetterModal } from "../components/LetterModal.js";

function renderSealedEnvelopeCard(capsule, { isPrivate = false } = {}) {
  const released = isCapsuleReleased(capsule);
  const statusText = released ? "Unlocked (Private)" : "Sealed";
  const badgeClass = isPrivate ? "locked-badge is-private" : "locked-badge";

  // STRICT PRIVACY: Locked capsules never emit message content or photo URLs in HTML.
  const actionFooter =
    isPrivate && released
      ? `<button type="button" class="btn-text js-open-private" data-capsule-id="${escapeHtml(capsule.id)}">Open private keepsake &rarr;</button>`
      : `<span class="countdown-pill">${escapeHtml(formatCountdown(capsule.releaseDate))}</span>`;

  return `
    <article class="sealed-envelope-card">
      <div>
        <div class="envelope-flap-line" aria-hidden="true"></div>
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.75rem;">
          <span class="${badgeClass}">${escapeHtml(statusText)}</span>
          ${sealedEnvelopeSvg()}
        </div>

        <h2 class="sealed-envelope-title">${escapeHtml(capsule.title)}</h2>
        <p class="muted-meta" style="margin: 0;">
          Written by <strong>${escapeHtml(capsule.author)}</strong>
        </p>

        <div class="sealed-meta-list">
          <div>
            <span>Date created</span>
            <strong>${escapeHtml(formatHumanDate(capsule.createdAt))}</strong>
          </div>
          <div>
            <span>Unlock date</span>
            <strong>${escapeHtml(formatHumanDate(capsule.releaseDate))}</strong>
          </div>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.5rem;">
        ${actionFooter}
        ${
          !released
            ? `<span class="muted-meta" style="font-size: 0.8rem;">Contents hidden</span>`
            : ""
        }
      </div>
    </article>
  `;
}

export function renderLockedPage() {
  const lockedPublic = getPublicLockedCapsules();
  const privateCapsules = getPrivateCapsules();

  const publicSectionHtml =
    lockedPublic.length > 0
      ? `<div class="locked-grid">
          ${lockedPublic.map((c) => renderSealedEnvelopeCard(c)).join("")}
        </div>`
      : `
        <div class="empty-state">
          <h3>No sealed public envelopes right now</h3>
          <p>
            Every public capsule has already reached its unlock date.
            Seal a new letter to leave something waiting for tomorrow.
          </p>
          <a href="/create" data-link class="btn btn-primary">Write a Letter to the Future</a>
        </div>
      `;

  const privateSectionHtml =
    privateCapsules.length > 0
      ? `
        <section class="private-shelf" aria-labelledby="private-shelf-heading">
          <p class="section-kicker">Private Browser Keepsakes</p>
          <h2 id="private-shelf-heading" class="section-title">
            Your Private Capsules (${privateCapsules.length})
          </h2>
          <p class="muted-meta" style="max-width: 640px;">
            Private capsules never appear in the public Explore Archive.
            Those dated in the future remain sealed below until their unlock date arrives.
          </p>
          <div class="locked-grid">
            ${privateCapsules.map((c) => renderSealedEnvelopeCard(c, { isPrivate: true })).join("")}
          </div>
        </section>
      `
      : "";

  return `
    <div class="page-enter">
      <header class="page-header">
        <div class="container">
          <p class="section-kicker">Waiting for Tomorrow</p>
          <h1 class="page-title">Locked Capsules</h1>
          <p class="page-lead">
            Envelopes folded shut until their chosen future date.
            You may see who sealed them and when they open, never what lies inside.
          </p>
        </div>
      </header>

      <div class="container">
        ${publicSectionHtml}
        ${privateSectionHtml}
      </div>
    </div>
  `;
}

export function bindLockedPageEvents() {
  document.querySelectorAll(".js-open-private").forEach((btn) => {
    btn.addEventListener("click", () => {
      const capsule = getCapsuleById(btn.dataset.capsuleId);
      if (capsule && capsule.visibility === "private" && isCapsuleReleased(capsule)) {
        openLetterModal(capsule);
      }
    });
  });
}
