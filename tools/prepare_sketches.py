#!/usr/bin/env python3
"""Turn white-background pencil sketches into transparent PNGs that sit directly
on the site's paper background.

Process:  put a raw sketch (dark pencil on a plain white/near-white background)
in  sketches/<section-id>.png,  then run:

    python3 tools/prepare_sketches.py

Each sketch is converted so that darkness -> opacity: the paper drops out
completely, the graphite marks are kept and tinted with the site ink color, and
soft shading becomes partial opacity (so the real page paper shows through, just
like pencil on paper). Results are written to images/<section-id>.png, which is
what the site loads.

Pass filenames to convert only specific sketches:
    python3 tools/prepare_sketches.py sketches/foundations.png
"""

import os
import sys
from PIL import Image

# Ink color the marks are tinted with — matches the site's --ink so the sketch
# reads as part of the page rather than a foreign image.
INK = (34, 30, 26)

# Luminance at/above this is treated as pure paper and made fully transparent.
# Keeps the background perfectly clean instead of leaving a faint haze.
PAPER_CUTOFF = 246

# Sketches usually arrive with wide empty margins; those become dead vertical
# space on the page. Marks with alpha >= TRIM_THRESHOLD define the content box,
# which is then kept with TRIM_PADDING pixels of breathing room.
TRIM_THRESHOLD = 12
TRIM_PADDING = 16

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_DIR = os.path.join(ROOT, "sketches")
OUT_DIR = os.path.join(ROOT, "images")


def convert(src_path, out_path):
    gray = Image.open(src_path).convert("L")

    # Darkness -> alpha. White paper (255) -> 0 (transparent); black stroke
    # (0) -> 255 (opaque). Anything lighter than the paper cutoff is clamped to
    # fully transparent so the background is spotless.
    def to_alpha(p):
        if p >= PAPER_CUTOFF:
            return 0
        return 255 - p

    alpha = gray.point(to_alpha)

    out = Image.new("RGBA", gray.size, INK + (0,))
    out.putalpha(alpha)

    # Trim the empty margins so the image is only as tall as the drawing.
    bbox = alpha.point(lambda a: 255 if a >= TRIM_THRESHOLD else 0).getbbox()
    if bbox:
        left, top, right, bottom = bbox
        out = out.crop(
            (
                max(0, left - TRIM_PADDING),
                max(0, top - TRIM_PADDING),
                min(out.width, right + TRIM_PADDING),
                min(out.height, bottom + TRIM_PADDING),
            )
        )

    out.save(out_path)
    print(f"  {os.path.relpath(src_path, ROOT)} -> {os.path.relpath(out_path, ROOT)}")


def main():
    args = sys.argv[1:]
    if args:
        sources = [os.path.abspath(a) for a in args]
    else:
        if not os.path.isdir(SRC_DIR):
            sys.exit("No sketches/ folder found. Create it and add <section-id>.png files.")
        sources = [
            os.path.join(SRC_DIR, f)
            for f in sorted(os.listdir(SRC_DIR))
            if f.lower().endswith(".png")
        ]

    if not sources:
        sys.exit("No .png sketches to process.")

    os.makedirs(OUT_DIR, exist_ok=True)
    print("Preparing sketches:")
    for src in sources:
        name = os.path.basename(src)
        convert(src, os.path.join(OUT_DIR, name))
    print("Done.")


if __name__ == "__main__":
    main()
