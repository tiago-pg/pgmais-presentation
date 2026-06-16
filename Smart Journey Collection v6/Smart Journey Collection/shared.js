/* ════════════════════════════════════════════════════
   shared.js — Lógica compartilhada PGMais
   v2.0 — Arquitetura multi-serviço

   Requer (definidos no HTML antes deste script):
     • SERVICE_CONFIG  — objeto de configuração do serviço
     • blockServices   — mapeamento bloco → [ids de serviços filhos]

   SERVICE_CONFIG = {
     name:       string,   // "Smart Journey Collection"
     filename:   string,   // "Smart-Journey-Collection" (para download)
     storageKey: string,   // chave do sessionStorage
     columns:    string[], // IDs de colunas com auto-hide (pode ser [])
     tagline: {
       palavras:  string[],
       destaques: Set<string>
     }
   }
   ════════════════════════════════════════════════════ */

/* ── ESTADO ── */
const history = [];

/* ── CATÁLOGO DE SERVIÇOS (para o switcher) ── */
const SERVICES_ALL = [
  { name: "Smart Journey Collection", html: "smart-journey.html",    key: "sjc_triagem" },
  { name: "Gestão de Acordo",         html: "gestao-acordo.html",    key: "ga_triagem"  },
  { name: "Gestão de Fatura",         html: "gestao-fatura.html",    key: "gf_triagem"  },
  { name: "Jornada de Cobrança",      html: "jornada-cobranca.html", key: "jc_triagem"  },
];

/* ── NOMES AMIGÁVEIS DOS BLOCOS (menu "Blocos" — restaurar removidos) ── */
const BLOCK_NAMES = {
  "block-pg-contact":  "PG Contact",
  "block-one":         "O.N.E.",
  "block-channels":    "PGChannels",
  "block-files":       "PGFiles",
  "block-ia":          "Inteligência Artificial Conversacional",
  "block-receptivo":   "Receptivo Multicanal",
  "block-atendimento": "Atendimento",
  "block-portal-auto": "Portal de Autonegociação",
  "block-portal-ga":   "Portal de Autonegociação",
  "block-insights":    "pg+ Insights",
};

/* ════════════════════════════════════════════════════
   REMOÇÃO DE SERVIÇOS E BLOCOS
   ════════════════════════════════════════════════════ */

function removeService(id) {
  const el = document.getElementById(id);
  if (!el || el.classList.contains("hidden")) return;
  history.push({ type: "service", id });
  el.classList.add("hidden");
  updateState();
}

function removeBlock(id) {
  const el = document.getElementById(id);
  if (!el || el.classList.contains("hidden")) return;
  const children = (blockServices[id] || []).filter(
    (sid) => !document.getElementById(sid)?.classList.contains("hidden")
  );
  history.push({ type: "block", id, children });
  el.classList.add("hidden");
  updateState();
}

function undo() {
  if (history.length === 0) return;
  const last = history.pop();
  const el = document.getElementById(last.id);
  if (el) el.classList.remove("hidden");
  (last.children || []).forEach((sid) =>
    document.getElementById(sid)?.classList.remove("hidden")
  );
  updateState();
}

function resetAll() {
  document.querySelectorAll(".hidden").forEach((el) => el.classList.remove("hidden"));
  history.length = 0;
  updateState();
}

function updateState() {
  const btnUndo = document.getElementById("btn-undo");
  if (btnUndo) btnUndo.disabled = history.length === 0;

  /* Auto-colapso: quando todos os serviços de um bloco são removidos */
  Object.entries(blockServices).forEach(([blockId, serviceIds]) => {
    const block = document.getElementById(blockId);
    if (!block || block.classList.contains("hidden")) return;
    const allHidden = serviceIds.every((sid) => {
      const s = document.getElementById(sid);
      return !s || s.classList.contains("hidden");
    });
    if (allHidden) {
      history.push({ type: "block", id: blockId, children: [], auto: true });
      block.classList.add("hidden");
    }
  });

  /* Auto-colapso de colunas vazias (configurável por serviço) */
  const cols = SERVICE_CONFIG.columns || [];
  cols.forEach((colId) => {
    const col = document.getElementById(colId);
    if (!col) return;
    const hasVisible = Array.from(col.querySelectorAll(".card")).some(
      (c) => !c.classList.contains("hidden")
    );
    col.classList.toggle("col-empty", !hasVisible);
  });

  _updateAddButtons();
  _updateBlocosButton();
}

