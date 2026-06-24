// ── CannaDabs 805 · main.js ──────────────────────────────────────

// Age gate check
function enterSite() {
  sessionStorage.setItem('ageVerified', 'true');
  document.getElementById('agegate').classList.remove('active');
  startIntro();
}

// Skip intro
function skipIntro() {
  const intro = document.getElementById('intro');
  intro.classList.add('fade-out');
  setTimeout(() => {
    intro.style.display = 'none';
    document.getElementById('site').classList.add('active');
    document.getElementById('jar-layer').style.pointerEvents = 'auto';
  }, 900);
}

// ── SMOKE INTRO ──────────────────────────────────────────────────
function startIntro() {
  const intro = document.getElementById('intro');
  const logoImg = document.getElementById('logo-img');
  const label = document.getElementById('intro-label');
  const canvas = document.getElementById('smoke-canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = 320;
  canvas.height = 240;

  // Show logo
  setTimeout(() => logoImg.classList.add('visible'), 300);
  setTimeout(() => label.classList.add('visible'), 900);

  // Smoke particles
  const particles = [];

  class SmokeParticle {
    constructor() {
      this.x = 120 + Math.random() * 80;
      this.y = 180 + Math.random() * 30;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = -(1.2 + Math.random() * 1.5);
      this.radius = 8 + Math.random() * 20;
      this.alpha = 0.5 + Math.random() * 0.3;
      this.decay = 0.008 + Math.random() * 0.006;
      this.growth = 0.4 + Math.random() * 0.4;
      this.hue = Math.random() > 0.5 ? 80 : 200; // acid green or ice blue tint
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.radius += this.growth;
      this.alpha -= this.decay;
      this.vx += (Math.random() - 0.5) * 0.05;
    }
    draw() {
      if (this.alpha <= 0) return;
      const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
      grad.addColorStop(0, `hsla(${this.hue}, 40%, 70%, ${this.alpha})`);
      grad.addColorStop(1, `hsla(${this.hue}, 20%, 40%, 0)`);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    }
  }

  let smokeActive = true;
  let animFrame;

  function animateSmoke() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (smokeActive && particles.length < 40) {
      for (let i = 0; i < 2; i++) particles.push(new SmokeParticle());
    }
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw();
      if (particles[i].alpha <= 0) particles.splice(i, 1);
    }
    animFrame = requestAnimationFrame(animateSmoke);
  }

  animateSmoke();

  // Dissolve sequence — logo fades into smoke then vanishes
  setTimeout(() => {
    smokeActive = false;
    logoImg.style.transition = 'opacity 1.2s ease';
    logoImg.style.opacity = '0';
    label.style.transition = 'opacity 0.8s ease';
    label.style.opacity = '0';
  }, 3200);

  setTimeout(() => {
    cancelAnimationFrame(animFrame);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const intro = document.getElementById('intro');
    intro.classList.add('fade-out');
    setTimeout(() => {
      intro.style.display = 'none';
      document.getElementById('site').classList.add('active');
    document.getElementById('jar-layer').style.pointerEvents = 'auto';
    }, 900);
  }, 4800);
}

// ── INIT ─────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  // Check session
  if (sessionStorage.getItem('ageVerified') === 'true') {
    document.getElementById('agegate').classList.remove('active');
    startIntro();
  }

  spawnJars('jar-layer');

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Merch buttons
  document.querySelectorAll('.mc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.textContent = 'Added ✓';
      btn.style.borderColor = 'var(--acid)';
      btn.style.color = 'var(--acid)';
      setTimeout(() => {
        btn.textContent = btn.textContent.includes('Select') ? 'Select Size' : 'Add to Cart';
        btn.style.borderColor = '';
        btn.style.color = '';
      }, 2000);
    });
  });

  // Strain card hover glow
  document.querySelectorAll('.strain-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.boxShadow = '0 0 20px rgba(200,255,0,0.06)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.boxShadow = '';
    });
  });
});
