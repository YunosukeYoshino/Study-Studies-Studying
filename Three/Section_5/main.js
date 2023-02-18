import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//シーン
const scene = new THREE.Scene();

//カメラ
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(1, 1, 2);

//レンダラー
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

/**
 * ジオメトリを作ってみよう。
 **/
const boxGeometry = new THREE.BoxGeometry(1, 1, 1, 16, 16, 16)//width,height,depth
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 16)
// const planeGeometry = new THREE.PlaneGeometry(1, 1)
const planeGeometry = new THREE.PlaneGeometry(10, 10)
const torusGeometry = new THREE.TorusGeometry(0.5, 0.2, 15, 123, Math.PI * 2)//引数調べて設定してあげる

// バッファジオメトリー
const bufferGeometry = new THREE.BufferGeometry();
const count = 50;
const positionArray = new Float32Array(9 * count);//450個生成される。
/*
浮動小数点 型付き配列 32ビットしか入らない
型付き配列で型を指定してあげることによって。無駄な情報が入らない。
*/

//頂点の位置
for (let i = 0; i < count * 9; i++) {
  positionArray[i] = (Math.random() - 0.5) * 2;//0~1をランダムに生成、-0.5で-1~1に変更 中心に寄せることができる。
}


console.log(positionArray);
const positionAttritube = new THREE.BufferAttribute(positionArray, 3)

bufferGeometry.setAttribute("position", positionAttritube)

//マテリアル
// const material = new THREE.MeshNormalMaterial({
const material = new THREE.MeshBasicMaterial({
  wireframe: true,
  color: "green"
});

//メッシュ化
// 四角形
const box = new THREE.Mesh(boxGeometry, material)

// 球体
const sphere = new THREE.Mesh(sphereGeometry, material)
sphere.position.x = 1.5

// 下地
const plane = new THREE.Mesh(planeGeometry, material)
// plane.position.x = -1.5
plane.rotation.x = -Math.PI * 0.5//90度回転して平面を表現する。
plane.position.y = -0.5//1に対して半分の位置を下げてあげる

// ドーナツ型
const Torus = new THREE.Mesh(torusGeometry, material)
Torus.position.x = - 1.5
Torus.position.y = 0.18
// scene.add(box, sphere, plane, Torus)

const buffer = new THREE.Mesh(bufferGeometry, material)
scene.add(buffer)

//ライト
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

//マウス操作
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

window.addEventListener("resize", onWindowResize);

const clock = new THREE.Clock();

function animate() {
  const elapsedTime = clock.getElapsedTime();
  // console.log(elapsedTime);

  //オブジェクトの回転
  // sphere.rotation.x = elapsedTime;
  // plane.rotation.x = elapsedTime;
  // octahedron.rotation.x = elapsedTime;
  // torus.rotation.x = elapsedTime;

  // sphere.rotation.y = elapsedTime;
  // plane.rotation.y = elapsedTime;
  // octahedron.rotation.y = elapsedTime;

  // torus.rotation.y = elapsedTime;

  controls.update();

  //レンダリング
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

//ブラウザのリサイズに対応
function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

animate();
