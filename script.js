gsap.registerPlugin(ScrollTrigger);

const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
let mouseX = innerWidth/2, mouseY = innerHeight/2, ringX = mouseX, ringY = mouseY;

window.addEventListener('mousemove', e => {
  mouseX=e.clientX; mouseY=e.clientY;
  dot.style.left=mouseX+'px'; dot.style.top=mouseY+'px';
});
function cursorLoop(){
  ringX += (mouseX-ringX)*.13; ringY += (mouseY-ringY)*.13;
  ring.style.left=ringX+'px'; ring.style.top=ringY+'px';
  requestAnimationFrame(cursorLoop);
}
cursorLoop();

document.querySelectorAll('a,.tilt-card,.magnetic,.skill').forEach(el=>{
  el.addEventListener('mouseenter',()=>ring.classList.add('active'));
  el.addEventListener('mouseleave',()=>ring.classList.remove('active'));
});

document.querySelectorAll('.magnetic').forEach(el=>{
  el.addEventListener('mousemove', e=>{
    const r=el.getBoundingClientRect();
    const x=(e.clientX-r.left-r.width/2)*.12;
    const y=(e.clientY-r.top-r.height/2)*.12;
    el.style.transform=`translate(${x}px,${y}px)`;
  });
  el.addEventListener('mouseleave',()=>el.style.transform='');
});

const cards=document.querySelectorAll('.tilt-card');
cards.forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    const x=e.clientX-r.left, y=e.clientY-r.top;
    const rx=(y-r.height/2)/-24, ry=(x-r.width/2)/24;
    card.style.transform=`perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.015,1.015,1.015)`;
    card.style.setProperty('--mx',x+'px'); card.style.setProperty('--my',y+'px');
  });
  card.addEventListener('mouseleave',()=>card.style.transform='');
});

gsap.utils.toArray('.reveal').forEach(el=>{
  gsap.to(el,{opacity:1,y:0,duration:1.1,ease:'power4.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}});
});

gsap.from('.hero-title .line',{y:120,opacity:0,stagger:.12,duration:1.4,ease:'power4.out',delay:.2});
gsap.from('.hero .eyebrow',{y:20,opacity:0,duration:.8,delay:.05});
gsap.from('.hero-sub,.hero-actions',{y:25,opacity:0,stagger:.12,duration:1,ease:'power3.out',delay:.75});

const menuBtn=document.querySelector('.menu-btn');
const links=document.querySelector('.nav-links');
menuBtn?.addEventListener('click',()=>links.classList.toggle('open'));
links?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));

// Three.js: Geometric Energy Core — faceted architectural sculpture.
// White / silver / light-grey palette. No red. No smooth-ball geometry.
const canvas=document.getElementById('creature-canvas');
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(42,innerWidth/innerHeight,.1,100);
camera.position.set(0,0,8.5);

const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.setSize(innerWidth,innerHeight);
renderer.outputEncoding=THREE.sRGBEncoding;

const coreGroup=new THREE.Group();
scene.add(coreGroup);
coreGroup.position.set(2.35,.15,0);

const SILVER=0xdfe2e5;
const WHITE=0xffffff;
const GRAPHITE=0x8d9094;
const DARK=0x303338;

// Main angular energy core.
const core=new THREE.Mesh(
  new THREE.OctahedronGeometry(1.18,1),
  new THREE.MeshStandardMaterial({
    color:GRAPHITE,
    roughness:.3,
    metalness:.82,
    flatShading:true
  })
);
coreGroup.add(core);

// Inner crystalline element.
const inner=new THREE.Mesh(
  new THREE.DodecahedronGeometry(.62,0),
  new THREE.MeshStandardMaterial({
    color:WHITE,
    roughness:.18,
    metalness:.68,
    emissive:0x5d6267,
    emissiveIntensity:.16,
    flatShading:true
  })
);
inner.rotation.set(.35,.2,.4);
coreGroup.add(inner);

// Angular wireframe cage.
const cage=new THREE.Mesh(
  new THREE.IcosahedronGeometry(1.48,1),
  new THREE.MeshBasicMaterial({
    color:SILVER,
    wireframe:true,
    transparent:true,
    opacity:.36
  })
);
coreGroup.add(cage);

