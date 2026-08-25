/* =========================================================
   PASALA KEERTHISHARIN
   PREMIUM PORTFOLIO INTERACTION ENGINE
========================================================= */

gsap.registerPlugin(ScrollTrigger);


/* =========================================================
   CURSOR
========================================================= */

const dot =
  document.querySelector('.cursor-dot');

const ring =
  document.querySelector('.cursor-ring');

let mouseX = innerWidth / 2;
let mouseY = innerHeight / 2;

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
    (mouseX - ringX) *
    0.13;

  ringY +=
    (mouseY - ringY) *
    0.13;


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
    'a, .tilt-card, .magnetic, .skill'
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
        (targetX - currentX) *
        0.12;

      currentY +=
        (targetY - currentY) *
        0.12;


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
          ) * 0.10;


        targetY =
          (
            e.clientY -
            rect.top -
            rect.height / 2
          ) * 0.10;

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

        },350);

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

    /*
      Extremely soft interpolation.

      The old card movement was direct.
      This makes the card "float" toward
      the cursor instead.
    */

    currentRX +=
      (targetRX - currentRX) *
      0.055;


    currentRY +=
      (targetRY - currentRY) *
      0.055;


    currentScale +=
      (targetScale - currentScale) *
      0.065;


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


  /* =======================================================
     ENTER
  ======================================================= */

  card.addEventListener(
    'mouseenter',
    () => {

      targetScale = 1.012;


      cancelAnimationFrame(
        animationFrame
      );


      animateCard();

    }
  );


  /* =======================================================
     MOVE
  ======================================================= */

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
        Very low rotation sensitivity.

        This is intentionally much softer
        than the original /-24 and /24.
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


      /*
        Used by the CSS cursor-following
        highlight.
      */

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


  /* =======================================================
     LEAVE
  ======================================================= */

  card.addEventListener(
    'mouseleave',
    () => {

      targetRX = 0;
      targetRY = 0;
      targetScale = 1;


      /*
        Keep interpolation running so
        the card gently settles instead
        of snapping back.
      */

      cancelAnimationFrame(
        animationFrame
      );


      animateCard();


      setTimeout(() => {

        if(
          Math.abs(currentRX) < 0.03 &&
          Math.abs(currentRY) < 0.03 &&
          Math.abs(currentScale - 1) < 0.003
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

      },700);

    }
  );

});


/* =========================================================
   SCROLL REVEALS
========================================================= */

gsap.utils
  .toArray('.reveal')
  .forEach(el => {

    gsap.to(el, {

      opacity:1,

      y:0,

      duration:1.1,

      ease:'power4.out',

      scrollTrigger:{

        trigger:el,

        start:'top 88%',

        once:true

      }

    });

  });


/* =========================================================
   HERO ANIMATION
========================================================= */

gsap.from(
  '.hero-title .line',
  {

    y:120,

    opacity:0,

    stagger:.12,

    duration:1.4,

    ease:'power4.out',

    delay:.2

  }
);


gsap.from(
  '.hero .eyebrow',
  {

    y:20,

    opacity:0,

    duration:.8,

    delay:.05

  }
);


gsap.from(
  '.hero-sub, .hero-actions',
  {

    y:25,

    opacity:0,

    stagger:.12,

    duration:1,

    ease:'power3.out',

    delay:.75

  }
);


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

    links?.classList.toggle(
      'open'
    );

    menuBtn.classList.toggle(
      'open'
    );

  }
);


links?.querySelectorAll('a')
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

      }
    );

  });


/* =========================================================
   CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener(
  'click',
  e => {

    if(
      !menuBtn ||
      !links
    ) return;


    const clickedInsideNav =
      e.target.closest('.nav');


    if(
      !clickedInsideNav &&
      links.classList.contains('open')
    ){

      links.classList.remove(
        'open'
      );

      menuBtn.classList.remove(
        'open'
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

  if(!nav) return;


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
   GEOMETRIC ENERGY CORE
=========================================================

   WHITE
   SILVER
   GRAPHITE
   LIGHT GREY

   NO RED
   NO GREEN
   NO COLORED GLOW
   NO SMOOTH BALL

========================================================= */

const canvas =
  document.getElementById(
    'creature-canvas'
  );


