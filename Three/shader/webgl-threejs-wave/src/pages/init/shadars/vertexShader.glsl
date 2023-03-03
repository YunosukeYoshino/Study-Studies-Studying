/**
*Raw sharderの書き方
*/

// mat4 4*4の行列
uniform mat4 projectionMatrix;//カメラのす範囲を決める 座標変換
uniform mat4 viewMatrix; //カメラの位置や方角を決めるための行列
uniform mat4 modelMatrix;//物体の位置の情報

attribute vec3 position;//x y zの座標

//vec4 4次元ベクトル
void main() {
     gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
