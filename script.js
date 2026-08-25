/* =========================================================
   PASALA KEERTHISHARIN
   PREMIUM PORTFOLIO INTERACTION ENGINE
========================================================= */

gsap.registerPlugin(ScrollTrigger);


/* =========================================================
   CUSTOM CURSOR
========================================================= */

const dot =
  document.querySelector('.cursor-dot');

const ring =
  document.querySelector('.cursor-ring');


let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let ringX = mouseX;
let ringY = mouseY;


window.addEventListener('mousemove', e => {

  mouseX = e.clientX;
  mouseY = e.clientY;

  if(dot){

    dot.style.left =
      `${mouseX}px`;

    dot.style.top =
      `${mouseY}px`;

  }

});


function cursorLoop(){

  ringX +=
    (mouseX - ringX) * .13;

  ringY +=
    (mouseY - ringY) * .13;


  if(ring){

    ring.style.left =
      `${ringX}px`;

    ring.style.top =
      `${ringY}px`;

  }


  requestAnimationFrame(
    cursorLoop
  );

}


cursorLoop();


/* =========================================================
   CURSOR HOVER
========================================================= */

document
  .querySelectorAll(
    'a, .tilt-card, .magnetic, .skill, .hero-photo-frame'
  )
  .forEach(el => {

    el.addEventListener(
      'mouseenter',
      () => {

        ring?.classList.add(
          'active'
        );

      }
    );


    el.addEventListener(
      'mouseleave',
      () => {

        ring?.classList.remove(
          'active'
        );

      }
    );

  });



/* =========================================================
   MAGNETIC ELEMENTS
========================================================= */

document
  .querySelectorAll('.magnetic')
  .forEach(el => {

    let currentX = 0;
    let currentY = 0;

    let targetX = 0;
    let targetY = 0;

    let animationFrame;


    function animateMagnetic(){

      currentX +=
        (targetX - currentX) * .12;

      currentY +=
        (targetY - currentY) * .12;


      el.style.transform =
        `translate3d(
          ${currentX}px,
          ${currentY}px,
          0
        )`;


      animationFrame =
        requestAnimationFrame(
          animateMagnetic
        );

    }


    el.addEventListener(
      'mouseenter',
      () => {

        cancelAnimationFrame(
          animationFrame
        );

        animateMagnetic();

      }
    );


    el.addEventListener(
      'mousemove',
      e => {

        const rect =
          el.getBoundingClientRect();


        targetX =
          (
            e.clientX -
            rect.left -
            rect.width / 2
          ) * .10;


        targetY =
          (
            e.clientY -
            rect.top -
            rect.height / 2
          ) * .10;

      }
    );


    el.addEventListener(
      'mouseleave',
      () => {

        targetX = 0;
        targetY = 0;


        setTimeout(() => {

          cancelAnimationFrame(
            animationFrame
          );

          el.style.transform = '';

        }, 350);

      }
    );

  });



/* =========================================================
   PROJECT CARDS
   ULTRA SMOOTH PREMIUM MOTION
========================================================= */

const cards =
  document.querySelectorAll(
    '.tilt-card'
  );


cards.forEach(card => {

  let currentRX = 0;
  let currentRY = 0;

  let targetRX = 0;
  let targetRY = 0;

  let currentScale = 1;
  let targetScale = 1;

  let animationFrame = null;


  function animateCard(){

    currentRX +=
      (targetRX - currentRX) * .055;

    currentRY +=
      (targetRY - currentRY) * .055;

    currentScale +=
      (targetScale - currentScale) * .065;


    card.style.transform =
      `perspective(1400px)
       rotateX(${currentRX}deg)
       rotateY(${currentRY}deg)
       translateZ(0)
       scale3d(
         ${currentScale},
         ${currentScale},
         ${currentScale}
       )`;


    animationFrame =
      requestAnimationFrame(
        animateCard
      );

  }


  card.addEventListener(
    'mouseenter',
    () => {

      targetScale =
        1.012;

      cancelAnimationFrame(
        animationFrame
      );

      animateCard();

    }
  );


  card.addEventListener(
    'mousemove',
    e => {

      const rect =
        card.getBoundingClientRect();


      const x =
        e.clientX -
        rect.left;


      const y =
        e.clientY -
        rect.top;


      /*
         VERY LOW ROTATION
         Prevents hard movement.
      */

      targetRX =
        (
          y -
          rect.height / 2
        ) / -75;


      targetRY =
        (
          x -
          rect.width / 2
        ) / 75;


      card.style.setProperty(
        '--mx',
        `${x}px`
      );


      card.style.setProperty(
        '--my',
        `${y}px`
      );

    }
  );


  card.addEventListener(
    'mouseleave',
    () => {

      targetRX = 0;
      targetRY = 0;
      targetScale = 1;


      cancelAnimationFrame(
        animationFrame
      );


      animateCard();


      setTimeout(() => {

        if(
          Math.abs(currentRX) < .03 &&
          Math.abs(currentRY) < .03 &&
          Math.abs(currentScale - 1) < .003
        ){

          cancelAnimationFrame(
            animationFrame
          );


          currentRX = 0;
          currentRY = 0;
          currentScale = 1;


          card.style.transform =
            '';

        }

      }, 700);

    }
  );

});



/* =========================================================
   SCROLL REVEALS
========================================================= */

