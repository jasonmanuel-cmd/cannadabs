// CannaDabs 805 — Flying Jar System v2
// Each jar has velocity, drifts across full canvas, wraps edges

const JARS = [
  {name:'Sunday\nPunch',       lid:'#FF6B35',bg:'#1a0a00',txt:'#FFE4B5'},
  {name:'Frozen\nBananas',     lid:'#4FC3F7',bg:'#001a2e',txt:'#B3E5FC'},
  {name:'Guano',               lid:'#FF3CAC',bg:'#1a001a',txt:'#FFB3E6'},
  {name:'Fuel\nCell',          lid:'#C8FF00',bg:'#0a1400',txt:'#C8FF00'},
  {name:'Honeycomb',           lid:'#FFB300',bg:'#1a0f00',txt:'#FFF176'},
  {name:'Garlic\nMimosa',      lid:'#A5D6A7',bg:'#001400',txt:'#C8E6C9'},
  {name:"Angie's\nRange",      lid:'#FF7043',bg:'#1a0800',txt:'#FFCCBC'},
  {name:'Flow\nState',         lid:'#00E5FF',bg:'#001a1a',txt:'#B2EBF2'},
  {name:'Candy\nFumez',        lid:'#CE93D8',bg:'#12001a',txt:'#E1BEE7'},
  {name:'Candy\nFlex',         lid:'#F48FB1',bg:'#1a0010',txt:'#FCE4EC'},
  {name:'Vape\nSour',          lid:'#69F0AE',bg:'#001a0a',txt:'#B9F6CA'},
  {name:'Trop\nSlushie',       lid:'#FF3CAC',bg:'#1a0018',txt:'#FF80AB'},
  {name:'Mad Fruit\nSmoothie', lid:'#FF6E40',bg:'#1a0500',txt:'#FFCCBC'},
  {name:'Nectarine\nJelly',    lid:'#FFAB40',bg:'#1a0c00',txt:'#FFE0B2'},
  {name:'Papaya\nMelon',       lid:'#FFD740',bg:'#1a1200',txt:'#FFF9C4'},
  {name:'Blumos',              lid:'#40C4FF',bg:'#00101a',txt:'#B3E5FC'},
  {name:'Blumos\nRare',        lid:'#536DFE',bg:'#000d1a',txt:'#C5CAE9'},
  {name:'Ava Z',               lid:'#C8FF00',bg:'#0a1400',txt:'#F0F4C3'},
  {name:'INK-Z',               lid:'#212121',bg:'#0a0a0a',txt:'#C8FF00'},
  {name:'Unbanger',            lid:'#FF1744',bg:'#1a0000',txt:'#FFCDD2'},
  {name:'Meth\nChavaz',        lid:'#00E676',bg:'#001a08',txt:'#B9F6CA'},
  {name:'Melted\nStrawberries',lid:'#FF3D00',bg:'#1a0500',txt:'#FFCCBC'},
  {name:'Fruit\nLoops',        lid:'#FF3CAC',bg:'#1a0018',txt:'#FF80AB'},
  {name:'Mad\nFruit',          lid:'#FF6E40',bg:'#1a0500',txt:'#FFCCBC'},
];

const JAR_W = 80;
const JAR_H = 74;

