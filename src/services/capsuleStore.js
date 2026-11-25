import { SAMPLE_CAPSULES } from "../data/sampleCapsules.js";

const STORAGE_KEY = "timefold_capsules_v1";

/**
 * Returns local calendar date as YYYY-MM-DD so lock/unlock comparisons
 * match the user's current local day reliably.
 */
export function getTodayISODate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getTomorrowISODate() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const day = String(tomorrow.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function isCapsuleReleased(capsule, todayISO = getTodayISODate()) {
  return Boolean(capsule?.releaseDate) && capsule.releaseDate <= todayISO;
}

function loadRawCapsules() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_CAPSULES));
      return [...SAMPLE_CAPSULES];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_CAPSULES));
    return [...SAMPLE_CAPSULES];
  } catch {
    return [...SAMPLE_CAPSULES];
  }
}

function saveRawCapsules(capsules) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(capsules));
}

export function getAllCapsules() {
  return loadRawCapsules();
}

/**
 * Public Archive ONLY ever returns public capsules whose unlock date has arrived.
 * Private capsules are strictly excluded here.
 */
export function getPublicReleasedCapsules() {
  const today = getTodayISODate();
  return loadRawCapsules()
    .filter((c) => c.visibility === "public" && isCapsuleReleased(c, today))
    .sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));
}

/**
 * Public capsules whose unlock date is still in the future.
 * Callers must only display metadata (never content/photo) for locked capsules.
 */
export function getPublicLockedCapsules() {
  const today = getTodayISODate();
  return loadRawCapsules()
    .filter((c) => c.visibility === "public" && !isCapsuleReleased(c, today))
    .sort((a, b) => a.releaseDate.localeCompare(b.releaseDate));
}

/**
 * Private capsules stored locally in this browser.
 * Kept separate from the public archive at all times.
 */
export function getPrivateCapsules() {
  return loadRawCapsules()
    .filter((c) => c.visibility === "private")
    .sort((a, b) => a.releaseDate.localeCompare(b.releaseDate));
}

export function getCapsuleById(id) {
  return loadRawCapsules().find((c) => c.id === id) || null;
}

export function createCapsule({
  author,
  title,
  recipient,
  content,
  releaseDate,
  visibility,
  photoUrl = null,
  photoCaption = "",
}) {
  const createdAt = getTodayISODate();
  const cleanTitle = title.trim();
  const cleanAuthor = author.trim();
  const cleanRecipient = recipient.trim();
  const cleanContent = content.trim();

  if (!cleanAuthor || !cleanTitle || !cleanRecipient || !cleanContent) {
    throw new Error("Please complete all letter fields before sealing your capsule.");
  }

  if (!releaseDate || releaseDate <= createdAt) {
    throw new Error("Please choose a future unlock date after today.");
  }

  if (visibility !== "public" && visibility !== "private") {
    throw new Error("Please choose whether this capsule is Public or Private.");
  }

  const newCapsule = {
    id: `cap-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    author: cleanAuthor,
    title: cleanTitle,
    recipient: cleanRecipient,
    content: cleanContent,
    createdAt,
    releaseDate,
    visibility,
    photoUrl: photoUrl || null,
    photoCaption: photoCaption.trim(),
  };

  const existing = loadRawCapsules();
  const updated = [newCapsule, ...existing];

  try {
    saveRawCapsules(updated);
  } catch (err) {
    throw new Error(
      "Your browser storage is full. Try attaching a smaller photograph or saving without an image."
    );
  }

  return newCapsule;
}

export function resetDemoArchive() {
  saveRawCapsules(SAMPLE_CAPSULES);
}

export function formatHumanDate(isoDate) {
  if (!isoDate) return "";
  const [y, m, d] = isoDate.split("-").map(Number);
  const dateObj = new Date(y, (m || 1) - 1, d || 1);
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getYearFromISO(isoDate) {
  return isoDate ? isoDate.slice(0, 4) : "";
}

export function formatCountdown(releaseDateISO, todayISO = getTodayISODate()) {
  if (!releaseDateISO || releaseDateISO <= todayISO) {
    return "Ready to open";
  }

  const [ty, tm, td] = todayISO.split("-").map(Number);
  const [ry, rm, rd] = releaseDateISO.split("-").map(Number);

  const start = new Date(ty, tm - 1, td);
  const end = new Date(ry, rm - 1, rd);
  const diffDays = Math.round((end - start) / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "Opens tomorrow";
  if (diffDays < 31) return `${diffDays} days remaining`;

  const years = Math.floor(diffDays / 365);
  const remainingDays = diffDays % 365;
  const months = Math.floor(remainingDays / 30);

  if (years >= 1) {
    const yearLabel = years === 1 ? "1 year" : `${years} years`;
    const monthLabel = months > 0 ? `, ${months} mo` : "";
    return `${yearLabel}${monthLabel} remaining`;
  }

  const monthWord = months === 1 ? "1 month" : `${months} months`;
  return `${monthWord} remaining`;
}
