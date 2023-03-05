import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import vertexShader from './shadars/vertexShader.glsl?raw'
import fragmentShader from './shadars/fragmentShader.glsl?raw'
import * as dat from 'lil-gui'
import flag from "./images/america.png"

// デバッグ
const gui = new dat.GUI({ width: 300 });

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

// Canvas
const canvas = document.querySelector("#webgl");
console.log(canvas);
// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const flagTexture = textureLoader.load(flag);//texture loadを定義

// Geometry
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);
console.log(geometry.attributes.uv.array)//uv座標が確認できる。

// Material
// ShaderMaterial シェーダーを読み込む
const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true,//透明に
    side: THREE.DoubleSide,//裏側も見れる。
    uniforms: {
        uFrequency: { value: new THREE.Vector2(10, 5) },//グローバルに定義 uniformsなのでuのprefixをつける
        uTime: { value: 0 },
        uColor: { value: new THREE.Color("pink") },
        uTexture: { value: flagTexture },//textureを宣言
    }
});

// デバッグを追加
gui.add(material.uniforms.uFrequency.value, "x")
    .min(0)//最小値
    .max(20)//最大値
    .step(0.001)//step
    .name("frequencyX")//名前
gui.add(material.uniforms.uFrequency.value, "y")
    .min(0)
    .max(20)
    .step(0.001)
    .name("frequencyY")

// Mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
);
camera.position.set(0.25, -0.25, 1);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const animate = () => {
    //時間取得
    const elapsedTime = clock.getElapsedTime();//現在の経過時間を取得できる。

    material.uniforms.uTime.value = elapsedTime;//uTimeを毎時間値を更新する

    controls.update();

    renderer.render(scene, camera);

    window.requestAnimationFrame(animate);
};

animate();
