import * as THREE from "three";

window.addEventListener('DOMContentLoaded', init);

function init() {

    // サイズを指定
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
    };



    /**
     * resize
    */
    window.addEventListener("resize", () => {
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;

        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    /**
     * レンダラーを作成
    */

    // THREE.WebGLRendererクラス(3D空間のレンダリングを行います。)
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#webgl')
    });

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


    // シーンを作成(3d空間 オブジェクトや光源の置き場になります。)
    const scene = new THREE.Scene();

    // カメラを作成 // new THREE.PerspectiveCamera(画角, アスペクト比
    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height);
    camera.position.set(0, 0, +1000);

    // 画像を読み込む
    const loader = new THREE.TextureLoader();
    const texture = loader.load('img/moon_tx.jpg');

    // 球体を作成
    const geometry = new THREE.SphereGeometry(300, 30, 30);
    // const material = new THREE.MeshStandardMaterial({ color: 0XF5F5F5 });

    // マテリアルにテクスチャーを設定
    const material = new THREE.MeshStandardMaterial({
        map: texture
    });

    // メッシュを作成
    const mesh = new THREE.Mesh(geometry, material);
    // 3D空間にメッシュを追加
    scene.add(mesh);


    // 平行光源
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1);
    // シーンに追加
    scene.add(directionalLight);


    let delta = 0
    window.addEventListener('wheel', (event) => {
        delta = + event.deltaY;
        mesh.rotation.y += 0.001 * delta;
    })


    // 初回実行
    tick();

    function tick() {
        requestAnimationFrame(tick);
        // レンダリング
        renderer.render(scene, camera);
    }
}