/* ════════════════════════════════════════════════════
   RESTORE — botão "+" para recolocar serviços
   ════════════════════════════════════════════════════ */

function closeAllAddMenus() {
  document.querySelectorAll(".svc-add-btn.open").forEach(btn => btn.classList.remove("open"));
}

function restoreService(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove("hidden");

  /* Remove da pilha de histórico */
  for (let i = history.length - 1; i >= 0; i--) {
    if (history[i].id === id && history[i].type === "service") { history.splice(i, 1); break; }
  }

  /* Restaura o bloco pai se tiver sido auto-colapsado */
  for (const [blockId, services] of Object.entries(blockServices)) {
    if (!services.includes(id)) continue;
    const block = document.getElementById(blockId);
    if (block && block.classList.contains("hidden")) {
      block.classList.remove("hidden");
      for (let i = history.length - 1; i >= 0; i--) {
        if (history[i].id === blockId) { history.splice(i, 1); break; }
      }
    }
    break;
  }

  closeAllAddMenus();
  updateState();
}

function _populateAddMenu(addBtn, serviceIds) {
  const menu = addBtn.querySelector(".svc-add-menu");
  menu.innerHTML = "";
  serviceIds
    .filter(id => document.getElementById(id)?.classList.contains("hidden"))
    .forEach(id => {
      const orig = document.getElementById(id);
      const img  = orig?.querySelector("img");
      if (!img) return;
      const item = document.createElement("div");
      item.className = "svc-add-menu-item";
      const i = document.createElement("img");
      if (orig.closest(".card-gradient")) {
        /* Ícone desenhado em branco para o card escuro: no menu claro usa a
           variante azul (mesmo gradiente claro→escuro dos demais ícones).
           Fallback: se a variante não existir, recolore via filtro CSS. */
        i.src = img.src.replace(/\.svg($|\?)/i, "-blue.svg$1");
        i.onerror = () => {
          i.onerror = null;
          i.src = img.src;
          item.classList.add("svc-add-menu-item--on-gradient");
        };
      } else {
        i.src = img.src;
      }
      i.alt = img.alt;
      item.appendChild(i);
      item.addEventListener("click", e => { e.stopPropagation(); restoreService(id); });
      menu.appendChild(item);
    });
  menu.classList.toggle("svc-add-menu--multi", menu.children.length >= 3);
}

function _initBlockDeleteHover() {
  document.querySelectorAll('[onclick*="removeBlock"]').forEach(title => {
    const match = title.getAttribute('onclick').match(/removeBlock\('([^']+)'\)/);
    if (!match) return;
    const blockId = match[1];
    const blockEl = document.getElementById(blockId);
    if (!blockEl) return;

    title.addEventListener('mouseenter', () => blockEl.classList.add('block-deleting'));
    blockEl.addEventListener('mouseleave', () => blockEl.classList.remove('block-deleting'));
    blockEl.addEventListener('click', e => {
      if (blockEl.classList.contains('block-deleting')) {
        e.stopPropagation();
        removeBlock(blockId);
      }
    });
  });
}

function _initAddButtons() {
  if (typeof blockServices === "undefined") return;
  Object.entries(blockServices).forEach(([blockId, serviceIds]) => {
    if (!serviceIds.length) return;
    const firstSvc = document.getElementById(serviceIds[0]);
    if (!firstSvc) return;
    const grid = firstSvc.parentElement;
    if (!grid) return;

    const addBtn = document.createElement("div");
    addBtn.className = "service-item svc-add-btn";
    addBtn.dataset.blockId = blockId;

    const svgNS = "http://www.w3.org/2000/svg";
    const icon  = document.createElementNS(svgNS, "svg");
    icon.setAttribute("viewBox", "0 0 200 200");
    icon.setAttribute("class", "svc-add-icon");
    icon.setAttribute("fill", "currentColor");
    const p1 = document.createElementNS(svgNS, "path");
    p1.setAttribute("d", "M124.89,90.54c-7.94,0-14.4-6.46-14.4-14.4v-27.49h-19.52v41.89h-41.89v19.52h27.49c7.94,0,14.4,6.46,14.4,14.4v27.49h19.52v-41.89h41.89v-19.52h-27.49Z");
    const p2 = document.createElementNS(svgNS, "path");
    p2.setAttribute("d", "M100,9.36C50.02,9.36,9.36,50.02,9.36,100s40.66,90.64,90.64,90.64,90.64-40.66,90.64-90.64S149.98,9.36,100,9.36ZM100,200C44.86,200,0,155.14,0,100S44.86,0,100,0s100,44.86,100,100-44.86,100-100,100Z");
    icon.appendChild(p1);
    icon.appendChild(p2);
    addBtn.appendChild(icon);

    const menu = document.createElement("div");
    menu.className = "svc-add-menu";
    addBtn.appendChild(menu);

    addBtn.addEventListener("click", e => {
      e.stopPropagation();
      const isOpen = addBtn.classList.contains("open");
      closeAllAddMenus();
      if (!isOpen) {
        _populateAddMenu(addBtn, serviceIds);
        addBtn.classList.add("open");
      }
    });

    grid.appendChild(addBtn);
  });

  document.addEventListener("click", closeAllAddMenus);
}

