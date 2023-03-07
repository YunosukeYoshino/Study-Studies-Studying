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

    /**
     * 箱を作成
    */

    // new THREE.BoxGeometry(幅, 高さ, 奥行き)
    const geometry = new THREE.BoxGeometry(400, 400, 400);

    //THREE.MeshNormalMaterial(適当なカラーを割り振るマテリアル)
    const material = new THREE.MeshNormalMaterial();

    // new THREE.Mesh(ジオメトリ,マテリアル)
    const box = new THREE.Mesh(geometry, material);

    // シーンに追加
    scene.add(box);


    // 初回実行
    tick();

    // 毎フレーム時に実行されるループイベントです
    function tick() {


        requestAnimationFrame(tick);

        // アニメーション処理をここに書く
        box.rotation.y += 0.01;
        renderer.render(scene, camera); // レンダリング
    }
}
