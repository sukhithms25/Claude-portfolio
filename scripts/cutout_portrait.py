"""Extract portrait cutout from hero art — removes black + orange background."""
import cv2
import numpy as np
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "hero-portrait-art.png"
OUT = ROOT / "public" / "hero-portrait-cutout.png"

img_bgr = cv2.imread(str(SRC), cv2.IMREAD_COLOR)
if img_bgr is None:
    raise SystemExit(f"Cannot read {SRC}")

h, w = img_bgr.shape[:2]
hsv = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2HSV)
gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)

# Background: pure black + orange paint stroke
orange = cv2.inRange(hsv, np.array([3, 70, 60]), np.array([30, 255, 255]))
black = gray < 28
bg = cv2.bitwise_or(orange, black.astype(np.uint8) * 255)

# GrabCut refinement — rect covers subject (right-center)
rect = (int(w * 0.22), int(h * 0.02), int(w * 0.72), int(h * 0.96))
mask = np.zeros((h, w), np.uint8)
bgd = np.zeros((1, 65), np.float64)
fgd = np.zeros((1, 65), np.float64)
cv2.grabCut(img_bgr, mask, rect, bgd, fgd, 5, cv2.GC_INIT_WITH_RECT)
gc_mask = np.where((mask == 2) | (mask == 0), 0, 1).astype(np.uint8)

# Combine: foreground = NOT background AND grabCut says fg
person = ((bg == 0) & (gc_mask == 1)).astype(np.uint8) * 255

# Clean edges
kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
person = cv2.morphologyEx(person, cv2.MORPH_CLOSE, kernel, iterations=2)
person = cv2.morphologyEx(person, cv2.MORPH_OPEN, kernel, iterations=1)

# Soft alpha feather on edges
person_f = person.astype(np.float32) / 255.0
person_f = cv2.GaussianBlur(person_f, (7, 7), 0)
person_f = np.clip(person_f * 1.05, 0, 1)

# Crop tight bounding box + padding
coords = cv2.findNonZero((person_f > 0.15).astype(np.uint8))
x, y, bw, bh = cv2.boundingRect(coords)
pad = int(max(bw, bh) * 0.04)
x1 = max(0, x - pad)
y1 = max(0, y - pad)
x2 = min(w, x + bw + pad)
y2 = min(h, y + bh + pad)

crop_bgr = img_bgr[y1:y2, x1:x2]
crop_alpha = (person_f[y1:y2, x1:x2] * 255).astype(np.uint8)

bgra = cv2.cvtColor(crop_bgr, cv2.COLOR_BGR2BGRA)
bgra[:, :, 3] = crop_alpha

cv2.imwrite(str(OUT), bgra)
print(f"Saved {OUT} ({bgra.shape[1]}x{bgra.shape[0]})")