if(
  canvas &&
  typeof THREE !== 'undefined'
){

  /* =======================================================
     SCENE
  ======================================================= */

  const scene =
    new THREE.Scene();


  /* =======================================================
     CAMERA
  ======================================================= */

  const camera =
    new THREE.PerspectiveCamera(
      42,
      innerWidth / innerHeight,
      .1,
      100
    );


  camera.position.set(
    0,
    0,
    8.5
  );


  /* =======================================================
     RENDERER
  ======================================================= */

  const renderer =
    new THREE.WebGLRenderer({

      canvas,

      alpha:true,

      antialias:true

    });


  renderer.setPixelRatio(
    Math.min(
      devicePixelRatio,
      2
    )
  );


  renderer.setSize(
    innerWidth,
    innerHeight
  );


  if(
    'outputColorSpace'
    in renderer
  ){

    renderer.outputColorSpace =
      THREE.SRGBColorSpace;

  }

  else{

    renderer.outputEncoding =
      THREE.sRGBEncoding;

  }


  /* =======================================================
     CORE GROUP
  ======================================================= */

  const coreGroup =
    new THREE.Group();


  scene.add(
    coreGroup
  );


  coreGroup.position.set(
    2.35,
    .15,
    0
  );


  /* =======================================================
     COLORS
  ======================================================= */

  const SILVER =
    0xdfe2e5;

  const WHITE =
    0xffffff;

  const GRAPHITE =
    0x8d9094;


  /* =======================================================
     MAIN ANGULAR CORE
  ======================================================= */

  const coreGeometry =
    new THREE.OctahedronGeometry(
      1.18,
      1
    );


  const coreMaterial =
    new THREE.MeshStandardMaterial({

      color:
        GRAPHITE,

      roughness:
        .30,

      metalness:
        .82,

      flatShading:
        true

    });


  const core =
    new THREE.Mesh(
      coreGeometry,
      coreMaterial
    );


  coreGroup.add(
    core
  );


  /* =======================================================
     INNER CRYSTAL
  ======================================================= */

  const innerGeometry =
    new THREE.DodecahedronGeometry(
      .62,
      0
    );


  const innerMaterial =
    new THREE.MeshStandardMaterial({

      color:
        WHITE,

      roughness:
        .18,

      metalness:
        .68,

      emissive:
        0x55585c,

      emissiveIntensity:
        .14,

      flatShading:
        true

    });


  const inner =
    new THREE.Mesh(
      innerGeometry,
      innerMaterial
    );


  inner.rotation.set(
    .35,
    .2,
    .4
  );


  coreGroup.add(
    inner
  );


  /* =======================================================
     ANGULAR CAGE
  ======================================================= */

  const cageGeometry =
    new THREE.IcosahedronGeometry(
      1.48,
      1
    );


  const cageMaterial =
    new THREE.MeshBasicMaterial({

      color:
        SILVER,

      wireframe:
        true,

      transparent:
        true,

      opacity:
        .36

    });


  const cage =
    new THREE.Mesh(
      cageGeometry,
      cageMaterial
    );


  coreGroup.add(
    cage
  );


  /* =======================================================
     ORBIT RINGS
  ======================================================= */

  const ringConfigs = [

    {
      radius:1.62,

      rotation:[
        Math.PI / 2,
        .05,
        .18
      ],

      speed:.003
    },

    {
      radius:1.88,

      rotation:[
        .28,
        Math.PI / 2,
        .65
      ],

      speed:-.0022
    },

    {
      radius:2.12,

      rotation:[
        1.05,
        .42,
        .05
      ],

      speed:.0017
    }

  ];


  ringConfigs.forEach(
    (config,index) => {

      const ringGeometry =
        new THREE.TorusGeometry(
          config.radius,
          .012,
          4,
          96
        );


      const ringMaterial =
        new THREE.MeshBasicMaterial({

          color:
            index === 1
              ? SILVER
              : WHITE,

          transparent:
            true,

          opacity:
            .46

        });


      const ring =
        new THREE.Mesh(
          ringGeometry,
          ringMaterial
        );


      ring.rotation.set(
        ...config.rotation
      );


      ring.userData.speed =
        config.speed;


      coreGroup.add(
        ring
      );

    }
  );


  /* =======================================================
     FLOATING CRYSTALLINE SHARDS
  ======================================================= */

  const shards =
    new THREE.Group();


  for(
    let i = 0;
    i < 16;
    i++
  ){

    const angle =
      i / 16 *
      Math.PI *
      2;


    const radius =
      1.95 +
      (i % 3) *
      .17;


    const shardGeometry =
      new THREE.TetrahedronGeometry(
        .07 +
        (i % 3) *
        .022,

        0
      );


    const shardMaterial =
      new THREE.MeshStandardMaterial({

        color:
          i % 2
            ? SILVER
            : WHITE,

        roughness:
          .25,

        metalness:
          .75,

        flatShading:
          true

      });


    const shard =
      new THREE.Mesh(
        shardGeometry,
        shardMaterial
      );


    shard.position.set(

      Math.cos(angle) *
      radius,

      Math.sin(
        angle * 1.7
      ) * .72,

      Math.sin(angle) *
      radius

    );


    shard.userData.baseY =
      shard.position.y;


    shard.userData.phase =
      i;


    shards.add(
      shard
    );

  }


  coreGroup.add(
    shards
  );


  /* =======================================================
     ENERGY AXES
  ======================================================= */

  const beamMaterial =
    new THREE.MeshBasicMaterial({

      color:
        WHITE,

      transparent:
        true,

      opacity:
        .30

    });


  const beamX =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        3.8,
        .014,
        .014
      ),

      beamMaterial

    );


  const beamY =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        .014,
        3.8,
        .014
      ),

      beamMaterial

    );


  const beamZ =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        .014,
        .014,
        3.8
      ),

      beamMaterial

    );


  beamX.rotation.z =
    .35;


  beamY.rotation.x =
    .5;


  beamZ.rotation.y =
    .8;


  coreGroup.add(
    beamX,
    beamY,
    beamZ
  );


  /* =======================================================
     LIGHTING
  ======================================================= */

  scene.add(
    new THREE.AmbientLight(
      WHITE,
      .72
    )
  );


  const keyLight =
    new THREE.DirectionalLight(
      WHITE,
      3.2
    );


  keyLight.position.set(
    4,
    5,
    6
  );


  scene.add(
    keyLight
  );


  const rimLight =
    new THREE.DirectionalLight(
      0xbfc4c9,
      2.1
    );


  rimLight.position.set(
    -4,
    1,
    -3
  );


  scene.add(
    rimLight
  );


  /* =======================================================
     MOUSE INTERACTION
  ======================================================= */

  let targetRX = 0;
  let targetRY = 0;


  window.addEventListener(
    'mousemove',
    e => {

      targetRY =
        (
          e.clientX /
          innerWidth -
          .5
        ) * .55;


      targetRX =
        (
          e.clientY /
          innerHeight -
          .5
        ) * .30;

    }
  );


  /* =======================================================
     ANIMATION
  ======================================================= */

  function animate(){

    requestAnimationFrame(
      animate
    );


    core.rotation.x +=
      .0022;

    core.rotation.y +=
      .0035;


    inner.rotation.x -=
      .003;

    inner.rotation.y +=
      .0045;


    cage.rotation.x -=
      .0012;

    cage.rotation.y -=
      .002;


    coreGroup.children
      .forEach(obj => {

        if(
          obj.geometry?.type ===
          'TorusGeometry'
        ){

          obj.rotation.z +=
            obj.userData.speed ||
            .001;

        }

      });


    shards.children
      .forEach(shard => {

        shard.position.y =

          shard.userData.baseY +

          Math.sin(
            performance.now() *
            .0008 +
            shard.userData.phase
          ) *
          .08;


        shard.rotation.x +=
          .004;

        shard.rotation.y +=
          .006;

      });


    coreGroup.rotation.x +=
      (
        targetRX -
        coreGroup.rotation.x
      ) * .018;


    coreGroup.rotation.y +=
      (
        targetRY -
        coreGroup.rotation.y
      ) * .018;


    coreGroup.position.y =
      Math.sin(
        performance.now() *
        .00065
      ) * .1;


    renderer.render(
      scene,
      camera
    );

  }


  animate();


  /* =======================================================
     RESPONSIVE 3D
  ======================================================= */

  function resize(){

    camera.aspect =
      innerWidth /
      innerHeight;


    camera.updateProjectionMatrix();


    renderer.setSize(
      innerWidth,
      innerHeight
    );


    if(
      innerWidth < 560
    ){

      coreGroup.position.x =
        1.05;

      coreGroup.scale.setScalar(
        .66
      );

    }

    else if(
      innerWidth < 900
    ){

      coreGroup.position.x =
        1.05;

      coreGroup.scale.setScalar(
        .82
      );

    }

    else{

      coreGroup.position.x =
        2.35;

      coreGroup.scale.setScalar(
        1
      );

    }

  }


  window.addEventListener(
    'resize',
    resize
  );


  resize();

}
