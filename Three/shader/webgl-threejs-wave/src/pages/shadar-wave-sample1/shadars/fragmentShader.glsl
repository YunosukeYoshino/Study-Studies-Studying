uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;

varying float vElecation;

void main() {
	vec3 color = mix(uDepthColor, uSurfaceColor, vElecation);//第3引数でMIXできる
	gl_FragColor = vec4(color, 1.0); //(r, g, b, a)
}
