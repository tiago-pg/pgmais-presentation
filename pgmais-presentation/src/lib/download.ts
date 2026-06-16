import { ServiceConfig } from "./types";

export async function downloadAs(format: "pdf" | "jpg" | "png", config: ServiceConfig) {
  const html2canvas = (await import("html2canvas")).default;
  const jsPDFMod = await import("jspdf");
  const { jsPDF } = jsPDFMod;

  const actionButtons = document.getElementById("action-buttons");
  if (actionButtons) actionButtons.style.visibility = "hidden";
  document.body.style.cursor = "wait";

  const target = document.getElementById("page-wrapper");
  if (!target) {
    document.body.style.cursor = "";
    return;
  }

  const soEl = target.querySelector(".sistema-origem") as HTMLElement | null;
  let soDataUrl: string | null = null;
  if (soEl) {
    soDataUrl = renderSistemaOrigem(soEl);
  }

  try {
    const canvas = await html2canvas(target, {
      useCORS: false,
      allowTaint: false,
      backgroundColor: "#ffffff",
      logging: false,
      imageTimeout: 0,
      scale: 1,
      onclone: (clonedDoc: Document) => {
        if (soDataUrl) {
          const so = clonedDoc.querySelector(".sistema-origem");
          if (so) {
            const img = clonedDoc.createElement("img");
            img.src = soDataUrl;
            img.style.cssText = `width:${soEl!.offsetWidth}px;height:${soEl!.offsetHeight}px;border-radius:22px;flex-shrink:0;display:block;`;
            so.parentNode!.replaceChild(img, so);
          }
        }
        const ab = clonedDoc.getElementById("action-buttons");
        if (ab) ab.style.display = "none";
      },
    });

    const fname = config.filename;

    if (format === "png") {
      const link = document.createElement("a");
      link.download = `${fname}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } else if (format === "jpg") {
      const link = document.createElement("a");
      link.download = `${fname}.jpg`;
      link.href = canvas.toDataURL("image/jpeg", 0.92);
      link.click();
    } else if (format === "pdf") {
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(canvas.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, canvas.width, canvas.height);
      pdf.save(`${fname}.pdf`);
    }
  } catch (err) {
    console.error("Download error:", err);
    alert("Erro ao gerar o arquivo: " + (err as Error).message);
  } finally {
    if (actionButtons) actionButtons.style.visibility = "";
    document.body.style.cursor = "";
  }
}

function renderSistemaOrigem(soEl: HTMLElement): string {
  const w = soEl.offsetWidth;
  const h = soEl.offsetHeight;
  const radius = 22;

  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;

  const bgColor = soEl.style.backgroundColor || "#172c66";
  ctx.fillStyle = bgColor;
  roundRect(ctx, 0, 0, w, h, radius);
  ctx.fill();

  if (soEl.classList.contains("tem-logo")) {
    const logoImg = soEl.querySelector(".logo-cliente-so") as HTMLImageElement | null;
    if (logoImg && logoImg.complete && logoImg.naturalWidth > 0) {
      const pad = 20;
      const maxW = h - pad;
      const maxH = w - pad;
      const scale = Math.min(maxW / logoImg.naturalWidth, maxH / logoImg.naturalHeight);
      const iw = logoImg.naturalWidth * scale;
      const ih = logoImg.naturalHeight * scale;
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.drawImage(logoImg, -iw / 2, -ih / 2, iw, ih);
      ctx.restore();
    }
  } else {
    const text = soEl.textContent?.trim().toUpperCase() || "";
    ctx.save();
    ctx.translate(w / 2, h / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = "#ffffff";
    ctx.font = "700 18px Lato, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const letterSpacing = 5;
    const letters = text.split("");
    const widths = letters.map(l => ctx.measureText(l).width);
    const totalW = widths.reduce((a, b) => a + b, 0) + letterSpacing * (letters.length - 1);
    let curX = -totalW / 2;
    for (let i = 0; i < letters.length; i++) {
      ctx.fillText(letters[i], curX + widths[i] / 2, 0);
      curX += widths[i] + letterSpacing;
    }
    ctx.restore();
  }

  return c.toDataURL();
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(w - r, y);
  ctx.arcTo(w, y, w, y + r, r);
  ctx.lineTo(w, h - r);
  ctx.arcTo(w, h, w - r, h, r);
  ctx.lineTo(r, h);
  ctx.arcTo(0, h, 0, h - r, r);
  ctx.lineTo(0, r);
  ctx.arcTo(0, 0, r, 0, r);
  ctx.closePath();
}
