/**
 * Restrained literary & botanical SVG ornaments for TIMEFOLD.
 */

export function pressedRoseDivider() {
  return `
    <div class="botanical-divider" aria-hidden="true">
      <svg width="40" height="28" viewBox="0 0 40 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 25C20 19 20 13 20 9" stroke="#354A3B" stroke-width="1.2" stroke-linecap="round"/>
        <path d="M20 19C15.5 19 13 16 12 13C15.5 13 18.5 15 20 19Z" stroke="#354A3B" stroke-width="1.1" fill="rgba(53,74,59,0.14)"/>
        <path d="M20 16C24.5 16 27 13 28 10C24.5 10 21.5 12 20 16Z" stroke="#354A3B" stroke-width="1.1" fill="rgba(53,74,59,0.14)"/>
        <circle cx="20" cy="8" r="4.5" fill="rgba(112,45,59,0.18)" stroke="#702D3B" stroke-width="1.2"/>
        <path d="M18.2 7.5C19 5.8 21.2 5.8 21.8 7.6C22.4 9.2 20.4 10.5 19 9.6" stroke="#702D3B" stroke-width="1.1" stroke-linecap="round"/>
      </svg>
    </div>
  `;
}

export function waxSealSvg(size = 56) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M32 4C36.8 4 40.3 6.1 44.5 7.4C48.8 8.7 52.8 11.4 55.1 15.2C57.5 19.1 59.8 23.1 59.8 28C59.8 32.9 58.1 37.3 56.2 41.7C54.3 46.1 51.3 50.6 47.2 53.3C43.1 56 37.8 59.4 32 59.4C26.2 59.4 21.3 56.5 17 53.7C12.7 50.9 8.9 47.1 6.7 42.6C4.5 38.1 4.2 32.9 4.2 28C4.2 23.1 6.8 18.8 9.4 14.8C12 10.8 15.6 7.5 20.1 5.9C24.5 4.3 27.2 4 32 4Z" fill="#702D3B" stroke="#561F2B" stroke-width="1.5"/>
      <circle cx="32" cy="31.5" r="19" stroke="#B59A68" stroke-width="1.2" stroke-dasharray="2 2"/>
      <circle cx="32" cy="31.5" r="15.5" stroke="rgba(245,240,230,0.45)" stroke-width="1"/>
      <text x="32" y="36" text-anchor="middle" fill="#F5F0E6" font-family="Cormorant Garamond, Georgia, serif" font-size="14" font-weight="600" letter-spacing="1.5">TF</text>
    </svg>
  `;
}

export function sealedEnvelopeSvg() {
  return `
    <svg width="46" height="32" viewBox="0 0 46 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="1.5" y="1.5" width="43" height="29" rx="2" fill="#FBF8F1" stroke="#493629" stroke-opacity="0.35" stroke-width="1.2"/>
      <path d="M2 2.5L23 18.5L44 2.5" stroke="#493629" stroke-opacity="0.35" stroke-width="1.2"/>
      <circle cx="23" cy="17.5" r="4.5" fill="#702D3B"/>
      <circle cx="23" cy="17.5" r="2.2" stroke="#B59A68" stroke-width="0.9"/>
    </svg>
  `;
}
