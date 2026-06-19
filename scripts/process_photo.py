# Détourage + amélioration légère de la photo de Jérôme (100% local).
from PIL import Image, ImageEnhance
from rembg import remove, new_session

SRC = r"C:\Users\User\Pictures\Camera Roll\WIN_20241022_16_54_57_Pro.jpg"
OUT = r"C:\Users\User\jeromeibiza-poker\public\jerome-cutout.png"

img = Image.open(SRC).convert("RGB")
print("source:", img.size)

# Amélioration naturelle (subtile, on ne dénature pas).
img = ImageEnhance.Brightness(img).enhance(1.05)
img = ImageEnhance.Contrast(img).enhance(1.08)
img = ImageEnhance.Color(img).enhance(1.07)
img = ImageEnhance.Sharpness(img).enhance(1.25)

# Détourage avec le modèle de segmentation humaine.
session = new_session("u2net_human_seg")
out = remove(img, session=session)  # RGBA avec fond transparent

# Rognage sur le sujet (bounding box de l'alpha) + petite marge.
bbox = out.getbbox()
if bbox:
    pad = 12
    l, t, r, b = bbox
    l = max(0, l - pad); t = max(0, t - pad)
    r = min(out.width, r + pad); b = min(out.height, b + pad)
    out = out.crop((l, t, r, b))

out.save(OUT)
print("saved:", OUT, out.size)
