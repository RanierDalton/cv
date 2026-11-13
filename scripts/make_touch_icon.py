"""Gera public/apple-touch-icon.png (180x180) no estilo do site: papel + monograma em serifa."""
import sys
from PIL import Image, ImageDraw, ImageFont

out = sys.argv[1] if len(sys.argv) > 1 else "public/apple-touch-icon.png"
S = 180
im = Image.new("RGB", (S, S), "#f5f2ec")
d = ImageDraw.Draw(im)
f = ImageFont.truetype("C:/Windows/Fonts/georgia.ttf", 112)
w = d.textlength("R", font=f)
d.text(((S - w) / 2 - 12, 18), "R", font=f, fill="#171512")
d.ellipse((118, 112, 138, 132), fill="#0b5cad")
im.save(out, optimize=True)
print(out)
