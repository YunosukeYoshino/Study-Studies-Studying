void main() {
     // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

     //上部と同様の結果を得る
     vec4 modelPosition = modelMatrix * vec4(position, 1.0);
     // modelPosition.z += 0.3 * -0.10; // z方向に移動させる！
     /*
     *sin関数：波のような形
     *かけることによって周波数を上げる
     */
     modelPosition.z += sin(modelPosition.x * 10.0) * 0.1;

     vec4 viewPosition = viewMatrix * modelPosition;
     vec4 projectionPosition = projectionMatrix * viewPosition;
     gl_Position = projectionPosition;
}
