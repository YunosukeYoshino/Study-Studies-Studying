/**
*Raw sharderの書き方
*/

// mat4 4*4の行列
uniform mat4 projectionMatrix;//カメラのす範囲を決める 座標変換
uniform mat4 viewMatrix; //カメラの位置や方角を決めるための行列
uniform mat4 modelMatrix;//物体の位置の情報

attribute vec3 position;//x y zの座標

//vec4 4次元ベクトル

/**
* 修飾子
* attribute:頂点情報などを入れる
* uniform:グローバル変数を入れる
* varying:vertexShaderからFragmentShaderに変数を渡すときに使用

*/

void main() {
     // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

     //上部と同様の結果を得る
     vec4 modelPosition = modelMatrix * vec4(position, 1.0);
     modelPosition.z += 0.3 * -0.10; // z方向に移動させる！
     vec4 viewPosition = viewMatrix * modelPosition;
     vec4 projectionPosition = projectionMatrix * viewPosition;
     gl_Position = projectionPosition;
}
