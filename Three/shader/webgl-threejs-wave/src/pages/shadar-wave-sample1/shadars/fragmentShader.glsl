uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;

varying float vElecation;

void main() {
	float mixStrengthColor = (vElecation * uColorOffset) * uColorMultiplier; //vElecationにoffsetをかけてあげることで周波数を強める。
	vec3 color = mix(uDepthColor, uSurfaceColor, mixStrengthColor);//第3引数でMIXできる
	gl_FragColor = vec4(color, 1.0); //(r, g, b, a)
}