function _updateAddButtons() {
  if (typeof blockServices === "undefined") return;
  document.querySelectorAll(".svc-add-btn").forEach(addBtn => {
    const services = blockServices[addBtn.dataset.blockId] || [];
    const hasHidden = services.some(id => document.getElementById(id)?.classList.contains("hidden"));
    addBtn.classList.toggle("svc-add-btn--visible", hasHidden);
  });
}

/* ════════════════════════════════════════════════════
   RESTORE — menu "Blocos" para recolocar blocos removidos
   ════════════════════════════════════════════════════ */

/* IDs de todos os blocos que o usuário pode remover (têm ✕ → removeBlock) */
function _restorableBlockIds() {
  const ids = [];
  document.querySelectorAll('[onclick*="removeBlock("]').forEach(el => {
    const m = (el.getAttribute("onclick") || "").match(/removeBlock\(\s*['"]([^'"]+)['"]\s*\)/);
    if (m && !ids.includes(m[1])) ids.push(m[1]);
  });
  return ids;
}

function _hiddenBlockIds() {
  return _restorableBlockIds().filter(
    id => document.getElementById(id)?.classList.contains("hidden")
  );
}

/* Rótulo amigável de um bloco (mapa fixo + fallback derivado do título) */
function _blockLabel(id) {
  if (BLOCK_NAMES[id]) return BLOCK_NAMES[id];
  const el = document.getElementById(id);
  if (!el) return id;
  const title = el.querySelector(
    ".block-title, .ia-title, .rc-title, .ga-atend-titulo, .ga-portal-label"
  );
  const img = title?.querySelector("img");
  if (img?.alt) return img.alt;
  const txt = (title?.textContent || "").replace(/✕/g, " ").replace(/\s+/g, " ").trim();
  return txt || id;
}

function _popularMenuBlocos() {
  const menu = document.getElementById("blocos-menu");
  if (!menu) return;
  menu.innerHTML = "";
  const hidden = _hiddenBlockIds();
  if (!hidden.length) {
    const empty = document.createElement("div");
    empty.className   = "blocos-menu-empty";
    empty.textContent = "Nenhum bloco removido";
    menu.appendChild(empty);
    return;
  }
  hidden.forEach(id => {
    const btn = document.createElement("button");
    btn.textContent = _blockLabel(id);
    btn.addEventListener("click", e => { e.stopPropagation(); restoreBlock(id); });
    menu.appendChild(btn);
  });
}

function toggleBlocosMenu(event) {
  event.stopPropagation();
  _popularMenuBlocos();
  const menu = document.getElementById("blocos-menu");
  const btn  = document.getElementById("btn-blocos");
  const isOpen = menu.classList.toggle("open");
  btn.classList.toggle("active", isOpen);
}

function restoreBlock(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove("hidden");

  /* Bloco com serviços: se todos estavam ocultos (ex.: auto-colapso),
     traz os serviços de volta para não restaurar um bloco vazio. */
  const services = (typeof blockServices !== "undefined" && blockServices[id]) || [];
  const anyVisible = services.some(
    sid => !document.getElementById(sid)?.classList.contains("hidden")
  );
  if (services.length && !anyVisible) {
    services.forEach(sid => document.getElementById(sid)?.classList.remove("hidden"));
  }

  /* Remove o bloco da pilha de histórico (desfazer) */
  for (let i = history.length - 1; i >= 0; i--) {
    if (history[i].id === id && history[i].type === "block") { history.splice(i, 1); break; }
  }

  updateState();
  _popularMenuBlocos();
}

