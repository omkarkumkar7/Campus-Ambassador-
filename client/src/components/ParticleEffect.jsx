import React from 'react';

class Particle {
  constructor(x, y, hue) {
    this.x = x;
    this.y = y;
    this.hue = hue;
    // subtle, small particles
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.6;
    this.speedY = (Math.random() - 0.5) * 0.6;
    // use a very faint white if no hue provided to avoid bright colors
    this.color = typeof hue === 'number' ? `hsla(${hue}, 60%, 70%, 0.06)` : 'rgba(255,255,255,0.03)';
    this.life = 220 + Math.random() * 80;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
    this.life -= 1;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

export default function ParticleEffect() {
  const canvasRef = React.useRef(null);
  const particlesRef = React.useRef([]);
  const mousePositionRef = React.useRef({ x: null, y: null });
  const hueRef = React.useRef(0);
  const animationFrameId = React.useRef(null);

  const handlePointerMove = React.useCallback((event) => {
    let clientX, clientY;
    if (event.touches) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }
    mousePositionRef.current.x = clientX;
    mousePositionRef.current.y = clientY;
    // Intentionally do NOT spawn particles on pointer move to avoid bright/glowing trails.
    // We still track mouse position in case future effects need it.
  }, []);

  const animate = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
  // subtle fade to create trailing effect without bright glow
  // use a lighter fade so faint particles remain visible longer after reload
  ctx.fillStyle = 'rgba(5, 6, 10, 0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = particlesRef.current.length - 1; i >= 0; i--) {
      const particle = particlesRef.current[i];
      if (particle.life <= 0) {
        particlesRef.current.splice(i, 1);
      } else {
        particle.update();
        particle.draw(ctx);
      }
    }
    // Occasionally spawn very faint, slow-moving particles at random positions
    // slightly higher chance so ambient particles don't disappear for many seconds
    if (Math.random() < 0.035) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      particlesRef.current.push(new Particle(x, y));
    }

    animationFrameId.current = requestAnimationFrame(animate);
  }, []);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    handleResize();

    // Seed with a modest number of faint particles so the background isn't empty on first render
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      particlesRef.current.push(new Particle(x, y));
    }

    animationFrameId.current = requestAnimationFrame(animate);

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [animate, handlePointerMove]);

  return (
    // place canvas behind content so it doesn't visually block or darken the page
    <div className="fixed top-0 left-0 w-screen h-screen pointer-events-none" style={{ zIndex: 0 }}>
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}