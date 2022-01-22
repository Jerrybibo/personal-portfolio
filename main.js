import './style.css'

import * as THREE from 'three';
// import {MeshLine, MeshLineMaterial, MeshLineRaycast} from 'three.meshline';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

// TextureLoader object to load images later on
// const textureLoader = new THREE.TextureLoader();

// Scene holds all objects, cameras, and lights
const scene = new THREE.Scene();

// Multiple camera options; using PerspectiveCamera
// https://threejs.org/docs/#api/en/cameras/PerspectiveCamera
// @params: PerspectiveCamera(fov, aspect, near, far)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Renderer renders graphics to scene
const renderer = new THREE.WebGLRenderer({
    // Selects canvas tag with id=#bg to render scene
    canvas: document.querySelector('#bg'),
})

// Do various setup for renderer (pixel ratio, size, etc.)
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Set camera position 30 units above horizon at x=0 and y=0
camera.position.set(0, 0, 20);

// 3 steps to add object to the scene
// 1. Create Geometry (the (x, y, z) points that make up a shape)
// Three.JS has built-in geometries found at https://threejs.org/docs/?q=Geometry
const geometry = new THREE.IcosahedronGeometry(10, 1);

// 2. Create Material (the "wrapping paper" for the geometry)
// Three.JS has built-in materials found at https://threejs.org/docs/?q=Material
// 0x26ffb7
const material = new THREE.MeshNormalMaterial({color: 0x26ffb7, wireframe: true});

// 3. Combining the geometry and material through calling Mesh()
const icosahedron = new THREE.Mesh(geometry, material);

// Add the mesh we created to the scene
scene.add(icosahedron);

// We need a light source to properly illuminate the mesh we added to the scene.
// Three.JS has multiple light objects found at https://threejs.org/docs/?q=Light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

// Ambient lights are like "floodlights"; lights up everything evenly
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Light helpers show us the position of point lights
const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

// Grid helpers show us the 3d grid that objects are placed on
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper);


// Instantiate a OrbitControl object to control our camera
const controls = new OrbitControls(camera, renderer.domElement);

// Create geometry and material of the stars
const star_geometry = new THREE.SphereGeometry(0.25, 24, 24);
const star_material = new THREE.MeshStandardMaterial({color: 0xffffff});

// Helper function to add a star at a random location
function addStar() {
    const star = new THREE.Mesh(star_geometry, star_material);
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y, z);
    scene.add(star);
}

// Perform addStar() 200 times
for (let i = 0; i < 200; i ++) {
    addStar();
}

// Load texture for the background
// const bgTexture = textureLoader.load('resources/back1.png');
// Set the background texture
// scene.background = bgTexture;

// const cubeMesh = new THREE.Mesh(
//     new THREE.BoxGeometry(3, 3, 3),
//     new THREE.MeshBasicMaterial({map: bgTexture})
// )

// cubeMesh.position.set(0, 0, 40);
// scene.add(cubeMesh);

// function moveCamera() {
//     const t = document.body.getBoundingClientRect().top;
//     camera.position.set(-0.01 * t, -0.0002 * t, -0.0002 * t);
// }
// document.body.onscroll = moveCamera;

// "Game loop" - runs constantly
function animate() {
    requestAnimationFrame(animate);
    // Render the scene
    icosahedron.rotation.x += 0.01;
    icosahedron.rotation.y += 0.005;
    icosahedron.rotation.z += 0.01;

    // This allows us to listen for controls inputted through user interaction
    controls.update();

    renderer.render(scene, camera);
}

animate();
