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

    createStarField();

    /** 星屑を作成します */
    function createStarField() {
        // 頂点情報を作詞絵
        const vertices = [];
        for (let i = 0; i < 1000; i++) {
            const x = 3000 * (Math.random() - 0.5);
            const y = 3000 * (Math.random() - 0.5);
            const z = 3000 * (Math.random() - 0.5);

            vertices.push(x, y, z);
        }

        // 形状データを作成
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

        // マテリアルを作成
        const material = new THREE.PointsMaterial({
            size: 10,
            color: 0xffffff,
        });

        // 物体を作成
        const mesh = new THREE.Points(geometry, material);
        scene.add(mesh);
    }

    let rot = 0; // 角度
    let mouseX = 0; // マウス座標

    // マウス座標はマウスが動いた時のみ取得できる
    document.addEventListener("mousemove", (event) => {
        mouseX = event.pageX;
    });
    // 初回実行
    tick();

    function tick() {

        requestAnimationFrame(tick);

        // マウスの位置に応じて角度を設定
        // マウスのX座標がステージの幅の何%の位置にあるか調べてそれを360度で乗算する
        const targetRot = (mouseX / window.innerWidth) * 360;
        // イージングの公式を用いて滑らかにする
        // 値 += (目標値 - 現在の値) * 減速値
        rot += (targetRot - rot) * 0.02;

        // ラジアンに変換する
        const radian = rot * Math.PI / 180;
        // 角度に応じてカメラの位置を設定
        camera.position.x = 1000 * Math.sin(radian);
        camera.position.z = 1000 * Math.cos(radian);
        // 原点方向を見つめる
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        // レンダリング
        renderer.render(scene, camera);
    }
}
