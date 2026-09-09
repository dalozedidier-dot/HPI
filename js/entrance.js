(() => {
  const canvas = document.getElementById('stardust');
  const ctx = canvas.getContext('2d');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if (!ctx) return;
  let width, height, stars = [], frame;
  const started = performance.now();
  function resize() {
    width = innerWidth; height = document.querySelector('.entrance').offsetHeight;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = width * ratio; canvas.height = height * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    stars = Array.from({length: Math.min(90, Math.floor(width / 14))}, () => ({x:Math.random()*width,y:Math.random()*height,r:Math.random()*1.1+.3,v:Math.random()*.12+.03}));
  }
  function draw(now) {
    ctx.clearRect(0, 0, width, height);
    for (const s of stars) {
      s.y -= s.v; if (s.y < 0) s.y = height;
      ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle = 'rgba(137,101,158,.5)'; ctx.fill();
    }
    if (!document.hidden && !reduced.matches && now - started < 12000) frame=requestAnimationFrame(draw);
  }
  function update() { cancelAnimationFrame(frame); if (!document.hidden && !reduced.matches) draw(performance.now()); else ctx.clearRect(0,0,width,height); }
  resize(); update();
  addEventListener('resize', () => {resize(); update();});
  document.addEventListener('visibilitychange',update);
  reduced.addEventListener('change',update);
})();