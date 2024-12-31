// Get canvas elements
const starsCanvas = document.getElementById('starsCanvas');
const fireworksCanvas = document.getElementById('fireworksCanvas');
const starsCtx = starsCanvas.getContext('2d');
const fireworksCtx = fireworksCanvas.getContext('2d');

// Set canvas dimensions
starsCanvas.width = fireworksCanvas.width = window.innerWidth;
starsCanvas.height = fireworksCanvas.height = window.innerHeight;

// Stars logic
const stars = [];
for (let i = 0; i < 150; i++) {
  stars.push({
    x: Math.random() * starsCanvas.width,
    y: Math.random() * starsCanvas.height,
    radius: Math.random() * 1.5 + 0.5,
    alpha: Math.random(),
    twinkleSpeed: Math.random() * 0.02 + 0.01,
  });
}

function drawStars() {
  starsCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
  stars.forEach(star => {
    star.alpha += star.twinkleSpeed * (Math.random() > 0.5 ? 1 : -1);
    star.alpha = Math.min(Math.max(star.alpha, 0.2), 1);
    starsCtx.beginPath();
    starsCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    starsCtx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
    starsCtx.fill();
  });
  requestAnimationFrame(drawStars);
}

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

// Countdown timer logic
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

// Adjust canvas size on window resize
window.addEventListener('resize', () => {
  starsCanvas.width = fireworksCanvas.width = window.innerWidth;
  starsCanvas.height = fireworksCanvas.height = window.innerHeight;
  drawStars();
});

// Start animations
setInterval(createFirework, 800);
animateFireworks();
drawStars();
setInterval(updateCountdown, 1000);
