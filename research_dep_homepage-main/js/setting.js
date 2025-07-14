window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('charider_settings');
  if (saved) {
    const settings = JSON.parse(saved);
    document.getElementById('bgm-toggle').value = settings.bgm;
    document.getElementById('difficulty').value = settings.difficulty;
    document.getElementById('speed').value = settings.speed;
  }
});

document.getElementById('setting-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const bgm = document.getElementById('bgm-toggle').value;
  const difficulty = document.getElementById('difficulty').value;
  const speed = document.getElementById('speed').value;
  const settings = { bgm, difficulty, speed };
  localStorage.setItem('charider_settings', JSON.stringify(settings));
  const msg = document.getElementById('save-message');
  msg.style.display = 'block';
  setTimeout(() => { msg.style.display = 'none'; }, 1200);
});