function spawnJars(containerId) {
  const scene = document.getElementById(containerId);
  if (!scene) return;

  // Make sure the container fills the hero
  scene.style.position = 'absolute';
  scene.style.inset = '0';
  scene.style.overflow = 'hidden';
  scene.style.pointerEvents = 'none';

  const particles = [];

  JARS.forEach((j) => {
    const lines  = j.name.split('\n');
    const lidTxt = lines[0].length > 8 ? lines[0].substring(0, 8) : lines[0];
    const labelLines = lines.map(l => `<span style="display:block">${l}</span>`).join('');
    const fs = lines.length > 1 ? '9px' : '11px';

    const el = document.createElement('div');
    el.style.cssText = [
      'position:absolute',
      'will-change:transform',
      'pointer-events:auto',
      'cursor:pointer',
      'user-select:none',
      `opacity:${(0.5 + Math.random() * 0.5).toFixed(2)}`,
      'transition:opacity 0.2s',
    ].join(';');

    el.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;">
        <div style="
          width:78px;height:14px;
          border-radius:4px 4px 0 0;
          border:2px solid rgba(255,255,255,0.2);
          border-bottom:none;
          background:${j.lid};
          display:flex;align-items:center;justify-content:center;
          flex-shrink:0;
        ">
          <span style="font-family:'Bebas Neue',sans-serif;font-size:8px;color:#000;letter-spacing:0.1em;opacity:0.85;white-space:nowrap;overflow:hidden">${lidTxt.toUpperCase()}</span>
        </div>
        <div style="
          width:72px;height:58px;
          border-radius:0 0 10px 10px;
          border:2px solid rgba(255,255,255,0.12);
          border-top:none;
          background:${j.bg};
          display:flex;align-items:center;justify-content:center;
          position:relative;overflow:hidden;flex-shrink:0;
        ">
          <div style="position:absolute;top:0;left:0;width:28%;height:100%;background:rgba(255,255,255,0.05);pointer-events:none;"></div>
          <div style="text-align:center;position:relative;z-index:2;padding:0 4px;">
            <div style="font-family:'Bebas Neue',sans-serif;font-size:${fs};letter-spacing:0.06em;color:${j.txt};line-height:1.1;text-shadow:0 1px 4px rgba(0,0,0,0.9)">${labelLines}</div>
            <div style="font-family:'Space Mono',monospace;font-size:5.5px;color:rgba(255,255,255,0.4);letter-spacing:0.06em;margin-top:2px">LIVE HASH ROSIN</div>
          </div>
        </div>
      </div>
    `;

    // Hover
    el.addEventListener('mouseenter', () => {
      el.style.opacity = '1';
      el.style.zIndex  = '50';
    });
    el.addEventListener('mouseleave', () => {
      el.style.opacity = p.opacity;
      el.style.zIndex  = '1';
    });

    scene.appendChild(el);

    // Physics state — spread jars across entire canvas on init
    const p = {
      el,
      x: Math.random() * (window.innerWidth  - JAR_W),
      y: Math.random() * (scene.offsetHeight - JAR_H),
      vx: (Math.random() * 1.4 - 0.7) * (Math.random() > 0.5 ? 1 : -1),
      vy: (Math.random() * 1.0 - 0.5) * (Math.random() > 0.5 ? 1 : -1),
      rot: Math.random() * 360,
      vrot: (Math.random() * 0.6 - 0.3),
      opacity: (0.5 + Math.random() * 0.5).toFixed(2),
      pinned: false,
    };

    // Make sure speed isn't too slow
    if (Math.abs(p.vx) < 0.25) p.vx = p.vx < 0 ? -0.35 : 0.35;
    if (Math.abs(p.vy) < 0.15) p.vy = p.vy < 0 ? -0.2  : 0.2;

    particles.push(p);
  });

  // RAF loop
  let W, H;

  function resize() {
    W = scene.offsetWidth  || window.innerWidth;
    H = scene.offsetHeight || 600;
  }
  resize();
  window.addEventListener('resize', resize);

  function tick() {
    for (const p of particles) {
      if (p.pinned) continue;

      p.x   += p.vx;
      p.y   += p.vy;
      p.rot += p.vrot;

      // Wrap edges — jar exits one side, reappears on the other
      if (p.x > W + JAR_W)  p.x = -JAR_W;
      if (p.x < -JAR_W)     p.x =  W + JAR_W;
      if (p.y > H + JAR_H)  p.y = -JAR_H;
      if (p.y < -JAR_H)     p.y =  H + JAR_H;

      p.el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rot}deg)`;
    }
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}
