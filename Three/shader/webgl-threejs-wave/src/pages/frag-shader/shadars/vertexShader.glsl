uniform vec2 uFrequency; //Vector2にしたのでvec2型に変更
uniform float uTime;

varying vec2 vUv;//uv座標は元々用意されている。
varying float VElevation;//elavationを定義

void main() {
     // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

     //上部と同様の結果を得る
     vec4 modelPosition = modelMatrix * vec4(position, 1.0);
     // modelPosition.z += 0.3 * -0.10; // z方向に移動させる！
     /*
     *sin関数：波のような形
     *かけることによって周波数を上げる
     */
     // modelPosition.z += sin(modelPosition.x * uFrequency.x + uTime) * 0.1;
     // modelPosition.z += sin(modelPosition.y * uFrequency.y + uTime) * 0.1;

     // 変数として切り出すためにelevationを定義する
     float elevation = sin(modelPosition.x * uFrequency.x + uTime) * 0.1;
     elevation += sin(modelPosition.y * uFrequency.y + uTime) * 0.1;
     modelPosition.z += elevation;

     vec4 viewPosition = viewMatrix * modelPosition;
     vec4 projectionPosition = projectionMatrix * viewPosition;
     gl_Position = projectionPosition;
     vUv = uv;
     VElevation += elevation;
}
