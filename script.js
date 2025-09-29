// done: wisdom tree text
// done: quote bubble shape improvements

window.addEventListener('DOMContentLoaded', function() {
  // Preload both background images
  const preloadBg1 = new Image();
  preloadBg1.src = "https://hc-cdn.hel1.your-objectstorage.com/s/v3/fbad009f4b5c9f0afdd307c92d119792be2777d4__e0cbe516-8cd2-4faf-8a09-1bad815bf8a6__3_.jpg";
  const preloadBg2 = new Image();
  preloadBg2.src = "https://hc-cdn.hel1.your-objectstorage.com/s/v3/3d204b2a7b357e40fab88e9d7c95d78fb17b49f6__6a88aa72-b954-4175-a911-08eceab5ad37__1_.jpg";

  const introScreen = document.querySelector('.intro-screen');
  const introBtn = document.querySelector('.intro-btn');
  const curtain = document.querySelector('.curtain');
  const bgMusic = document.getElementById('bg-music');
  const muteBtn = document.getElementById('mute-btn');
  const muteIcon = muteBtn.querySelector('i');
  const wisdomCurtain = document.querySelector('.wisdom-curtain');

  let thoughtBubbleInterval = null;

  introBtn.addEventListener('click', function() {
    introScreen.style.display = 'none';
    curtain.classList.remove('curtain-hidden');
    // Start background music
    bgMusic.volume = 0.8;
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

  const hintTexts = [
    "Orbs like to drift near the roots.",
    "Catch the golden orbs before they float away!",
    "Sometimes an orb hides behind a tree.",
    "Orbs sparkle when you tap them.",
    "The more orbs you catch, the closer you get to wisdom."
  ];

  let bubbleActive = false;
  let lastTreeIndex = null;

  function startThoughtBubbles() {
    // Save interval so we can clear it later
    thoughtBubbleInterval = setInterval(() => {
      if (!bubbleActive) {
        spawnBubble();
      }
    }, 2200 + Math.random() * 1800);
  }

  function stopThoughtBubbles() {
    if (thoughtBubbleInterval) {
      clearInterval(thoughtBubbleInterval);
      thoughtBubbleInterval = null;
    }
    // Remove any remaining bubbles
    document.querySelectorAll('.thought-bubble').forEach(b => b.remove());
    bubbleActive = false;
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

    // Decide if this bubble is a hint (1 in 4 chance)
    const isHint = Math.random() < 0.25;
    const text = isHint
      ? hintTexts[Math.floor(Math.random() * hintTexts.length)]
      : bubbleTexts[Math.floor(Math.random() * bubbleTexts.length)];

    // Create bubble element
    const bubble = document.createElement('div');
    bubble.className = 'thought-bubble';
    if (isHint) bubble.classList.add('hint-bubble');

    // Left or right side indicator
    if (pos.left) {
      bubble.classList.add('bubble-left');
    } else if (pos.right) {
      bubble.classList.add('bubble-right');
    }


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

  // Orb

  let orbClicks = 0; // counter

  function spawnOrb(delay = 0) {
    const orb = document.createElement("div");
    orb.classList.add("orb");

    // random position, keep orb inside viewport
    orb.style.top = `${10 + Math.random() * 75}%`;
    orb.style.left = `${10 + Math.random() * 75}%`;

    // random animation offset
    orb.style.animationDelay = `${Math.random() * 10}s`;

    setTimeout(() => {
      document.body.appendChild(orb);

      orb.addEventListener("click", (e) => {
        e.stopPropagation();
        const rect = orb.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        // remove orb
        orb.remove();

        // play sparkle sound
        const sparkle = new Audio("https://hc-cdn.hel1.your-objectstorage.com/s/v3/01a8c2f72077d10dbd075ae7c010b07dd2ce5984_sparkle_audio.mp4");
        sparkle.volume = 0.9;
        sparkle.play().catch(() => {});

        // update counter (only the number)
        orbClicks++;
        const counter = document.getElementById("orb-counter");
        if (counter) {
          const numberNode = counter.querySelector(".orb-count");
          if (numberNode) {
            numberNode.textContent = orbClicks;
          }
        }

        // Wisdom tree logic
        if (orbClicks === 5) {
          // Remove all orbs and orb counter
          document.querySelectorAll('.orb').forEach(o => o.remove());
          if (counter) counter.style.display = 'none';

          // Stop thought bubbles
          stopThoughtBubbles();

          // Show wisdom curtain
          wisdomCurtain.classList.remove('curtain-hidden');

          // When user taps wisdom curtain, do curtain reveal and change background
          wisdomCurtain.addEventListener('click', function wisdomCurtainHandler() {
            wisdomCurtain.classList.add('open');
            setTimeout(() => {
              wisdomCurtain.style.display = 'none';
              // Change background image
              document.body.style.backgroundImage = 'url("https://hc-cdn.hel1.your-objectstorage.com/s/v3/3d204b2a7b357e40fab88e9d7c95d78fb17b49f6__6a88aa72-b954-4175-a911-08eceab5ad37__1_.jpg")';
              showWisdomTreeLinks();
            }, 1200);
            // Remove this event listener after first tap
            wisdomCurtain.removeEventListener('click', wisdomCurtainHandler);
          });
        }

        // create sparks
        for (let i = 0; i < 8; i++) {
          const spark = document.createElement("div");
          spark.classList.add("spark");
          document.body.appendChild(spark);

          spark.style.left = `${x}px`;
          spark.style.top = `${y}px`;

          const angle = (i / 8) * (2 * Math.PI);
          const distance = 30 + Math.random() * 20;
          const dx = Math.cos(angle) * distance;
          const dy = Math.sin(angle) * distance;

          spark.style.setProperty("--dx", `${dx}px`);
          spark.style.setProperty("--dy", `${dy}px`);

          setTimeout(() => spark.remove(), 600);
        }

        // respawn another after 2s
        if (orbClicks < 10) spawnOrb(2000);
      });
    }, delay);
  }



function showWisdomTreeLinks() {
  document.querySelector('.wisdom-tree-links').style.display = 'block';

  // Spawn wisdom bubble
  const bubble = document.createElement('div');
  bubble.className = 'thought-bubble wisdom-bubble';
  bubble.style.position = 'fixed';
  bubble.style.left = '45%';
  bubble.style.top = '40%';
  bubble.style.zIndex = 20;
  bubble.style.pointerEvents = 'none';

      
  bubble.classList.add('bubble-left');
   

  const text = "You have reached the Wisdom Tree... What shall your next destination be?";

  const span = document.createElement('span');
  bubble.appendChild(span);
  document.body.appendChild(bubble);

  // Typewriter effect for wisdom bubble
  let i = 0;
  (function type() {
    if (i <= text.length) {
      span.textContent = text.slice(0, i);
      i++;
      setTimeout(type, 40 + Math.random() * 40);
    }
  })();
}


  function hideWisdomTreeLinks() {
    document.querySelector('.wisdom-tree-links').style.display = 'none';
  }

  // Initial Orbs
  spawnOrb();
  spawnOrb();
  spawnOrb();
});
