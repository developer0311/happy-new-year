// Get canvas elements
const fireworksCanvas = document.getElementById('fireworksCanvas');
const fireworksCtx = fireworksCanvas.getContext('2d');

// Resize canvas to fit window
function resizeCanvas() {
  fireworksCanvas.width = window.innerWidth;
  fireworksCanvas.height = window.innerHeight;
}

// Initialize canvas size
resizeCanvas();

// Handle window resize
window.addEventListener('resize', resizeCanvas);

// Fireworks logic
const fireworks = [];
class Firework {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 2 + 1;
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    this.speed = Math.random() * 4 + 2;
    this.angle = Math.random() * Math.PI * 2;
    this.alpha = 1;
    this.decay = Math.random() * 0.03 + 0.02;
  }
  draw() {
    fireworksCtx.save();
    fireworksCtx.globalAlpha = this.alpha;
    fireworksCtx.beginPath();
    fireworksCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    fireworksCtx.fillStyle = this.color;
    fireworksCtx.fill();
    fireworksCtx.restore();
  }
  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.alpha -= this.decay;
  }
}

function createFirework() {
  const x = Math.random() * fireworksCanvas.width;
  const y = Math.random() * fireworksCanvas.height / 2;
  for (let i = 0; i < 50; i++) {
    fireworks.push(new Firework(x, y));
  }
}

function animateFireworks() {
  fireworksCtx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  fireworksCtx.fillRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].draw();
    fireworks[i].update();
    if (fireworks[i].alpha <= 0) {
      fireworks.splice(i, 1);
    }
  }

  requestAnimationFrame(animateFireworks);
}

// Countdown logic
const nextYear = new Date('January 1, 2026 00:00:00').getTime();
function updateCountdown() {
  const now = new Date().getTime();
  const distance = nextYear - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById('days').textContent = days.toString().padStart(2, '0');
  document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
  document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
  document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Start animations
setInterval(createFirework, 800);  // Create a firework every 800ms
animateFireworks();               // Start animating fireworks
setInterval(updateCountdown, 1000); // Update countdown every second
