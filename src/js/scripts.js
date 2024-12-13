import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const gridHelper = new THREE.GridHelper(100, 100);
scene.add(gridHelper);

const orbit = new OrbitControls(camera, renderer.domElement);

const box = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(box, material);
scene.add(cube);

const planeGemoetry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGemoetry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
scene.add(plane);

const sphereGeometry = new THREE.SphereGeometry(5, 50, 50);
const sphereMaterial = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: false,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(-10, 10, 0);
scene.add(sphere);

camera.position.set(-10, 30, 30);
orbit.update();

const gui = new dat.GUI();

const options = {
  sphereColor: "#ffea00",
  wireframe: false,
  speed: 0.01,
  YPosition: 0,
};

gui.addColor(options, "sphereColor").onChange((value) => {
  sphere.material.color.set(value);
});
gui.add(options, "wireframe").onChange((value) => {
  sphere.material.wireframe = value;
});

gui.add(options, "speed", 0, 0.1);

let step = 0;

function animate(time) {
  cube.rotation.x = time / 1000;
  cube.rotation.y = time / 1000;
  cube.rotation.z = time / 1000;

  step += options.speed;
  sphere.position.y = 10 * Math.abs(Math.sin(step)) + 5;

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
