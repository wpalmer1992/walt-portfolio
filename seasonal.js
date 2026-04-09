(function () {
  const month = new Date().getMonth(); // 0-indexed: 9 = October, 11 = December

  if (month === 9) applyHalloween();
  else if (month === 11) applyChristmas();

  // =====================
  // HALLOWEEN — October
  // =====================
  function applyHalloween() {
    // Swap red → orange throughout
    const root = document.documentElement;
    root.style.setProperty('--red', '#E07818');
    root.style.setProperty('--red-dark', '#A35500');
    root.style.setProperty('--red-bright', '#F08C20');

    // Inject bat + flicker styles
    const style = document.createElement('style');
    style.textContent = `
      .bat {
        position: fixed;
        pointer-events: none;
        z-index: 998;
        font-size: 1.4rem;
        opacity: 0;
        animation: batFly linear infinite;
      }

      @keyframes batFly {
        0%   { opacity: 0;   transform: translateX(-60px)  translateY(0px)   scaleX(1); }
        5%   { opacity: 0.55; }
        45%  { transform: translateX(45vw)  translateY(-40px)  scaleX(1); }
        50%  { transform: translateX(50vw)  translateY(-40px)  scaleX(-1); }
        95%  { opacity: 0.55; }
        100% { opacity: 0;   transform: translateX(110vw) translateY(10px)  scaleX(-1); }
      }

      /* Subtle orange glow on hero */
      .hero-bg-texture {
        background: radial-gradient(ellipse at 70% 40%, rgba(224,120,24,0.1) 0%, transparent 60%) !important;
      }
    `;
    document.head.appendChild(style);

    // Spawn bats at random heights and intervals
    const batPositions = [8, 18, 28, 38, 52];
    batPositions.forEach((top, i) => {
      const bat = document.createElement('div');
      bat.className = 'bat';
      bat.textContent = '🦇';
      bat.style.top = `${top}vh`;
      bat.style.fontSize = `${0.9 + Math.random() * 0.8}rem`;
      bat.style.animationDuration = `${12 + Math.random() * 10}s`;
      bat.style.animationDelay = `${i * 4 + Math.random() * 6}s`;
      document.body.appendChild(bat);
    });
  }

  // =====================
  // CHRISTMAS — December
  // =====================
  function applyChristmas() {
    // Add green as a secondary accent on alternating elements
    const style = document.createElement('style');
    style.textContent = `
      .intro-label,
      .hero-eyebrow,
      .reel-header .reel-sub,
      .exp-dates,
      .resume-download:hover {
        color: #2D6A4F !important;
      }

      .resume-download:hover,
      .tag:hover {
        background: #2D6A4F !important;
        border-color: #2D6A4F !important;
      }

      .snowflake {
        position: fixed;
        top: -8px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.75);
        pointer-events: none;
        z-index: 998;
        animation: snowFall linear infinite;
      }

      @keyframes snowFall {
        0%   { transform: translateY(0)     translateX(0);    opacity: 0; }
        8%   { opacity: 1; }
        88%  { opacity: 0.5; }
        100% { transform: translateY(102vh) translateX(20px); opacity: 0; }
      }
    `;
    document.head.appendChild(style);

    // Spawn snowflakes
    const count = 38;
    for (let i = 0; i < count; i++) {
      const flake = document.createElement('div');
      flake.className = 'snowflake';
      const size = 2 + Math.random() * 4;
      flake.style.width  = `${size}px`;
      flake.style.height = `${size}px`;
      flake.style.left   = `${Math.random() * 100}vw`;
      flake.style.animationDuration = `${6 + Math.random() * 10}s`;
      flake.style.animationDelay    = `${Math.random() * 12}s`;
      flake.style.opacity = `${0.4 + Math.random() * 0.5}`;
      document.body.appendChild(flake);
    }
  }
})();
