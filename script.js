const slides = Array.from(document.querySelectorAll(".slide"));
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const slideCounter = document.getElementById("slideCounter");
const slideTitle = document.getElementById("slideTitle");
const dotsHost = document.getElementById("dots");

let currentIndex = 0;

const dots = dotsHost
  ? slides.map((slide, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "dot";
      button.setAttribute("aria-label", `跳转到第 ${index + 1} 页：${slide.dataset.title}`);
      button.addEventListener("click", () => goTo(index));
      dotsHost.appendChild(button);
      return button;
    })
  : [];

function render() {
  slides.forEach((slide, index) => {
    slide.classList.toggle("is-active", index === currentIndex);
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle("is-active", index === currentIndex);
  });

  if (slideCounter) {
    slideCounter.textContent = `${String(currentIndex + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
  }

  if (slideTitle) {
    slideTitle.textContent = slides[currentIndex].dataset.title || `第 ${currentIndex + 1} 页`;
  }
}

function goTo(index) {
  currentIndex = Math.max(0, Math.min(index, slides.length - 1));
  render();
}

function step(delta) {
  goTo(currentIndex + delta);
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => step(-1));
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => step(1));
}

document.addEventListener("keydown", (event) => {
  if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(event.key)) {
    event.preventDefault();
    step(1);
  }

  if (["ArrowLeft", "ArrowUp", "PageUp", "Backspace"].includes(event.key)) {
    event.preventDefault();
    step(-1);
  }

  if (event.key === "Home") {
    event.preventDefault();
    goTo(0);
  }

  if (event.key === "End") {
    event.preventDefault();
    goTo(slides.length - 1);
  }
});

render();
