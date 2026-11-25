import {
  getPublicLockedCapsules,
  getPublicReleasedCapsules,
} from "../services/capsuleStore.js";

const NAV_ITEMS = [
  { path: "/", label: "Home" },
  { path: "/create", label: "Write a Letter" },
  { path: "/archive", label: "Explore Archive", countKey: "released" },
  { path: "/locked", label: "Locked Capsules", countKey: "locked" },
  { path: "/about", label: "About" },
];

export function renderNavbar(currentPath) {
  const counts = {
    released: getPublicReleasedCapsules().length,
    locked: getPublicLockedCapsules().length,
  };

  const linksHtml = NAV_ITEMS.map((item) => {
    const activeClass = currentPath === item.path ? "is-active" : "";
    const countBadge =
      item.countKey !== undefined
        ? `<span class="nav-count">${counts[item.countKey]}</span>`
        : "";
    return `
      <li>
        <a href="${item.path}" data-link class="nav-link ${activeClass}">
          <span>${item.label}</span>
          ${countBadge}
        </a>
      </li>
    `;
  }).join("");

  return `
    <div class="woven-ribbon" aria-hidden="true"></div>
    <header class="site-header">
      <div class="container header-inner">
        <a href="/" data-link class="brand-mark" aria-label="TIMEFOLD Home">
          <span class="brand-wordmark">TIMEFOLD</span>
          <span class="brand-subtitle">Messages Across Generations</span>
        </a>

        <button
          type="button"
          class="mobile-menu-btn"
          id="mobile-menu-toggle"
          aria-expanded="false"
          aria-controls="primary-nav"
        >
          Menu
        </button>

        <nav id="primary-nav" class="site-nav" aria-label="Main navigation">
          <ul class="nav-links">
            ${linksHtml}
          </ul>
        </nav>
      </div>
    </header>
  `;
}

export function bindNavbarEvents() {
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const nav = document.getElementById("primary-nav");
  if (!toggleBtn || !nav) return;

  toggleBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
    toggleBtn.textContent = isOpen ? "Close" : "Menu";
  });
}
