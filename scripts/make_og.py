import sys
from PIL import Image, ImageDraw, ImageFont
out = sys.argv[1]
F = "C:/Windows/Fonts/"
W, H = 1200, 630
bg, ink, muted, faint, blue, line = "#f5f2ec", "#171512", "#5c564c", "#7a7266", "#0b5cad", "#d9d2c5"
im = Image.new("RGB", (W, H), bg); d = ImageDraw.Draw(im)
mono = ImageFont.truetype(F + "consola.ttf", 24)
name = ImageFont.truetype(F + "georgia.ttf", 64)
head = ImageFont.truetype(F + "georgia.ttf", 54)
headi = ImageFont.truetype(F + "georgiai.ttf", 54)
stat = ImageFont.truetype(F + "georgia.ttf", 44)
x = 80
d.text((x, 70), "— Consultor técnico SAP · São Paulo", font=mono, fill=faint)
d.text((x, 120), "Ranier Dalton do Couto", font=name, fill=muted)
y = 215
d.text((x, y), "Sistemas, integrações e", font=head, fill=ink)
y += 68
w = d.textlength("agentes de IA", font=headi)
d.text((x, y), "agentes de IA", font=headi, fill=blue)
d.text((x + w + 16, y), "que resolvem", font=head, fill=ink)
y += 68
d.text((x, y), "processos reais.", font=head, fill=ink)
d.line((x, 470, W - 80, 470), fill=line, width=2)
cx = x
for v, lab in [("6×", "SAP Certified"), ("3×", "OCI Certified"), ("4", "clientes"), ("C1", "inglês")]:
    d.text((cx, 495), v, font=stat, fill=ink)
    d.text((cx, 552), lab, font=mono, fill=faint)
    cx += 260
d.text((W - 80 - d.textlength("ranier.is-a.dev", font=mono), 70), "ranier.is-a.dev", font=mono, fill=blue)
im.save(out, optimize=True)
print(out, im.size)
