const fs = require('fs');
const nodeConsole = require('console');
var console = new nodeConsole.Console(process.stdout, process.stderr);
console.log('begin');

document.getElementById('newWindow').href += window.location.hash;

var gui = new dat.GUI();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 10, 50);
camera.position.z = 30;

var renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    preserveDrawingBuffer: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 1);
document.body.appendChild(renderer.domElement);

var ambientLight = new THREE.AmbientLight(0x000000);
scene.add(ambientLight);

var lights = [];
lights[0] = new THREE.PointLight(0xffffff, 1, 0);
lights[1] = new THREE.PointLight(0xffffff, 1, 0);
lights[2] = new THREE.PointLight(0xffffff, 1, 0);

lights[0].position.set(0, 200, 0);
lights[1].position.set(100, 200, 100);
lights[2].position.set(- 100, - 200, - 100);

scene.add(lights[0]);
scene.add(lights[1]);
scene.add(lights[2]);

guiScene(gui, scene, camera);

var geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
var mesh = new THREE.Mesh(geometry);

generateVertexColors(geometry);

mesh.material = chooseFromHash(gui, mesh, geometry);

generateMorphTargets(mesh, geometry);

scene.add(mesh);

var prevFog = false;

var render = function () {

    requestAnimationFrame(render);

    var time = Date.now() * 0.001;

    // mesh.rotation.x += 0.005;
    // mesh.rotation.y += 0.005;

    if (prevFog !== scene.fog) {

        mesh.material.needsUpdate = true;
        prevFog = scene.fog;

    }

    if (mesh.morphTargetInfluences) {

        mesh.morphTargetInfluences[0] = (1 + Math.sin(4 * time)) / 2;

    }

    renderer.render(scene, camera);

};

window.addEventListener('resize', function () {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}, false);

render();


setTimeout(saveIamge, 200);

function saveIamge () {
  if (!renderer) {
    return;
  }

  let base64 = renderer.domElement.toDataURL('image/png');
  var base64Data = base64.replace(/^data:image\/png;base64,/, "");
  //console.log(base64);
  
  fs.writeFile("./logo.png", base64Data, 'base64', function (err) {
    console.log(err);
  });

}
