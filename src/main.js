import { bindNavbarEvents, renderNavbar } from "./components/Navbar.js";
import { renderFooter } from "./components/Footer.js";
import { bindHomePageEvents, renderHomePage } from "./pages/HomePage.js";
import { bindCreatePageEvents, renderCreatePage } from "./pages/CreatePage.js";
import { bindArchivePageEvents, renderArchivePage } from "./pages/ArchivePage.js";
import { bindLockedPageEvents, renderLockedPage } from "./pages/LockedPage.js";
import { bindAboutPageEvents, renderAboutPage } from "./pages/AboutPage.js";

const ROUTES = {
  "/": {
    title: "TIMEFOLD — Today becomes history. Let the future hear our stories.",
    render: renderHomePage,
    bind: () => bindHomePageEvents(),
  },
  "/create": {
    title: "Write a Letter — TIMEFOLD",
    render: renderCreatePage,
    bind: (ctx) => bindCreatePageEvents({ onCapsuleCreated: ctx.refreshShell }),
  },
  "/archive": {
    title: "Explore the Archive — TIMEFOLD",
    render: renderArchivePage,
    bind: (ctx) => bindArchivePageEvents(ctx.rerenderPage),
  },
  "/locked": {
    title: "Locked Capsules — TIMEFOLD",
    render: renderLockedPage,
    bind: () => bindLockedPageEvents(),
  },
  "/about": {
    title: "About TIMEFOLD — Messages Across Generations",
    render: renderAboutPage,
    bind: (ctx) => bindAboutPageEvents({ onDataChanged: ctx.refreshShell }),
  },
};

function normalizePath(pathname) {
  if (!pathname || pathname === "/index.html") return "/";
  const trimmed = pathname.replace(/\/+$/, "") || "/";
  return ROUTES[trimmed] ? trimmed : "/";
}

function getCurrentPath() {
  return normalizePath(window.location.pathname);
}

export function navigateTo(path) {
  const target = normalizePath(path);
  if (window.location.pathname !== target) {
    window.history.pushState({}, "", target);
  }
  renderApp();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderApp() {
  const appRoot = document.getElementById("app");
  if (!appRoot) return;

  const currentPath = getCurrentPath();
  const route = ROUTES[currentPath] || ROUTES["/"];
  document.title = route.title;

  appRoot.innerHTML = `
    ${renderNavbar(currentPath)}
    <main class="main-content" id="page-root">
      ${route.render()}
    </main>
    ${renderFooter()}
  `;

  bindNavbarEvents();

  const ctx = {
    rerenderPage: () => renderApp(),
    refreshShell: () => {
      // Re-render header badges immediately without disrupting current confirmation view
      const headerRoot = document.querySelector(".site-header");
      const temp = document.createElement("div");
      temp.innerHTML = renderNavbar(getCurrentPath());
      const newHeader = temp.querySelector(".site-header");
      if (headerRoot && newHeader) {
        headerRoot.replaceWith(newHeader);
        bindNavbarEvents();
      }
    },
  };

  route.bind(ctx);
}

// Intercept internal [data-link] navigation cleanly across the entire app
document.addEventListener("click", (event) => {
  const anchor = event.target.closest("a[data-link]");
  if (!anchor) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  const href = anchor.getAttribute("href");
  if (href && href.startsWith("/")) {
    event.preventDefault();
    navigateTo(href);
  }
});

window.addEventListener("popstate", () => {
  renderApp();
});

renderApp();
