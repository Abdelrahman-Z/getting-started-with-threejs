import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)


const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75 , window.innerWidth / window.innerHeight , 0.1 , 1000)

const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

const orbit = new OrbitControls(camera , renderer.domElement)

const box = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({color : 0x00ff00})

const cube = new THREE.Mesh(box , material)



scene.add(cube)

camera.position.set(0 , 2 , 5)
orbit.update()


function animate(time){
    cube.rotation.x = time / 1000
    cube.rotation.y = time / 1000
    cube.rotation.z = time / 1000

    renderer.render(scene , camera)
}


renderer.setAnimationLoop(animate)

