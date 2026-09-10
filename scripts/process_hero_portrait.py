"""Process hero portrait: remove LET'S TALK, strip black bg, warm-grade for cream blend."""
import cv2
import numpy as np
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ASSETS = Path(
    r"C:\Users\sukhi\.cursor\projects\e-BUILD-Claude-portfolio\assets"
    r"\c__Users_sukhi_AppData_Roaming_Cursor_User_workspaceStorage_30c9cae5b79b1ce2b47886075027d637_images_76761598105-78079185-996b-4b07-96ef-d6c904e8bde0.png"
)
SRC = ROOT / "public" / "hero-portrait-source.png"
OUT = ROOT / "public" / "hero-portrait-layer.png"

# Copy latest asset if present
if ASSETS.exists():
    SRC.write_bytes(ASSETS.read_bytes())

img_bgr = cv2.imread(str(SRC), cv2.IMREAD_COLOR)
if img_bgr is None:
    raise SystemExit(f"Cannot read {SRC}")

h, w = img_bgr.shape[:2]
hsv = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2HSV)
gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)

# --- Remove LET'S TALK button (top-right orange pill only) ---
btn_mask = np.zeros((h, w), np.uint8)
btn_roi = img_bgr[0 : int(h * 0.12), int(w * 0.80) :]
btn_hsv = cv2.cvtColor(btn_roi, cv2.COLOR_BGR2HSV)
btn_orange = cv2.inRange(btn_hsv, np.array([3, 80, 80]), np.array([25, 255, 255]))
btn_mask[0 : int(h * 0.12), int(w * 0.80) :] = btn_orange
# Fill button with surrounding black
btn_coords = btn_mask > 0
if btn_coords.any():
    fill = np.median(img_bgr[gray < 20], axis=0).astype(np.uint8)
    img_bgr[btn_coords] = fill

hsv = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2HSV)
gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)
sat = hsv[:, :, 1]

# --- Alpha: transparent = pure black left void ---
# Keep orange strokes, cream brush, and subject
black_void = (gray < 22) & (sat < 45)

# GrabCut for subject refinement on right side
rect = (int(w * 0.18), int(h * 0.02), int(w * 0.80), int(h * 0.96))
gc_mask = np.zeros((h, w), np.uint8)
bgd = np.zeros((1, 65), np.float64)
fgd = np.zeros((1, 65), np.float64)
cv2.grabCut(img_bgr, gc_mask, rect, bgd, fgd, 6, cv2.GC_INIT_WITH_RECT)
fg = np.where((gc_mask == 2) | (gc_mask == 0), 0, 1).astype(np.uint8)

# Foreground = subject OR colored graphics (orange/cream)
orange = cv2.inRange(hsv, np.array([3, 55, 50]), np.array([32, 255, 255]))
cream = cv2.inRange(hsv, np.array([0, 0, 160]), np.array([35, 80, 255]))
graphics = cv2.bitwise_or(orange, cream)

alpha = np.where(black_void & (fg == 0) & (graphics == 0), 0, 255).astype(np.uint8)

# Clean + feather alpha
kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
alpha = cv2.morphologyEx(alpha, cv2.MORPH_CLOSE, kernel, iterations=1)
alpha_f = cv2.GaussianBlur(alpha.astype(np.float32), (9, 9), 0) / 255.0

# Left-edge soft fade into cream background
x_grid = np.linspace(0, 1, w, dtype=np.float32)
fade = np.clip((x_grid - 0.02) / 0.38, 0, 1)  # fade black edge 0–40% width
fade = fade ** 1.4
alpha_f *= fade[np.newaxis, :]

# --- Warm color grade to match cream hero (#E8E4DC) + orange accent ---
bgr_f = img_bgr.astype(np.float32)
# Lift shadows slightly, add warmth on subject midtones
warm = bgr_f.copy()
warm[:, :, 2] = np.clip(warm[:, :, 2] * 1.04 + 6, 0, 255)   # R
warm[:, :, 1] = np.clip(warm[:, :, 1] * 1.02 + 3, 0, 255)   # G
warm[:, :, 0] = np.clip(warm[:, :, 0] * 0.96, 0, 255)       # B
img_bgr = warm.astype(np.uint8)

# Crop empty transparent margins
a_u8 = (alpha_f * 255).astype(np.uint8)
coords = cv2.findNonZero(a_u8)
if coords is not None:
    cx, cy, cw, ch = cv2.boundingRect(coords)
    pad = int(max(cw, ch) * 0.02)
    cx1 = max(0, cx - pad)
    cy1 = max(0, cy - pad)
    cx2 = min(w, cx + cw + pad)
    cy2 = min(h, cy + ch + pad)
    img_bgr = img_bgr[cy1:cy2, cx1:cx2]
    alpha_f = alpha_f[cy1:cy2, cx1:cx2]

bgra = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2BGRA)
bgra[:, :, 3] = (np.clip(alpha_f, 0, 1) * 255).astype(np.uint8)

cv2.imwrite(str(OUT), bgra)
print(f"Saved {OUT} ({bgra.shape[1]}x{bgra.shape[0]})")
