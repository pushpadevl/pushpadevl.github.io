document.addEventListener('DOMContentLoaded', () => {
const el = document.getElementById('typewriter');
const text = '"The best way to predict the future is to invent it."';
const speed = 75; // ms per character
const afterPause = 300; // optional pause after finishing

let i = 0;
el.classList.add('typing');

function type() {
if (i <= text.length) {
el.textContent = text.slice(0, i++);
setTimeout(type, speed);
} else {
// stop caret blink after a short pause
setTimeout(() => el.classList.remove('typing'), afterPause);
}
}

type();
});