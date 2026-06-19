# Détourage + amélioration + nettoyage des contours (100% local).
from PIL import Image, ImageEnhance, ImageFilter
from rembg import remove, new_session

SRC = r"C:\Users\User\Pictures\Camera Roll\WIN_20241022_16_54_57_Pro.jpg"
OUT = r"C:\Users\User\jeromeibiza-poker\public\jerome-cutout.png"

img = Image.open(SRC).convert("RGB")
print("source:", img.size)

# Amélioration naturelle (subtile).
img = ImageEnhance.Brightness(img).enhance(1.05)
img = ImageEnhance.Contrast(img).enhance(1.08)
img = ImageEnhance.Color(img).enhance(1.07)
img = ImageEnhance.Sharpness(img).enhance(1.25)

# Détourage (segmentation humaine).
session = new_session("u2net_human_seg")
out = remove(img, session=session).convert("RGBA")

# --- Nettoyage du contour pour supprimer le halo/flou ---
r, g, b, a = out.split()
# 1) Tuer le voile semi-transparent (la "frange" lumineuse autour des mains/cheveux).
a = a.point(lambda v: 0 if v < 55 else v)
# 2) Eroder le bord d'env. 2px pour rentrer sous la frange et la rim-light des cheveux.
a = a.filter(ImageFilter.MinFilter(5))
# 3) Anti-aliasing leger pour un bord net mais pas cranté.
a = a.filter(ImageFilter.GaussianBlur(0.6))
# 4) Re-durcir legerement le bord (evite un contour trop mou).
a = a.point(lambda v: 0 if v < 45 else (255 if v > 205 else v))
out = Image.merge("RGBA", (r, g, b, a))

# Rognage sur le sujet + petite marge.
bbox = out.getbbox()
if bbox:
    pad = 10
    l, t, rr, bb = bbox
    l = max(0, l - pad); t = max(0, t - pad)
    rr = min(out.width, rr + pad); bb = min(out.height, bb + pad)
    out = out.crop((l, t, rr, bb))

# Optimisation web (largeur max 1100).
maxw = 1100
if out.width > maxw:
    h = round(out.height * maxw / out.width)
    out = out.resize((maxw, h), Image.LANCZOS)

out.save(OUT, optimize=True)
print("saved:", OUT, out.size)
