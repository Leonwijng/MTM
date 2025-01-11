const canvas = document.getElementById('space');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const numStars = 200;

function createStar() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    z: Math.random() * canvas.width,
    radius: Math.random() * 1.5 + 0.5,
  };
}

function initStars() {
  for (let i = 0; i < numStars; i++) {
    stars.push(createStar());
  }
}

function moveStars() {
  for (const star of stars) {
    star.z -= 2;
    if (star.z <= 0) {
      Object.assign(star, createStar());
      star.z = canvas.width;
    }
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const star of stars) {
    const x = (star.x - canvas.width / 2) * (canvas.width / star.z) + canvas.width / 2;
    const y = (star.y - canvas.height / 2) * (canvas.width / star.z) + canvas.height / 2;
    const radius = star.radius * (canvas.width / star.z);

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
  }
}

function animate() {
  moveStars();
  drawStars();
  requestAnimationFrame(animate);
}

initStars();
animate();




