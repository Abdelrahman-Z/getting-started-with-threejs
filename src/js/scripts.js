import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
import nebula from "../images/nebula.jpg";
import stars from "../images/stars.jpg";

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
// renderer.setClearColor(0xffea00);
const textureLoader = new THREE.TextureLoader();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

// scene.background = textureLoader.load(stars);
const cubeTexture = new THREE.CubeTextureLoader().load([
  stars,
  stars,
  stars,
  stars,
  stars,
  stars,
]);

scene.background = cubeTexture;

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// const gridHelper = new THREE.GridHelper(100, 100);
// scene.add(gridHelper);

const BoxGeometry2 = new THREE.BoxGeometry(4, 4, 4);
// const material2 = new THREE.MeshBasicMaterial({ color: 0x00ff00  , map: textureLoader.load(nebula) });
const material2 = [
  new THREE.MeshBasicMaterial({ map: textureLoader.load(nebula) }),
  new THREE.MeshBasicMaterial({ map: textureLoader.load(nebula) }),
  new THREE.MeshBasicMaterial({ map: textureLoader.load(stars) }),
  new THREE.MeshBasicMaterial({ map: textureLoader.load(nebula) }),
  new THREE.MeshBasicMaterial({ map: textureLoader.load(stars) }),
  new THREE.MeshBasicMaterial({ map: textureLoader.load(nebula) }),
];
const box2 = new THREE.Mesh(BoxGeometry2, material2);
box2.position.set(0, 15, 10);
box2.name = "nebula";
scene.add(box2);

const orbit = new OrbitControls(camera, renderer.domElement);

const box = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(box, material);
scene.add(cube);

const planeGemoetry = new THREE.PlaneGeometry(60, 60);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGemoetry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;
scene.add(plane);

const plane2Gemoetry = new THREE.PlaneGeometry(10 , 10 , 10 , 10);
const plane2Material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  wireframe: true,
})
const plane2 = new THREE.Mesh(plane2Gemoetry, plane2Material);
scene.add(plane2);
plane2.position.set(10, 10, 15);

plane2.geometry.attributes.position.array[0] -=10 * Math.random()
plane2.geometry.attributes.position.array[1] -=10 * Math.random()
plane2.geometry.attributes.position.array[2] -=10 * Math.random()
plane2.geometry.attributes.position.array.at(-1) = 10 * Math.random()
// plane2.geometry.attributes.position.array[3] = -10 * Math.random()


const sphereGeometry = new THREE.SphereGeometry(5, 50, 50);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0xff0000,
  wireframe: false,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(-10, 10, 0);
sphere.castShadow = true;
scene.add(sphere);

const sphereId = sphere.uuid;

camera.position.set(-10, 30, 30);
orbit.update();

const ambitLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambitLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 30);
// directionalLight.position.set(15, 20, -20);
// directionalLight.castShadow = true;
// directionalLight.shadow.camera.right = 12;
// directionalLight.shadow.camera.top = 25;
// scene.add(directionalLight);

// const dLightHelper = new THREE.DirectionalLightHelper(directionalLight , 1);
// scene.add(dLightHelper);

// const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(dLightShadowHelper);

const spotLight = new THREE.SpotLight(0xffffff, 100000);
spotLight.position.set(-100, 100, 0);
spotLight.castShadow = true;
spotLight.angle = 0.1;
scene.add(spotLight);

const sLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(sLightHelper);

const gui = new dat.GUI();

const options = {
  sphereColor: "#ffea00",
  wireframe: false,
  speed: 0.01,
  XPosition: 0,
  angel: 0.2,
  penumbra: 0,
  intensety: 1,
};

// scene.fog = new THREE.Fog(0x000000, 0, 200);
// scene.fog = new THREE.FogExp2(0xffffff, 0.01);

gui.addColor(options, "sphereColor").onChange((value) => {
  sphere.material.color.set(value);
});
gui.add(options, "wireframe").onChange((value) => {
  sphere.material.wireframe = value;
});

gui.add(options, "speed", 0, 0.1);
gui.add(options, "angel", 0, 1);
gui.add(options, "penumbra", 0, 1);
gui.add(options, "intensety", 0, 100000);

gui.add(options, "XPosition", -20, 20).onChange((value) => {
  sphere.position.x = value;
});

let step = 0;

const mousePosition = new THREE.Vector2();

window.addEventListener("mousemove", (event) => {
  mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
  mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

const rayCaster = new THREE.Raycaster();

function animate(time) {
  cube.rotation.x = time / 1000;
  cube.rotation.y = time / 1000;
  cube.rotation.z = time / 1000;

  step += options.speed;
  sphere.position.y = 10 * Math.abs(Math.sin(step)) + 5;
  spotLight.intensity = options.intensety;
  spotLight.angle = options.angel;
  spotLight.penumbra = options.penumbra;
  sLightHelper.update();

  rayCaster.setFromCamera(mousePosition, camera);
  const intersects = rayCaster.intersectObjects(scene.children);
  console.log(intersects);
  for (let i = 0; i < intersects.length; i++) {
    if (intersects[i].object.uuid === sphereId) {
      intersects[i].object.material.color.set(0xff0000);
    }
    if (intersects[i].object.name === "nebula") {
      box2.rotation.x = time / 1000;
      box2.rotation.y = time / 1000;
      box2.rotation.z = time / 1000;
    }
  }
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
