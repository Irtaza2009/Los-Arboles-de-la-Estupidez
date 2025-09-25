// done: music
// done: curtain open animation
// done: intro screen with button to start
// done: custom cursor

window.addEventListener('DOMContentLoaded', function() {
  const introScreen = document.querySelector('.intro-screen');
  const introBtn = document.querySelector('.intro-btn');
  const curtain = document.querySelector('.curtain');
  const bgMusic = document.getElementById('bg-music');

  introBtn.addEventListener('click', function() {
    introScreen.style.display = 'none';
    curtain.classList.remove('curtain-hidden');
    // Start background music
    bgMusic.volume = 0.5;
    bgMusic.play();
  });

  curtain.addEventListener('click', function() {
    curtain.classList.add('open');
    setTimeout(() => {
      curtain.style.display = 'none';
    }, 1200);
  });
});