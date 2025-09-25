// done: added text bubbles
// done: added mute button

// todo: tree hints with brighter text
// todo: fireflies
// todo: firefly count
// todo: sound effects
// todo: wisdom tree
// todo: link to other scenes

window.addEventListener('DOMContentLoaded', function() {
  const introScreen = document.querySelector('.intro-screen');
  const introBtn = document.querySelector('.intro-btn');
  const curtain = document.querySelector('.curtain');
  const bgMusic = document.getElementById('bg-music');
  const muteBtn = document.getElementById('mute-btn');
  const muteIcon = muteBtn.querySelector('i');

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
      startThoughtBubbles();
    }, 1200);
  });

  // Mute button logic
  muteBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    bgMusic.muted = !bgMusic.muted;
    if (bgMusic.muted) {
      muteIcon.classList.remove('fa-volume-high');
      muteIcon.classList.add('fa-volume-xmark');
    } else {
      muteIcon.classList.remove('fa-volume-xmark');
      muteIcon.classList.add('fa-volume-high');
    }
  });

  // Thought bubble logic
  const treePositions = [
    {left: '15%', bottom: '18%'}, // left tree 1
    {left: '30%', bottom: '25%'}, // left tree 2
    {right: '20%', bottom: '20%'}, // right tree 1
    {right: '35%', bottom: '22%'}  // right tree 2
  ];

  const bubbleTexts = [
    "Hurr durr, I am tree...",
    "Two plus banana equals seven.",
    "Does a root dream of soil?",
    "Knock knock... wait who?",
    "I remembered... something... maybe a leaf?",
    "If I stand here, do I become furniture?",
    "Why is sky so big? I need a ladder.",
    "Hmm. Sand is not a fruit.",
    "I once tried to hum but forgot the tune.",
    "Behold: the great quiet sneeze."
  ];

  let bubbleActive = false;
  let lastTreeIndex = null;

  function startThoughtBubbles() {
    setInterval(() => {
      if (!bubbleActive) {
        spawnBubble();
      }
    }, 2200 + Math.random() * 1800);
  }

  function spawnBubble() {
    bubbleActive = true;
    // Pick a random tree position, not the same as last time
    let treeIndex;
    do {
      treeIndex = Math.floor(Math.random() * treePositions.length);
    } while (treeIndex === lastTreeIndex && treePositions.length > 1);
    lastTreeIndex = treeIndex;
    const pos = treePositions[treeIndex];

    // Pick a random text
    const text = bubbleTexts[Math.floor(Math.random() * bubbleTexts.length)];
    // Create bubble element
    const bubble = document.createElement('div');
    bubble.className = 'thought-bubble';
    // Position bubble
    Object.entries(pos).forEach(([key, value]) => {
      bubble.style[key] = value;
    });
    bubble.style.position = 'fixed';
    bubble.style.zIndex = 10;
    bubble.style.pointerEvents = 'none';

    // Typewriter effect
    const span = document.createElement('span');
    bubble.appendChild(span);
    document.body.appendChild(bubble);

    let i = 0;
    function type() {
      if (i <= text.length) {
        span.textContent = text.slice(0, i);
        i++;
        setTimeout(type, 40 + Math.random() * 40);
      } else {
        setTimeout(() => {
          bubble.style.opacity = '0';
          setTimeout(() => {
            bubble.remove();
            bubbleActive = false;
          }, 600);
        }, 1800 + Math.random() * 1200);
      }
    }
    type();
  }
});