import './style.css'

import * as THREE from 'three';
// canvasのDOM要素の取得
const canvas = document.querySelector(".webgl")

/*必須の３要素を追加*/

//シーン
const scene = new THREE.Scene();


//サイズ
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// カメラ
const camera = new THREE.PerspectiveCamera(
    35,
    sizes.width / sizes.height,//アスペクト比
    0.1,
    100
)

camera.position.z = 6;
scene.add(camera);

// レンダラー
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,//HTMLファイルで指定したcanvasタグを指定できる
    alpha: true//背景画像を透過させるためのプロパティ
})
renderer.setSize(sizes.width, sizes.height); //レンダラーのサイズを指定
renderer.setPixelRatio(window.devicePixelRatio);//ジオメトリーをくっきり映し出すことができる。

renderer.render(scene, camera)