function _updateBlocosButton() {
  const btn = document.getElementById("btn-blocos");
  if (!btn) return;
  const hasHidden = _hiddenBlockIds().length > 0;
  btn.disabled = !hasHidden;
  if (!hasHidden) {
    document.getElementById("blocos-menu")?.classList.remove("open");
    btn.classList.remove("active");
  }
}

/* ════════════════════════════════════════════════════
   DROPDOWN DE DOWNLOAD
   ════════════════════════════════════════════════════ */

/* ── SERVICES SWITCHER ── */

function toggleServicosMenu(event) {
  event.stopPropagation();
  const menu = document.getElementById("servicos-menu");
  const btn  = document.getElementById("btn-servicos");
  const isOpen = menu.classList.toggle("open");
  btn.classList.toggle("active", isOpen);
}

function irParaServico(targetHtml, targetKey) {
  /* Copia os dados do serviço atual para o serviço de destino */
  const currentData = sessionStorage.getItem(SERVICE_CONFIG.storageKey);
  if (currentData) {
    sessionStorage.setItem(targetKey, currentData);
  }
  window.location.href = targetHtml;
}

function _popularMenuServicos() {
  const menu = document.getElementById("servicos-menu");
  if (!menu) return;
  SERVICES_ALL
    .filter(s => s.key !== SERVICE_CONFIG.storageKey)
    .forEach(s => {
      const btn     = document.createElement("button");
      btn.textContent = s.name;
      btn.onclick   = () => irParaServico(s.html, s.key);
      menu.appendChild(btn);
    });
}

function toggleDownloadMenu(event) {
  event.stopPropagation();
  const menu = document.getElementById("download-menu");
  const btn  = document.getElementById("btn-baixar");
  const isOpen = menu.classList.toggle("open");
  btn.classList.toggle("active", isOpen);
}

document.addEventListener("click", function (e) {
  if (!e.target.closest("#download-dropdown")) {
    const menu = document.getElementById("download-menu");
    const btn  = document.getElementById("btn-baixar");
    if (menu) menu.classList.remove("open");
    if (btn)  btn.classList.remove("active");
  }
  if (!e.target.closest("#services-dropdown")) {
    const menu = document.getElementById("servicos-menu");
    const btn  = document.getElementById("btn-servicos");
    if (menu) menu.classList.remove("open");
    if (btn)  btn.classList.remove("active");
  }
  if (!e.target.closest("#blocos-dropdown")) {
    const menu = document.getElementById("blocos-menu");
    const btn  = document.getElementById("btn-blocos");
    if (menu) menu.classList.remove("open");
    if (btn)  btn.classList.remove("active");
  }
});

/* ════════════════════════════════════════════════════
   DOWNLOAD  (PDF / JPG / PNG)
   ════════════════════════════════════════════════════ */

function getBase64(src) {
  const filename = decodeURIComponent(src.split("/").pop().split("\\").pop());
  return (
    IMG[filename] ||
    IMG[filename.normalize("NFD").replace(/[\u0300-\u036f]/g, "")] ||
    null
  );
}

/*
 * Renderiza o elemento .sistema-origem num <canvas> próprio.
 * Necessário porque html2canvas não suporta writing-mode corretamente.
 */
