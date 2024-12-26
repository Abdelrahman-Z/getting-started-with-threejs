import * as THREE from "three";

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const group = new THREE.Group();
scene.add(group);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
group.add(cube);

const geometry2 = new THREE.BoxGeometry();
const material2 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube2 = new THREE.Mesh(geometry2, material2);
group.add(cube2);

cube2.position.x = 2;

const cube3 = new THREE.Mesh(geometry, material);
group.add(cube3);

cube3.position.x = -2;

camera.position.z = 5;

const animate = function () {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube2.rotation.x += 0.01;
  cube2.rotation.y += 0.01;
  cube3.rotation.x += 0.01;
  cube3.rotation.y += 0.01;
  group.rotation.y += 0.01;

  renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate);
