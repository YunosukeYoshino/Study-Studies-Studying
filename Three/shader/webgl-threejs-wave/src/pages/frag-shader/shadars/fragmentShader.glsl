uniform vec3 uColor; // r g gは３次元ベクトルのためvec3を宣言
uniform sampler2D uTexture;//textureをつけるときに型を宣言しなければならない

varying vec2 vUv;//uv座標は元々用意されている。

/**
* textureを割り当てるためには、uv座標が必要
*/

void main() {
	vec4 textureColor = texture2D(uTexture, vUv);
	// gl_FragColor = vec4(uColor, 1.0);//RGBA
	gl_FragColor = textureColor;
}