function renderSistemaOrigemDataURL(soEl) {
  const w = soEl.offsetWidth;
  const h = soEl.offsetHeight;
  const radius = 22;

  const c   = document.createElement("canvas");
  c.width   = w;
  c.height  = h;
  const ctx = c.getContext("2d");

  /* Fundo arredondado */
  const bgColor = soEl.style.backgroundColor || "#172c66";
  ctx.fillStyle = bgColor;
  ctx.beginPath();
  ctx.moveTo(radius, 0);
  ctx.lineTo(w - radius, 0);
  ctx.arcTo(w, 0, w, radius, radius);
  ctx.lineTo(w, h - radius);
  ctx.arcTo(w, h, w - radius, h, radius);
  ctx.lineTo(radius, h);
  ctx.arcTo(0, h, 0, h - radius, radius);
  ctx.lineTo(0, radius);
  ctx.arcTo(0, 0, radius, 0, radius);
  ctx.closePath();
  ctx.fill();

  if (soEl.classList.contains("tem-logo")) {
    /* Modo personalizado: logo rotacionada */
    const logoImg = soEl.querySelector(".logo-cliente-so");
    if (logoImg && logoImg.complete && logoImg.naturalWidth > 0) {
      const pad   = 20;
      const maxW  = h - pad;
      const maxH  = w - pad;
      const scale = Math.min(maxW / logoImg.naturalWidth, maxH / logoImg.naturalHeight);
      const iw    = logoImg.naturalWidth  * scale;
      const ih    = logoImg.naturalHeight * scale;
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.drawImage(logoImg, -iw / 2, -ih / 2, iw, ih);
      ctx.restore();
    }
  } else {
    /* Modo padrão: texto vertical de baixo para cima */
    const text = soEl.textContent.trim().toUpperCase();
    ctx.save();
    ctx.translate(w / 2, h / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle     = "#ffffff";
    ctx.font          = "700 18px Lato, sans-serif";
    ctx.textAlign     = "center";
    ctx.textBaseline  = "middle";

    const letterSpacing = 5;
    const letters  = text.split("");
    const widths   = letters.map((l) => ctx.measureText(l).width);
    const totalW   =
      widths.reduce((a, b) => a + b, 0) +
      letterSpacing * (letters.length - 1);
    let curX = -totalW / 2;
    for (let i = 0; i < letters.length; i++) {
      ctx.fillText(letters[i], curX + widths[i] / 2, 0);
      curX += widths[i] + letterSpacing;
    }
    ctx.restore();
  }

  return c.toDataURL();
}

async function downloadAs(format) {
  document.getElementById("download-menu").classList.remove("open");
  document.getElementById("btn-baixar").classList.remove("active");

  const actionButtons = document.getElementById("action-buttons");
  actionButtons.style.visibility = "hidden";
  document.body.style.cursor     = "wait";

  const target    = document.getElementById("page-wrapper");
  const soEl      = document.querySelector(".sistema-origem");
  const soW       = soEl.offsetWidth;
  const soH       = soEl.offsetHeight;
  const soDataUrl = renderSistemaOrigemDataURL(soEl);

  try {
    const canvas = await html2canvas(target, {
      useCORS:         false,
      allowTaint:      false,
      backgroundColor: "#ffffff",
      logging:         false,
      imageTimeout:    0,
      scale:           1,
      onclone: (clonedDoc) => {
        /* Substitui .sistema-origem pelo canvas pré-renderizado */
        const so = clonedDoc.querySelector(".sistema-origem");
        if (so) {
          const img       = clonedDoc.createElement("img");
          img.src         = soDataUrl;
          img.style.cssText =
            `width:${soW}px;height:${soH}px;` +
            `border-radius:22px;flex-shrink:0;display:block;`;
          so.parentNode.replaceChild(img, so);
        }

        /* Oculta botões de ação no clone */
        const ab = clonedDoc.getElementById("action-buttons");
        if (ab) ab.style.display = "none";

        /*
         * Substitui src das imagens por base64 APENAS no clone,
         * sem tocar o DOM original — evita canvas tainted (file://)
         * e elimina o flickering visual da foto do cliente.
         */
        clonedDoc.querySelectorAll("img").forEach((img) => {
          if (!img.src || img.src.startsWith("data:") || img.src.startsWith("blob:")) return;
          const b64 = getBase64(img.src);
          if (b64) img.src = b64;
        });
      },
    });

    const fname = SERVICE_CONFIG.filename;

    if (format === "png") {
      const link    = document.createElement("a");
      link.download = `${fname}.png`;
      link.href     = canvas.toDataURL("image/png");
      link.click();

    } else if (format === "jpg") {
      const link    = document.createElement("a");
      link.download = `${fname}.jpg`;
      link.href     = canvas.toDataURL("image/jpeg", 0.92);
      link.click();

    } else if (format === "pdf") {
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: "landscape",
        unit:        "px",
        format:      [canvas.width, canvas.height],
      });
      pdf.addImage(
        canvas.toDataURL("image/jpeg", 0.95),
        "JPEG", 0, 0, canvas.width, canvas.height
      );
      pdf.save(`${fname}.pdf`);
    }

  } catch (err) {
    alert("Erro ao gerar o arquivo: " + err.message);
  } finally {
    actionButtons.style.visibility = "";
    document.body.style.cursor     = "";
  }
}

