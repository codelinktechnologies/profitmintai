// Pure client-side confetti particle system without external dependencies.
// Creates physics-based floating elements on the document body.

export function triggerConfetti() {
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.inset = '0';
  container.style.pointerEvents = 'none';
  container.style.zIndex = '99999';
  document.body.appendChild(container);

  const colors = [
    '#2563EB', // Primary Blue
    '#0C447C', // Navy Dark
    '#0284C7', // Sky Blue
    '#854F0B', // Amber
    '#7C3AED', // Purple
    '#1D4ED8', // Deep Blue
    '#38bdf8', // Light Blue
    '#f43f5e', // Rose
  ];

  const count = 120;
  const particles: HTMLElement[] = [];

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 8 + 6;
    
    p.style.position = 'absolute';
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Start from bottom-center or randomized bottom region
    const startX = window.innerWidth / 2 + (Math.random() - 0.5) * 100;
    const startY = window.innerHeight + 10;
    
    p.style.left = `${startX}px`;
    p.style.top = `${startY}px`;
    
    container.appendChild(p);
    
    // Physics parameters
    const angle = (Math.PI / 2) + (Math.random() - 0.5) * (Math.PI / 2.5); // shoot upwards with variance
    const velocity = Math.random() * 16 + 12;
    const vx = Math.cos(angle) * velocity;
    const vy = -Math.sin(angle) * velocity; // upwards is negative Y
    
    particles.push(p);
    
    let curX = startX;
    let curY = startY;
    let curVx = vx;
    let curVy = vy;
    const gravity = 0.45;
    const drag = 0.98;
    let opacity = 1.0;
    let rotation = Math.random() * 360;
    const rotSpeed = (Math.random() - 0.5) * 15;

    const update = () => {
      curVy += gravity;
      curVx *= drag;
      curVy *= drag;
      curX += curVx;
      curY += curVy;
      opacity -= 0.012;
      rotation += rotSpeed;

      p.style.left = `${curX}px`;
      p.style.top = `${curY}px`;
      p.style.opacity = `${Math.max(0, opacity)}`;
      p.style.transform = `rotate(${rotation}deg)`;

      if (opacity > 0 && curY < window.innerHeight + 50) {
        requestAnimationFrame(update);
      } else {
        p.remove();
      }
    };
    
    requestAnimationFrame(update);
  }

  // Cleanup container after 4 seconds
  setTimeout(() => {
    container.remove();
  }, 4000);
}
