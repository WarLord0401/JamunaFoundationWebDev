const health = document.getElementById("health");
const forest = document.getElementById("forest");
const teach = document.getElementById("teach");
const hunger = document.getElementById("hunger");

const input = document.getElementById("input");
const buttons = document.querySelectorAll("button");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const amount = parseInt(btn.innerHTML.replace("₹ ", ""));
    input.innerText = "₹ " + amount;
    updateImpact(amount);
  });
});

function updateImpact(amount) {
  document.getElementById(
    "carousel-1"
  ).innerText = `You donate food for ${Math.ceil(amount / 50)} people.`;
  document.getElementById(
    "carousel-2"
  ).innerText = `You provide health checkup for ${Math.ceil(
    amount / 200
  )} people.`;
  document.getElementById(
    "carousel-3"
  ).innerText = `You provide eduction for ${Math.ceil(amount / 100)} people.`;
  document.getElementById(
    "carousel-4"
  ).innerText = `You help in saving ${Math.ceil(amount / 10)} trees.`;
}

const custom = document.getElementById("custom-in");
custom.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const raw = custom.value.trim();
    const amount = Number(raw) || 0;

    input.innerText = "₹" + amount;
    updateImpact(amount);
  }
});
