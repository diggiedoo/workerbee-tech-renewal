#!/usr/bin/env python3
"""Serve the WorkerBee static site on a local network."""

import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--host",
        default="0.0.0.0",
        help="interface to listen on (default: 0.0.0.0 for LAN access)",
    )
    parser.add_argument(
        "--port", type=int, default=8000, help="TCP port to serve on (default: 8000)"
    )
    args = parser.parse_args()

    handler = partial(SimpleHTTPRequestHandler, directory=str(Path(__file__).resolve().parent))
    server = ThreadingHTTPServer((args.host, args.port), handler)
    print(f"Serving WorkerBee at http://{args.host}:{args.port}")
    print("Press Ctrl+C to stop.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping WorkerBee server.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
