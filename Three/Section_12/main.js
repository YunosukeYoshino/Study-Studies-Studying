import './style.css'
import * as THREE from 'three';
import * as dat from "lil-gui";

/***********
***UIデバッグを実装***
***********/
const gui = new dat.GUI()

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

/*
オブジェクトを作成しよう
*/

//マテリアル
const material = new THREE.MeshPhysicalMaterial({//金属っぽい質感のジオメトリー
    color: "#3c94d7",
    metalness: 0.865,
    roughness: 0.373,//粗さ
    flatShading: true,//材質
})

gui.addColor(material, "color"); //ジオメトリーの色をUIデバッグで操作可能になる。
gui.add(material, "metalness").min(0).max(1).step(0.001);
gui.add(material, "roughness").min(0).max(1).step(0.001);


// ジオメトリー(メッシュ化したもの)
const mesh1 = new THREE.Mesh(new THREE.TorusGeometry(1, 0.4, 16, 60), material)//メッシュの中に直接ジオメトリーをかける。
const mesh2 = new THREE.Mesh(new THREE.OctahedronGeometry(), material)//メッシュの中に直接ジオメトリーをかける。
const mesh3 = new THREE.Mesh(new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16), material)//メッシュの中に直接ジオメトリーをかける。
const mesh4 = new THREE.Mesh(new THREE.IcosahedronGeometry(), material)//メッシュの中に直接ジオメトリーをかける。

// 回転用に配置する。
mesh1.position.set(2, 0, 0);
mesh2.position.set(-1, 0, 0);
mesh3.position.set(2, 0, -6);
mesh4.position.set(5, 0, 3);

scene.add(mesh1, mesh2, mesh3, mesh4)
const meshes = [mesh1, mesh2, mesh3, mesh4];//データとして扱いやすくするため配列に格納

//ライトの追加
const directionalLight = new THREE.DirectionalLight("#ffffff", 4)//色,色の強さ
directionalLight.position.set(0.5, 1, 0);//ライトのポジションをやや右上に変更
scene.add(directionalLight)


//ブラウザのリサイズ
window.addEventListener("resize", () => {
    //サイズのアップデート
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // カメラのアップデート
    camera.aspect = window.innerWidth / window.innerHeight; //リサイズするたびにアスペクト比を変える。
    camera.updateProjectionMatrix(); //アップデートする際に合わせて呼び出す必要がある。

    // レンダラーのアップデート
    renderer.setSize(sizes.width, sizes.height); //レンダラーのサイズを指定
    renderer.setPixelRatio(window.devicePixelRatio);//ジオメトリーをくっきり映し出すことができる。
})

// アニメーション

const clock = new THREE.Clock();

const animate = () => {
    renderer.render(scene, camera);

    let getDeltaTime = clock.getDelta();
    // console.log(getDeltaTime);

    //meshを回転させる。
    for (const mesh of meshes) {
        /**
         * deltaタイムをかけてあげることによってどのデバイスでも同じような時間を算出できる
         */
        mesh.rotation.x += 0.1 * getDeltaTime;
        mesh.rotation.y += 0.12 * getDeltaTime;
    }


    // requestAnimationFrameはパソコンのスペックによって変わってくる。
    window.requestAnimationFrame(animate);//毎秒呼び出す
};
animate()



