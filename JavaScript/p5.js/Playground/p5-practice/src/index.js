let num = 10000;
let randomBallSize = []
function setup() {
    createCanvas((w = 500), w);
    background(255);
    stroke(15, 76, 120, 20);
    strokeWeight(1);

    pos = [];
    for (let i = 0; i < num; i++) {
        pos[i] = { x: random(w), y: random(w) };
        randomBallSize[i] = random(20, 120)
    }
}

function draw() {
    for (let i = 0; i < pos.length; i++) {
        square(pos[i].x, pos[i].y, randomBallSize[i]); //ラベルを呼び出せる!
        // let dx =
        //     3 * sin(0.5 - noise((pos[i].x / w) * 5, (pos[i].y / w) * 5, 0.1));
        // //noise関数で座標の位置を動かす！
        // let dy = 0.5 - noise((pos[i].x / w) * 15, (pos[i].y / w) * 15, 7.2);
        // // //noise関数は0から１返すので0.5を引いてあげる!

        // pos[i].x += dx; //x座標を加算して動かす！
        // pos[i].y += dy + dx; //y座標を加算して動かす！
    }
}