/* ════════════════════════════════════════════════════
   TRIAGEM — wizard de configuração
   ════════════════════════════════════════════════════ */

let _triagemLogo   = null;
let _triagemImagem = null;

function triagemEscolher(tipo) {
  document.getElementById("step-escolha").classList.add("triagem-hidden");
  document.getElementById(
    tipo === "personalizada" ? "step-personalizada" : "step-padrao"
  ).classList.remove("triagem-hidden");
}

function triagemVoltar() {
  document.getElementById("step-padrao").classList.add("triagem-hidden");
  document.getElementById("step-personalizada").classList.add("triagem-hidden");
  document.getElementById("step-escolha").classList.remove("triagem-hidden");
}

function triagemAtualizarCor(val) {
  document.getElementById("t-cor-swatch").style.background = val;
  document.getElementById("t-cor-hex").value               = val;
}

function triagemDigitarCor(val) {
  const hex = val.startsWith("#") ? val : "#" + val;
  if (/^#[0-9a-fA-F]{6}$/.test(hex)) {
    document.getElementById("t-cor-swatch").style.background = hex;
    document.getElementById("t-cor").value                   = hex;
  }
}

/* Redimensiona imagem preservando ou não transparência */
function _resizeImg(dataUrl, maxW, maxH, manterTransparencia) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxW / img.width, maxH / img.height);
      const w     = Math.round(img.width  * scale);
      const h     = Math.round(img.height * scale);
      const cv    = document.createElement("canvas");
      cv.width    = w;
      cv.height   = h;
      const ctx   = cv.getContext("2d");
      if (manterTransparencia) ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
      resolve(
        manterTransparencia
          ? cv.toDataURL("image/png")
          : cv.toDataURL("image/jpeg", 0.85)
      );
    };
    img.src = dataUrl;
  });
}

async function triagemUpload(tipo, input) {
  if (!input.files || !input.files[0]) return;
  document.getElementById(`uz-${tipo}`).classList.remove("upload-error");
  const reader = new FileReader();
  reader.onload = async (e) => {
    const resized = await _resizeImg(
      e.target.result,
      tipo === "logo" ? 600 : 900,
      tipo === "logo" ? 400 : 720,
      tipo === "logo"   /* logo → mantém transparência PNG */
    );
    if (tipo === "logo") {
      _triagemLogo = resized;
      document.getElementById("prev-logo").src = resized;
      document.getElementById("prev-logo").classList.remove("triagem-hidden");
      document.getElementById("up-logo").classList.add("triagem-hidden");
    } else {
      _triagemImagem = resized;
      document.getElementById("prev-imagem").src = resized;
      document.getElementById("prev-imagem").classList.remove("triagem-hidden");
      document.getElementById("up-imagem").classList.add("triagem-hidden");
    }
  };
  reader.readAsDataURL(input.files[0]);
}

function triagemDrop(event, tipo) {
  event.preventDefault();
  document.getElementById(`uz-${tipo}`).classList.remove("drag-over");
  const file = event.dataTransfer.files[0];
  if (!file) return;
  triagemUpload(tipo, { files: [file] });
}

function triagemConfirmarPadrao() {
  const empresa = document.getElementById("t-empresa-padrao").value.trim();
  if (!empresa) {
    document.getElementById("t-empresa-padrao").classList.add("input-error");
    document.getElementById("t-empresa-padrao").focus();
    return;
  }
  const cliente = (document.getElementById("t-cliente-padrao")?.value || "").trim();
  const data = { type: "padrao", nome: empresa, nomeEmpresa: empresa, nomeCliente: cliente };
  sessionStorage.setItem(SERVICE_CONFIG.storageKey, JSON.stringify(data));
  triagemMostrarConfirmacao(data);
}

function triagemConfirmarPersonalizada() {
  const empresa = document.getElementById("t-empresa-pers").value.trim();
  const cor     = document.getElementById("t-cor").value;
  let ok = true;
  if (!empresa) {
    document.getElementById("t-empresa-pers").classList.add("input-error");
    ok = false;
  }
  if (!_triagemLogo) {
    document.getElementById("uz-logo").classList.add("upload-error");
    ok = false;
  }
  if (!_triagemImagem) {
    document.getElementById("uz-imagem").classList.add("upload-error");
    ok = false;
  }
  if (!ok) return;

  const cliente = (document.getElementById("t-cliente-pers")?.value || "").trim();
  const data = {
    type: "personalizada",
    nome: empresa, nomeEmpresa: empresa, nomeCliente: cliente,
    cor, logo: _triagemLogo, imagem: _triagemImagem,
  };
  sessionStorage.setItem(SERVICE_CONFIG.storageKey, JSON.stringify(data));
  triagemMostrarConfirmacao(data);
}

