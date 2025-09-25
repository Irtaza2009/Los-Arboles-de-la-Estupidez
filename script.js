/*
  Behavior:
  - Each .tree will periodically show dots -> bubble -> typed thought -> hide.
  - Timings randomized per tree.
  - Lists of sample "stupid thoughts" are below — replace with any text you want.
*/

(function(){
  const trees = Array.from(document.querySelectorAll('.tree'));

  // sample silly/stupid lines — these will be typed inside the bubbles
  const thoughts = [
    "Hurr durr, I am tree 🌳",
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

  // typewriter function returns a Promise that resolves when done
  function typeText(el, text, speed=40) {
    el.textContent = "";
    return new Promise(resolve => {
      let i=0;
      const t = setInterval(()=>{
        el.textContent = text.slice(0, ++i);
        if(i >= text.length){
          clearInterval(t);
          resolve();
        }
      }, speed + Math.random()*40);
    });
  }

  // erase function (optional) - not used here, we simply hide the bubble
  function wait(ms){ return new Promise(r=>setTimeout(r, ms)); }

  // for each tree, start an independent loop
  trees.forEach((tree, idx) => {
    const dots = tree.querySelector('.dots');
    const bubble = tree.querySelector('.bubble');
    const writer = tree.querySelector('.typewriter');

    // slightly vary per tree for human feel
    const baseDelay = 2200 + Math.random()*3800 + idx*300;

    async function loop() {
      // initial random wait so they don't sync on page load
      await wait(Math.random()*4000 + baseDelay);

      while(true){
        // small pause before each thought
        const pre = 1500 + Math.random()*4000;
        await wait(pre);

        // show dots (rise animation)
        dots.classList.add('show');
        // show bubble
        bubble.classList.add('show');

        // pick a random thought
        const thought = thoughts[Math.floor(Math.random()*thoughts.length)];

        // type it
        await typeText(writer, thought, 30 + Math.random()*40);

        // hold on screen for a bit (reading time depends on length)
        const hold = 1800 + thought.length * 50 + Math.random()*1800;
        await wait(hold);

        // hide bubble + dots
        bubble.classList.remove('show');
        dots.classList.remove('show');

        // clear typed text for next cycle
        writer.textContent = "";

        // small pause before next
        await wait(1200 + Math.random()*2800);
      }
    }

    // start loop (no await)
    loop();
  });

  // Accessibility: pause animations if user prefers reduced motion
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  function handleReduceMotion() {
    if(mq.matches){
      document.querySelectorAll('.dot').forEach(d => d.style.animation = 'none');
      document.querySelectorAll('.bubble').forEach(b => { b.classList.add('show'); b.style.transition='none'; });
      // show static example text
      document.querySelectorAll('.typewriter').forEach((s,i) => {
        s.textContent = thoughts[i % thoughts.length];
      });
    }
  }
  handleReduceMotion();
  mq.addEventListener && mq.addEventListener('change', handleReduceMotion);

})();

window.addEventListener('DOMContentLoaded', function() {
  const introOverlay = document.querySelector('.intro-overlay');
  const introBtn = document.querySelector('.intro-btn');
  const stage = document.querySelector('.stage');
  const bushLeft = document.querySelector('.bush-left');
  const bushRight = document.querySelector('.bush-right');
  const bg = document.querySelector('.bg');
  const overlay = document.querySelector('.overlay');

  // Step 1: On button click, zoom in and hide intro
  introBtn.addEventListener('click', function() {
    introOverlay.classList.add('hide');
    stage.classList.add('zoomed');
    setTimeout(() => {
      bushLeft.classList.add('show');
      bushRight.classList.add('show');
    }, 700); // after zoom
  });

  // Step 2: On bush click, slide bushes away and reveal background
  function bushesAway() {
    bushLeft.classList.add('hide-left');
    bushRight.classList.add('hide-right');
    setTimeout(() => {
      bushLeft.style.display = 'none';
      bushRight.style.display = 'none';
      bg.classList.add('show');
      overlay.classList.add('show');
      stage.classList.remove('zoomed');
    }, 1000);
  }
  bushLeft.addEventListener('click', bushesAway);
  bushRight.addEventListener('click', bushesAway);
});