// Three asymmetric architectural orbit rings.
[
  [1.62,[Math.PI/2,.05,.18],.003],
  [1.88,[.28,Math.PI/2,.65],-.0022],
  [2.12,[1.05,.42,.05],.0017]
].forEach(([radius,rotation,speed],index)=>{
  const ring=new THREE.Mesh(
    new THREE.TorusGeometry(radius,.012,4,96),
    new THREE.MeshBasicMaterial({
      color:index===1?SILVER:WHITE,
      transparent:true,
      opacity:.48
    })
  );
  ring.rotation.set(...rotation);
  ring.userData.speed=speed;
  coreGroup.add(ring);
});

// Floating crystalline shards.
const shards=new THREE.Group();
for(let i=0;i<16;i++){
  const angle=i/16*Math.PI*2;
  const radius=1.95+(i%3)*.17;

  const shard=new THREE.Mesh(
    new THREE.TetrahedronGeometry(.07+(i%3)*.022,0),
    new THREE.MeshStandardMaterial({
      color:i%2?SILVER:WHITE,
      roughness:.25,
      metalness:.75,
      flatShading:true
    })
  );

  shard.position.set(
    Math.cos(angle)*radius,
    Math.sin(angle*1.7)*.72,
    Math.sin(angle)*radius
  );

  shard.userData.baseY=shard.position.y;
  shard.userData.phase=i;
  shards.add(shard);
}
coreGroup.add(shards);

// Fine neutral energy axes crossing the core.
const beamMaterial=new THREE.MeshBasicMaterial({
  color:WHITE,
  transparent:true,
  opacity:.34
});

const beamX=new THREE.Mesh(
  new THREE.BoxGeometry(3.8,.014,.014),
  beamMaterial
);
const beamY=new THREE.Mesh(
  new THREE.BoxGeometry(.014,3.8,.014),
  beamMaterial
);
const beamZ=new THREE.Mesh(
  new THREE.BoxGeometry(.014,.014,3.8),
  beamMaterial
);

beamX.rotation.z=.35;
beamY.rotation.x=.5;
beamZ.rotation.y=.8;
coreGroup.add(beamX,beamY,beamZ);

// Neutral studio lighting.
scene.add(new THREE.AmbientLight(WHITE,.72));

const keyLight=new THREE.DirectionalLight(WHITE,3.2);
keyLight.position.set(4,5,6);
scene.add(keyLight);

const rimLight=new THREE.DirectionalLight(0xbfc4c9,2.1);
rimLight.position.set(-4,1,-3);
scene.add(rimLight);

let targetRX=0,targetRY=0;

window.addEventListener('mousemove',e=>{
  targetRY=(e.clientX/innerWidth-.5)*.55;
  targetRX=(e.clientY/innerHeight-.5)*.3;
});

function animate(){
  requestAnimationFrame(animate);

  core.rotation.x+=.0022;
  core.rotation.y+=.0035;

  inner.rotation.x-=.003;
  inner.rotation.y+=.0045;

  cage.rotation.x-=.0012;
  cage.rotation.y-=.002;

  coreGroup.children.forEach(obj=>{
    if(obj.geometry?.type==='TorusGeometry'){
      obj.rotation.z+=obj.userData.speed||.001;
    }
  });

  shards.children.forEach(shard=>{
    shard.position.y=
      shard.userData.baseY+
      Math.sin(performance.now()*.0008+shard.userData.phase)*.08;

    shard.rotation.x+=.004;
    shard.rotation.y+=.006;
  });

  coreGroup.rotation.x+=(targetRX-coreGroup.rotation.x)*.018;
  coreGroup.rotation.y+=(targetRY-coreGroup.rotation.y)*.018;

  coreGroup.position.y=
    Math.sin(performance.now()*.00065)*.1;

  renderer.render(scene,camera);
}

animate();

function resize(){
  camera.aspect=innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth,innerHeight);

  if(innerWidth<560){
    coreGroup.position.x=1.05;
    coreGroup.scale.setScalar(.66);
  }else if(innerWidth<900){
    coreGroup.position.x=1.05;
    coreGroup.scale.setScalar(.82);
  }else{
    coreGroup.position.x=2.35;
    coreGroup.scale.setScalar(1);
  }
}

addEventListener('resize',resize);
resize();