function triagemIrParaStep(stepId) {
  const fsSteps = ["step-confirmacao", "step-intro"];
  document.querySelectorAll(".triagem-step").forEach(
    s => s.classList.add("triagem-hidden")
  );
  document.querySelectorAll(".t-fullscreen-step").forEach(
    s => s.classList.add("triagem-hidden")
  );
  document.getElementById(stepId).classList.remove("triagem-hidden");

  const card = document.getElementById("triagem-card");
  if (fsSteps.includes(stepId)) {
    card.classList.add("triagem-hidden");
  } else {
    card.classList.remove("triagem-hidden");
  }
}

function triagemMostrarConfirmacao() {
  triagemIrParaStep("step-confirmacao");
}

function triagemVoltarParaForm() {
  const raw  = sessionStorage.getItem(SERVICE_CONFIG.storageKey);
  const tipo = raw ? JSON.parse(raw).type : "padrao";
  triagemIrParaStep(tipo === "personalizada" ? "step-personalizada" : "step-padrao");
}

/* ── Steps 3 e 4 ── */

function iniciarJornada() {
  const raw = sessionStorage.getItem(SERVICE_CONFIG.storageKey);
  if (!raw) return;
  const data = JSON.parse(raw);

  /* Reseta elementos animados */
  ["t-intro-pg", "t-intro-cli"].forEach(id =>
    document.getElementById(id).classList.remove("t-visivel")
  );
  document.getElementById("t-intro-tagline").innerHTML = "";

  /* Monta slot do cliente */
  const cli = document.getElementById("t-intro-cli");
  cli.innerHTML = "";
  if (data.type === "personalizada" && data.logo) {
    const img = document.createElement("img");
    img.src   = data.logo;
    img.alt   = data.nome;
    cli.appendChild(img);
  } else {
    const nome       = document.createElement("div");
    nome.className   = "t-intro-cli-nome";
    nome.textContent = data.nome;
    cli.appendChild(nome);
  }

  triagemIrParaStep("step-intro");
  _animarIntro(data);
}

function iniciarJornadaSkip() {
  const raw = sessionStorage.getItem(SERVICE_CONFIG.storageKey);
  if (raw) {
    _aplicarTriagem(JSON.parse(raw));
    _fecharTriagem();
  }
}

function _animarIntro(data) {
  /* Aplica configurações no layout enquanto a animação roda */
  _aplicarTriagem(data);

  setTimeout(() => document.getElementById("t-intro-pg").classList.add("t-visivel"), 250);
  setTimeout(() => document.getElementById("t-intro-cli").classList.add("t-visivel"), 700);

  const taglineEl             = document.getElementById("t-intro-tagline");
  const { palavras, destaques } = SERVICE_CONFIG.tagline;

  palavras.forEach((p, i) => {
    const span     = document.createElement("span");
    span.className = "t-tagline-palavra" +
      (destaques.has(p.toLowerCase()) ? " destaque" : "");
    span.textContent = p;
    taglineEl.appendChild(span);
    setTimeout(() => span.classList.add("revelada"), 1600 + i * 350);
  });

  setTimeout(() => _fecharTriagem(), 6000);
}

function _fecharTriagem() {
  const overlay = document.getElementById("triagem-overlay");
  overlay.classList.add("triagem-fechando");
  setTimeout(() => { overlay.style.display = "none"; }, 380);
}

/* ════════════════════════════════════════════════════
   APLICAR TRIAGEM NO LAYOUT
   ════════════════════════════════════════════════════ */

