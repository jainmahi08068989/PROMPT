export function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <p class="footer-brand">TIMEFOLD</p>
            <p class="footer-tagline">Today becomes history. Let the future hear our stories.</p>
            <p class="muted-meta">
              A quiet digital reading room built to keep ordinary human memories warm across the years.
            </p>
          </div>

          <div>
            <p class="footer-heading">Reading Room</p>
            <ul class="footer-nav">
              <li><a href="/" data-link>Home</a></li>
              <li><a href="/create" data-link>Create a Capsule</a></li>
              <li><a href="/archive" data-link>Explore the Archive</a></li>
              <li><a href="/locked" data-link>Locked Capsules</a></li>
              <li><a href="/about" data-link>About TIMEFOLD</a></li>
            </ul>
          </div>

          <div>
            <p class="footer-heading">Archival Note</p>
            <p class="muted-meta" style="margin: 0;">
              This MVP preserves capsules locally in your browser via <code>localStorage</code>.
              Private capsules are excluded from the public archive.
              See <a href="/about" data-link style="text-decoration: underline;">About TIMEFOLD</a> for limitations.
            </p>
          </div>
        </div>

        <div class="footer-bottom">
          <span>TIMEFOLD &middot; Messages Across Generations</span>
          <span class="handwritten-note" style="font-size: 1.15rem;">Folded gently for tomorrow.</span>
        </div>
      </div>
    </footer>
  `;
}
