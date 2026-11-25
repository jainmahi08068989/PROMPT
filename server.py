"""
TIMEFOLD — Minimal Local Development Server

Uses only Python's built-in standard library (no npm or external packages required).
Serves static assets and falls back to index.html for client-side routes
(/, /create, /archive, /locked, /about) so refreshing any page works cleanly.
"""

from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import mimetypes
import sys

ROOT_DIR = Path(__file__).resolve().parent
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000

# Ensure modern web MIME types are registered reliably on Windows
mimetypes.add_type("application/javascript", ".js")
mimetypes.add_type("text/css", ".css")
mimetypes.add_type("image/svg+xml", ".svg")
mimetypes.add_type("image/png", ".png")
mimetypes.add_type("image/jpeg", ".jpg")


class TimefoldHandler(SimpleHTTPRequestHandler):
    """Serves static files and delegates unknown non-file paths to index.html."""

    def end_headers(self):
        # Avoid stale cached modules during local development
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_GET(self):
        request_path = self.path.split("?", 1)[0].split("#", 1)[0]
        candidate = (ROOT_DIR / request_path.lstrip("/")).resolve()

        # Prevent path traversal outside ROOT_DIR
        if not str(candidate).startswith(str(ROOT_DIR)):
            self.send_error(403, "Forbidden")
            return

        if request_path == "/" or candidate.is_file():
            super().do_GET()
            return

        # Serve index.html for clean SPA routes like /create, /archive, /locked, /about
        if "." not in Path(request_path).name:
            self.path = "/index.html"
            super().do_GET()
            return

        self.send_error(404, "File not found")


def main():
    handler = partial(TimefoldHandler, directory=str(ROOT_DIR))
    server = ThreadingHTTPServer(("127.0.0.1", PORT), handler)
    print(f"TIMEFOLD is open at http://127.0.0.1:{PORT}")
    print("Press Ctrl+C to close the reading room.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nClosing TIMEFOLD server.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
