const hunger = document.getElementById("hunger");
const health = document.getElementById("health");
const teach = document.getElementById("teach");
const forest = document.getElementById("forest");

const hunger_text = document.getElementById("carousel-1");
const health_text = document.getElementById("carousel-2");
const teach_text = document.getElementById("carousel-3");
const forest_text = document.getElementById("carousel-4");

const images = [hunger, health, teach, forest];
const texts = [hunger_text, health_text, teach_text, forest_text];
const dots = document.querySelectorAll(".dot");

const input = document.getElementById("input");
const buttons = document.querySelectorAll(".button");
const custom = document.getElementById("custom-in");
const error = document.getElementById("error-message");

let current = 0;
let interval;

function showSlide(index) {
  images.forEach((img, i) => {
    img.classList.toggle("active", i === index);
    texts[i].classList.toggle("active", i === index);
    dots[i].classList.toggle("active", i === index);
  });
  current = index;
}

function startAutoSlide() {
  clearInterval(interval);
  interval = setInterval(() => {
    showSlide((current + 1) % images.length);
  }, 4000);
}

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    clearInterval(interval);
    showSlide(i);
    startAutoSlide();
  });
});

showSlide(0);
startAutoSlide();

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const amount = Number(btn.textContent.replace("₹", "").trim());
    input.innerText = "₹ " + amount;
    updateImpact(amount);
  });
});

function updateImpact(amount) {
  if (amount < 50) {
    hunger_text.innerText = ``;
    health_text.innerText = ``;
    teach_text.innerText = ``;
    forest_text.innerText = ``;
    return;
  }

  const food = Math.floor(amount / 50);
  const healthCheckup = Math.floor(amount / 200);
  const education = Math.floor(amount / 100);
  const trees = Math.floor(amount / 10);

  hunger_text.innerText = `You help in feeding ${food} ${
    food === 1 ? "person" : "people"
  }.`;
  health_text.innerText = `You provide health checkup for ${healthCheckup} ${
    healthCheckup === 1 ? "person" : "people"
  }.`;
  teach_text.innerText = `You provide education for ${education} ${
    education === 1 ? "person" : "people"
  }.`;
  forest_text.innerText = `You help in saving ${trees} ${
    trees === 1 ? "tree" : "trees"
  }.`;
}

function getCustomAmount() {
  const raw = custom.value.trim();
  return Number(raw) || 0;
}

custom.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const amount = getCustomAmount();
    if (amount < 50) {
      error.style.display = "block";
      input.innerText = "₹ 0";
      updateImpact(0);
      return;
    }
    error.style.display = "none";
    input.innerText = "₹ " + amount;
    updateImpact(amount);
  }
});

custom.addEventListener("input", () => {
  const amount = getCustomAmount();
  error.style.display = amount > 0 && amount < 50 ? "block" : "none";
});