gsap.utils
  .toArray('.reveal')
  .forEach(el => {

    /*
       Photo uses its own animation,
       so don't overwrite its transform.
    */

    if(
      el.classList.contains(
        'hero-photo-wrap'
      )
    ){

      gsap.fromTo(
        el,
        {
          opacity:0,
          x:70,
          scale:.96
        },
        {
          opacity:1,
          x:0,
          scale:1,
          duration:1.25,
          ease:'power4.out',
          delay:.35
        }
      );

      return;

    }


    gsap.to(
      el,
      {
        opacity:1,
        y:0,
        duration:1.1,
        ease:'power4.out',

        scrollTrigger:{
          trigger:el,
          start:'top 88%',
          once:true
        }

      }
    );

  });



/* =========================================================
   HERO ANIMATION
========================================================= */

/* =========================================================
   HERO DESCRIPTION + ACTIONS
   STABLE DESKTOP ANIMATION
========================================================= */

gsap.fromTo(
  '.hero-sub',
  {
    y:25,
    opacity:0
  },
  {
    y:0,
    opacity:1,
    duration:1,
    ease:'power3.out',
    delay:.65,
    clearProps:'transform'
  }
);


gsap.fromTo(
  '.hero-actions',
  {
    y:25,
    opacity:0
  },
  {
    y:0,
    opacity:1,
    duration:1,
    ease:'power3.out',
    delay:.82,
    clearProps:'transform'
  }
);



/* =========================================================
   PREMIUM PROFILE PHOTO PARALLAX
========================================================= */

const heroPhoto =
  document.querySelector(
    '.hero-photo-frame'
  );

const heroPhotoWrap =
  document.querySelector(
    '.hero-photo-wrap'
  );


let photoTargetX = 0;
let photoTargetY = 0;

let photoCurrentX = 0;
let photoCurrentY = 0;


if(heroPhoto && heroPhotoWrap){

  window.addEventListener(
    'mousemove',
    e => {

      /*
         Disable strong movement.
         The portrait should feel expensive,
         not like a floating 3D object.
      */

      photoTargetX =
        (
          e.clientX /
          window.innerWidth -
          .5
        ) * 10;


      photoTargetY =
        (
          e.clientY /
          window.innerHeight -
          .5
        ) * 8;

    }
  );


  function animatePhoto(){

    photoCurrentX +=
      (
        photoTargetX -
        photoCurrentX
      ) * .045;


    photoCurrentY +=
      (
        photoTargetY -
        photoCurrentY
      ) * .045;


    heroPhoto.style.transform =
      `translate3d(
        ${photoCurrentX}px,
        ${photoCurrentY}px,
        0
      )`;


    requestAnimationFrame(
      animatePhoto
    );

  }


  animatePhoto();

}



/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuBtn =
  document.querySelector(
    '.menu-btn'
  );


const links =
  document.querySelector(
    '.nav-links'
  );


menuBtn?.addEventListener(
  'click',
  () => {

    const isOpen =
      links?.classList.toggle(
        'open'
      );


    menuBtn.classList.toggle(
      'open'
    );


    menuBtn.setAttribute(
      'aria-expanded',
      isOpen ? 'true' : 'false'
    );

  }
);


links
  ?.querySelectorAll('a')
  .forEach(link => {

    link.addEventListener(
      'click',
      () => {

        links.classList.remove(
          'open'
        );


        menuBtn?.classList.remove(
          'open'
        );


        menuBtn?.setAttribute(
          'aria-expanded',
          'false'
        );

      }
    );

  });



/* =========================================================
   CLOSE MOBILE MENU
========================================================= */

document.addEventListener(
  'click',
  e => {

    if(
      !menuBtn ||
      !links
    ){

      return;

    }


    const clickedInsideNav =
      e.target.closest(
        '.nav'
      );


    if(
      !clickedInsideNav &&
      links.classList.contains(
        'open'
      )
    ){

      links.classList.remove(
        'open'
      );


      menuBtn.classList.remove(
        'open'
      );


      menuBtn.setAttribute(
        'aria-expanded',
        'false'
      );

    }

  }
);



/* =========================================================
   NAVBAR — BRIGHT SECTION DETECTION
========================================================= */

const nav =
  document.querySelector(
    '.nav'
  );


const brightSections =
  document.querySelectorAll(
    '.about, .skills'
  );


function updateNavbarTheme(){

  if(!nav){
    return;
  }


  const navRect =
    nav.getBoundingClientRect();


  let onBrightSection =
    false;


  brightSections.forEach(
    section => {

      const rect =
        section.getBoundingClientRect();


      const overlap =
        navRect.bottom > rect.top &&
        navRect.top < rect.bottom;


      if(overlap){

        onBrightSection =
          true;

      }

    }
  );


  document.body.classList.toggle(
    'nav-on-bright',
    onBrightSection
  );

}


window.addEventListener(
  'scroll',
  updateNavbarTheme,
  {
    passive:true
  }
);


window.addEventListener(
  'resize',
  updateNavbarTheme
);


updateNavbarTheme();



/* =========================================================
   HERO PHOTO LOAD EFFECT
========================================================= */

const profileImage =
  document.querySelector(
    '.hero-photo'
  );


if(profileImage){

  profileImage.addEventListener(
    'load',
    () => {

      profileImage.classList.add(
        'loaded'
      );

    }
  );

}



/* =========================================================
   IMAGE ERROR HANDLING
========================================================= */

if(profileImage){

  profileImage.addEventListener(
    'error',
    () => {

      console.warn(
        'Profile image not found. Make sure the file exists at:',
        'assets/keerthi-profile.png'
      );

    }
  );

}



/* =========================================================
   REFRESH SCROLLTRIGGER
========================================================= */

window.addEventListener(
  'load',
  () => {

    ScrollTrigger.refresh();

  }
);
