(() => {
  const canvas = document.getElementById("tech-bg");
  const ctx = canvas.getContext("2d");

  let w, h, dpr;

  // Partículas normales (puntitos)
  const particles = [];
  const DOT_COUNT = 55;
  const SPEED = 0.22;
  const LINK_DIST = 150;

  // Nodos con logos (imagenes)
  const iconNodes = [];

  // 👇 Cambia rutas/nombres según tus archivos
  const iconSources = [
    { name: "JS", src: "assets/img/JS.png" },
    { name: "JAVA",    src: "assets/img/JAVA.png" },
    { name: "GHITHUB", src: "assets/img/GHITHUB.png" },
    { name: "REACT",   src: "assets/img/REACT.png"},
    { name: "HTML", src: "assets/img/HTML.png" },
    { name: "CSS", src: "assets/img/CSS.png" },
    { name: "FLOKZU", src: "assets/img/FLOKZU.png" },

  ];

  function resize() {
    dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function rand(min, max) { return Math.random() * (max - min) + min; }

  function wrap(p) {
    if (p.x < -80) p.x = w + 80;
    if (p.x > w + 80) p.x = -80;
    if (p.y < -80) p.y = h + 80;
    if (p.y > h + 80) p.y = -80;
  }

  function initDots() {
    particles.length = 0;
    for (let i = 0; i < DOT_COUNT; i++) {
      particles.push({
        type: "dot",
        x: rand(0, w),
        y: rand(0, h),
        vx: rand(-SPEED, SPEED),
        vy: rand(-SPEED, SPEED),
        r: rand(1.2, 2.6),
      });
    }
  }

  function createIconNodes(loadedIcons) {
    iconNodes.length = 0;
    // Tamaños variados para que se vea natural
    const sizes = [90, 85, 86, 75, 70];

    for (const icon of loadedIcons) {
      iconNodes.push({
        type: "icon",
        name: icon.name,
        img: icon.img,
        size: sizes[Math.floor(Math.random() * sizes.length)],
        x: rand(80, w - 80),
        y: rand(80, h - 80),
        vx: rand(-SPEED, SPEED),
        vy: rand(-SPEED, SPEED),
      });
    }
  }

  function drawDot(p) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(91, 214, 252, 0.82)";
    ctx.fill();
  }

function drawIcon(n) {
  const maxSize = n.size; // tamaño base (ajústalo)

  const ratio = n.img.width / n.img.height;

  let drawWidth, drawHeight;

  if (ratio > 1) {
    drawWidth = maxSize;
    drawHeight = maxSize / ratio;
  } else {
    drawHeight = maxSize;
    drawWidth = maxSize * ratio;
  }

  ctx.globalAlpha = 0.8;

  ctx.drawImage(
    n.img,
    n.x - drawWidth / 2,
    n.y - drawHeight / 2,
    drawWidth,
    drawHeight
  );

  ctx.globalAlpha = 1;
}
  function link(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < LINK_DIST) {
      const alpha = (1 - dist / LINK_DIST) * 0.28;
      // Color “tech” elegante (puedes cambiar)
      ctx.strokeStyle = `rgba(79, 209, 197, ${alpha})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
  }

  function update(p) {
    p.x += p.vx;
    p.y += p.vy;
    wrap(p);
  }

  function step() {
    ctx.clearRect(0, 0, w, h);

    // Fondo sutil (oscuro + transparencia)
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, 0, w, h);

    const all = [...particles, ...iconNodes];

    // Update + draw
    for (const n of all) {
      update(n);
      if (n.type === "dot") drawDot(n);
      else drawIcon(n);
    }

    // Lines
    for (let i = 0; i < all.length; i++) {
      for (let j = i + 1; j < all.length; j++) {
        link(all[i], all[j]);
      }
    }

    requestAnimationFrame(step);
  }
  // Preload de imágenes (logos)
  function preloadIcons(sources) {
    return Promise.all(
      sources.map(({ name, src }) => new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve({ name, img });
        img.onerror = () => resolve(null); // si falla, no revienta
        img.src = src;
      }))
    ).then(results => results.filter(Boolean));
  }

  async function start() {
    resize();
    initDots();

    const loadedIcons = await preloadIcons(iconSources);
    createIconNodes(loadedIcons);

    step();
  }

  window.addEventListener("resize", () => {
    resize();
    initDots();
    // Reposiciona iconos dentro del nuevo tamaño
    for (const n of iconNodes) {
      n.x = rand(80, w - 80);
      n.y = rand(80, h - 80);
    }
  });

  start();
})();