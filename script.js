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

// Text afstanden update
let distanceToGo = 192;
let distanceCovered = 38;

function updateDistances() {
  distanceToGo -= 1;
  distanceCovered += 1;

  document.querySelector('.distance-info .afstand:nth-child(2)').textContent = `${distanceToGo}mln. km`;
  document.querySelector('.distance-info .afstand:nth-child(4)').textContent = `${distanceCovered}mln. km`;

  // DIT IS VOOR TESTEN IN CONSOLE OF INTERVAL WERKT
  console.log(`Veranderd naar: AfstandTeGaan = ${distanceToGo}mln. km, AfstandAfgelegd = ${distanceCovered}mln. km`);

  setRandomInterval();
}

function setRandomInterval() {
  const intervals = [7000, 10000, 15000];
  const randomInterval = intervals[Math.floor(Math.random() * intervals.length)];
  
  // DIT IS VOOR TESTEN IN CONSOLE OF INTERVAL WERKT
  console.log(`Volgende afstand change in ${randomInterval / 1000} seconden`);

  setTimeout(updateDistances, randomInterval);
}

// Begint interval
setRandomInterval();