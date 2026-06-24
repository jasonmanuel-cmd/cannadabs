// CannaDabs 805 — Floating Jar Background System
// 24 strains sourced from the actual product stack

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

function spawnJars(containerId) {
  const scene = document.getElementById(containerId);
  if (!scene) return;

  const W = scene.offsetWidth || window.innerWidth;
  const H = scene.offsetHeight || 600;

  JARS.forEach((j) => {
    const rot  = (Math.random() * 16 - 8).toFixed(1);
    const rot2 = (parseFloat(rot) + (Math.random() * 5 - 2.5)).toFixed(1);
    const rot3 = (parseFloat(rot) - (Math.random() * 5 - 2.5)).toFixed(1);
    const bob1 = `${(Math.random() * -14 - 4).toFixed(0)}px`;
    const bob2 = `${(Math.random() * 9 + 2).toFixed(0)}px`;
    const dur  = (3.6 + Math.random() * 3.8).toFixed(1);
    const delay= (Math.random() * 5).toFixed(1);
    const x    = 20 + Math.random() * (W - 130);
    const y    = 20 + Math.random() * (H - 100);
    const op   = (0.45 + Math.random() * 0.55).toFixed(2);

    const wrap = document.createElement('div');
    wrap.className = 'jar-float';
    wrap.style.cssText = [
      `position:absolute`,
      `left:${x}px`,
      `top:${y}px`,
      `opacity:${op}`,
      `cursor:pointer`,
      `user-select:none`,
      `--rot:${rot}deg`,
      `--rot2:${rot2}deg`,
      `--rot3:${rot3}deg`,
      `--bob1:${bob1}`,
      `--bob2:${bob2}`,
      `animation:jarFloat ${dur}s ease-in-out -${delay}s infinite`,
      `transition:transform 0.2s ease, opacity 0.2s ease`,
      `z-index:1`,
    ].join(';');

    const lines = j.name.split('\n');
    const lidTxt = lines[0].length > 8 ? lines[0].substring(0, 8) : lines[0];
    const labelLines = lines.map(l => `<span style="display:block">${l}</span>`).join('');
    const fs = lines.length > 1 ? '9px' : '11px';

    wrap.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;">
        <div style="
          width:78px;height:14px;
          border-radius:4px 4px 0 0;
          border:2px solid rgba(255,255,255,0.2);
          border-bottom:none;
          background:${j.lid};
          display:flex;align-items:center;justify-content:center;
        ">
          <span style="font-family:'Bebas Neue',sans-serif;font-size:8px;color:#000;letter-spacing:0.1em;opacity:0.85">${lidTxt.toUpperCase()}</span>
        </div>
        <div style="
          width:72px;height:58px;
          border-radius:0 0 10px 10px;
          border:2px solid rgba(255,255,255,0.12);
          border-top:none;
          background:${j.bg};
          display:flex;align-items:center;justify-content:center;
          position:relative;overflow:hidden;
        ">
          <div style="position:absolute;top:0;left:0;width:28%;height:100%;background:rgba(255,255,255,0.05);pointer-events:none;"></div>
          <div style="text-align:center;position:relative;z-index:2;">
            <div style="font-family:'Bebas Neue',sans-serif;font-size:${fs};letter-spacing:0.06em;color:${j.txt};line-height:1.1;text-shadow:0 1px 4px rgba(0,0,0,0.9)">${labelLines}</div>
            <div style="font-family:'Space Mono',monospace;font-size:5.5px;color:rgba(255,255,255,0.45);letter-spacing:0.08em;margin-top:2px">LIVE HASH ROSIN</div>
          </div>
        </div>
      </div>
    `;

    wrap.addEventListener('mouseenter', () => {
      wrap.style.transform = 'scale(1.18) rotate(0deg)';
      wrap.style.opacity   = '1';
      wrap.style.zIndex    = '20';
    });
    wrap.addEventListener('mouseleave', () => {
      wrap.style.transform = '';
      wrap.style.opacity   = op;
      wrap.style.zIndex    = '1';
    });

    scene.appendChild(wrap);
  });
}