function _aplicarTriagem(data) {
  const soEl = document.querySelector(".sistema-origem");
  if (!soEl) return;

  if (data.type === "padrao") {
    soEl.textContent      = data.nomeEmpresa || data.nome;
    soEl.contentEditable  = "false";
    soEl.style.cursor     = "default";

  } else {
    /* Cor de fundo da marca */
    soEl.style.backgroundColor = data.cor;
    soEl.classList.add("tem-logo");
    soEl.contentEditable  = "false";
    soEl.style.cursor     = "default";
    soEl.textContent      = "";

    /* Logo rotacionada */
    const logoImg     = document.createElement("img");
    logoImg.src       = data.logo;
    logoImg.alt       = data.nome;
    logoImg.className = "logo-cliente-so";
    soEl.appendChild(logoImg);
    requestAnimationFrame(() => _ajustarLogoSO(soEl));

    /* Foto do cliente final */
    const pessoaImg = document.getElementById("pessoa-img");
    if (pessoaImg && data.imagem) {
      pessoaImg.src = data.imagem;
      requestAnimationFrame(async () => {
        const cropped   = await _cropImagem(data.imagem, pessoaImg.parentElement);
        pessoaImg.src   = cropped;
        try {
          const raw = sessionStorage.getItem(SERVICE_CONFIG.storageKey);
          if (raw) {
            const d   = JSON.parse(raw);
            d.imagem  = cropped;
            sessionStorage.setItem(SERVICE_CONFIG.storageKey, JSON.stringify(d));
          }
        } catch (_) { /* sessionStorage cheio ou indisponível */ }
      });
    }
  }

  /* Portal de Autonegociação — saudação ao cliente final */
  const portalGreeting = document.getElementById("portal-greeting");
  if (portalGreeting) {
    const nomeEl = document.getElementById("portal-greeting-nome");
    const nome   = data.nomeCliente || "";
    if (nome && nomeEl) {
      nomeEl.textContent = nome;
      portalGreeting.classList.remove("triagem-hidden");
    } else {
      portalGreeting.classList.add("triagem-hidden");
    }
  }

  /* Phone mockup greeting (gestao-acordo / jornada-cobranca) */
  const phoneGreeting = document.getElementById("phone-greeting");
  if (phoneGreeting) {
    const nome = data.nomeCliente || "";
    phoneGreeting.textContent = nome ? "Olá, " + nome : "Olá, Paulo";
  }

  /* Hook opcional por serviço: window._onTriagemApplied(data) */
  if (typeof window._onTriagemApplied === "function") {
    window._onTriagemApplied(data);
  }
}

function _ajustarLogoSO(soEl) {
  const logoImg = soEl.querySelector(".logo-cliente-so");
  if (!logoImg) return;
  const W = soEl.offsetWidth;
  const H = soEl.offsetHeight;
  const padLateral  = 8;
  const padVertical = 16;

  const elW = H - padVertical;
  const elH = W - padLateral * 2;

  logoImg.style.width      = elW + "px";
  logoImg.style.height     = elH + "px";
  logoImg.style.marginLeft = -(elW / 2) + "px";
  logoImg.style.marginTop  = -(elH / 2) + "px";
  logoImg.style.transform  = "rotate(-90deg)";
}

function _cropImagem(dataUrl, container) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
    // Dentro do img.onload, substitua a lógica por:
    const scale = Math.min(cW / img.width, cH / img.height);
    const newWidth = img.width * scale;
    const newHeight = img.height * scale;

    // Centraliza a imagem no canvas se ela for menor que o container
    const x = (cW - newWidth) / 2;
    const y = (cH - newHeight) / 2;

    const cv = document.createElement("canvas");
    cv.width = cW;
    cv.height = cH;
    cv.getContext("2d").drawImage(img, 0, 0, img.width, img.height, x, y, newWidth, newHeight);
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

/* ════════════════════════════════════════════════════
   INIT
   ════════════════════════════════════════════════════ */

(function _init() {
  const run = () => {
    /* Dentro de iframe (preview da home): oculta triagem e chrome, mostra layout direto */
    if (window !== window.top) {
      document.body.classList.add("iframe-preview");
      const overlay = document.getElementById("triagem-overlay");
      if (overlay) overlay.style.display = "none";
      return;
    }

    /* Popula o menu de serviços (exclui o serviço atual) */
    _popularMenuServicos();
    _initAddButtons();
    _initBlockDeleteHover();

    const saved = sessionStorage.getItem(SERVICE_CONFIG.storageKey);
    if (!saved) return;
    try {
      const data = JSON.parse(saved);
      const overlay = document.getElementById("triagem-overlay");
      if (overlay) overlay.style.display = "none";
      /* Aguarda imagens carregarem antes de aplicar */
      window.addEventListener("load", () => _aplicarTriagem(data), { once: true });
    } catch {
      sessionStorage.removeItem(SERVICE_CONFIG.storageKey);
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
