(() => {
  const SCREEN_WIDTH = 500, SCREEN_HEIGHT = 700;

  function resizeScreen() {
    const ratio = Math.min(
      1.0,
      window.innerWidth / SCREEN_WIDTH,
      (window.innerHeight - 25) / SCREEN_HEIGHT,
    );
    const wrapper = document.getElementById('game-wrapper');
    wrapper.style.width = `${SCREEN_WIDTH * ratio}px`;
    wrapper.style.height = `${SCREEN_HEIGHT * ratio}px`;
    const root = document.getElementById('root');
    root.style.transform = `scale(${ratio})`;
  }

  resizeScreen();
  window.addEventListener('resize', resizeScreen);
})();
