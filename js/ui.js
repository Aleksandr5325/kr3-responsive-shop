// На телефоне панели закрыты, на широком экране раскрыты.
// details/summary уже умеют работать с клавиатурой без ручного ARIA.
const panels = [
  [document.querySelector('.mobile-menu'), 768],
  [document.querySelector('.filter-panel'), 1024],
];
panels.forEach(([panel, width]) => {
  if (!panel) return;
  const screen = matchMedia(`(min-width: ${width}px)`);
  const update = () => { panel.open = screen.matches; };
  update();
  screen.addEventListener('change', update);
});

const feedback = document.getElementById('feedback-form');
if (feedback) {
  feedback.addEventListener('submit', (event) => {
    event.preventDefault();
    document.getElementById('feedback-status').hidden = false;
  });
}
