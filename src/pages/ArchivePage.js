import { escapeHtml } from "../utils/dom.js";
import {
  getCapsuleById,
  getPublicReleasedCapsules,
  getYearFromISO,
} from "../services/capsuleStore.js";
import { openLetterModal } from "../components/LetterModal.js";

let activeYearFilter = "all";
let yearMode = "released"; // "released" | "written"
let searchQuery = "";

export function renderArchivePage() {
  const releasedCapsules = getPublicReleasedCapsules();

  // Gather distinct years for the selected year mode
  const yearSet = new Set(
    releasedCapsules.map((c) =>
      yearMode === "written" ? getYearFromISO(c.createdAt) : getYearFromISO(c.releaseDate)
    )
  );
  const years = Array.from(yearSet).sort((a, b) => b.localeCompare(a));

  if (activeYearFilter !== "all" && !years.includes(activeYearFilter)) {
    activeYearFilter = "all";
  }

  const filtered = releasedCapsules.filter((c) => {
    const capsuleYear =
      yearMode === "written" ? getYearFromISO(c.createdAt) : getYearFromISO(c.releaseDate);
    const matchesYear = activeYearFilter === "all" || capsuleYear === activeYearFilter;

    if (!matchesYear) return false;
    if (!searchQuery.trim()) return true;

    const q = searchQuery.trim().toLowerCase();
    return (
      c.title.toLowerCase().includes(q) ||
      c.author.toLowerCase().includes(q) ||
      c.content.toLowerCase().includes(q)
    );
  });

  const yearButtons = [
    `<button type="button" class="filter-pill ${activeYearFilter === "all" ? "is-active" : ""}" data-year="all">All Years</button>`,
    ...years.map(
      (y) =>
        `<button type="button" class="filter-pill ${activeYearFilter === y ? "is-active" : ""}" data-year="${escapeHtml(y)}">${escapeHtml(y)}</button>`
    ),
  ].join("");

  const cardsHtml =
    filtered.length > 0
      ? `<div class="archive-grid">
          ${filtered
            .map((c) => {
              const yearWritten = getYearFromISO(c.createdAt);
              const yearReleased = getYearFromISO(c.releaseDate);
              return `
                <article class="letter-folio">
                  <div>
                    <div class="folio-meta-row">
                      <span class="folio-years">
                        Written ${escapeHtml(yearWritten)} &middot; Released ${escapeHtml(yearReleased)}
                      </span>
                      <span>${c.photoUrl ? "Photograph enclosed" : "Letter"}</span>
                    </div>
                    <h2 class="folio-title">${escapeHtml(c.title)}</h2>
                    <p class="folio-excerpt">${escapeHtml(c.content)}</p>
                  </div>

                  <div class="folio-footer">
                    <span class="folio-author">&mdash; ${escapeHtml(c.author)}</span>
                    <button
                      type="button"
                      class="btn-text js-archive-open"
                      data-capsule-id="${escapeHtml(c.id)}"
                    >
                      Open letter &rarr;
                    </button>
                  </div>
                </article>
              `;
            })
            .join("")}
        </div>`
      : `
        <div class="empty-state">
          <h3>No letters rest in this drawer</h3>
          <p>
            No released public capsules match your current year or keyword filter.
            Try viewing all years, or write a new letter for tomorrow.
          </p>
          <button type="button" class="btn btn-secondary" id="reset-archive-filters">
            Show All Released Letters
          </button>
        </div>
      `;

  return `
    <div class="page-enter">
      <header class="page-header">
        <div class="container">
          <p class="section-kicker">The Public Reading Room</p>
          <h1 class="page-title">Explore the Archive</h1>
          <p class="page-lead">
            Public letters whose chosen release dates have arrived.
            Browse slowly, as if pulling old envelopes from a library drawer.
          </p>
        </div>
      </header>

      <div class="container">
        <div class="archive-controls">
          <div>
            <div class="muted-meta" style="display: inline-flex; align-items: center; gap: 0.5rem; margin-bottom: 0.55rem;">
              <span>Filter by</span>
              <select id="archive-year-mode" class="form-select year-mode-select">
                <option value="released" ${yearMode === "released" ? "selected" : ""}>Year Released</option>
                <option value="written" ${yearMode === "written" ? "selected" : ""}>Year Written</option>
              </select>
            </div>
            <div class="year-filter-strip" role="group" aria-label="Filter letters by year">
              ${yearButtons}
            </div>
          </div>

          <div class="archive-search-row">
            <label for="archive-search-input" class="muted-meta" style="white-space: nowrap;">Search:</label>
            <input
              id="archive-search-input"
              type="search"
              class="form-input"
              style="width: 230px; padding: 0.48rem 0.75rem;"
              placeholder="Title, author, or word..."
              value="${escapeHtml(searchQuery)}"
            />
          </div>
        </div>

        <div id="archive-results-region">
          ${cardsHtml}
        </div>
      </div>
    </div>
  `;
}

export function bindArchivePageEvents(rerender) {
  document.querySelectorAll(".filter-pill[data-year]").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeYearFilter = btn.dataset.year || "all";
      rerender();
    });
  });

  document.getElementById("archive-year-mode")?.addEventListener("change", (e) => {
    yearMode = e.target.value;
    activeYearFilter = "all";
    rerender();
  });

  const searchInput = document.getElementById("archive-search-input");
  searchInput?.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    const cursorPos = e.target.selectionStart;
    rerender();
    const freshInput = document.getElementById("archive-search-input");
    if (freshInput) {
      freshInput.focus();
      freshInput.setSelectionRange(cursorPos, cursorPos);
    }
  });

  document.getElementById("reset-archive-filters")?.addEventListener("click", () => {
    activeYearFilter = "all";
    searchQuery = "";
    rerender();
  });

  document.querySelectorAll(".js-archive-open").forEach((btn) => {
    btn.addEventListener("click", () => {
      const capsule = getCapsuleById(btn.dataset.capsuleId);
      if (capsule && capsule.visibility === "public") {
        openLetterModal(capsule);
      }
    });
  });
}
