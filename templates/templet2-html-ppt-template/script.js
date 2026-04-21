const slides = Array.from(document.querySelectorAll('.slide'));
const frame = document.querySelector('.deck-frame');
const stage = document.querySelector('.deck-stage');
let currentIndex = 0;

function resizeStage() {
  if (!frame || !stage) return;
  const scale = Math.min(frame.clientWidth / 1280, frame.clientHeight / 720);
  stage.style.transform = `scale(${scale})`;
}

function render() {
  slides.forEach((slide, index) => {
    slide.classList.toggle('is-active', index === currentIndex);
  });
}

function goTo(index) {
  currentIndex = Math.max(0, Math.min(index, slides.length - 1));
  render();
}

function step(delta) {
  goTo(currentIndex + delta);
}

document.addEventListener('keydown', (event) => {
  if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(event.key)) {
    event.preventDefault();
    step(1);
  }

  if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace'].includes(event.key)) {
    event.preventDefault();
    step(-1);
  }

  if (event.key === 'Home') {
    event.preventDefault();
    goTo(0);
  }

  if (event.key === 'End') {
    event.preventDefault();
    goTo(slides.length - 1);
  }
});

window.addEventListener('resize', resizeStage);
resizeStage();
render();
