uniform float uWaveLength;
uniform vec2 uFrequency;
uniform float uTime;
uniform float uWaveSpeed;

void main() {
     vec4 modelPosition = modelMatrix * vec4(position, 1.0);

     // vaningで変数化することによって、他ファイルで切り出せる
     float elecation = sin(modelPosition.x * uFrequency.x + uTime * uWaveSpeed) * uWaveLength * sin(modelPosition.z * uFrequency.y + uTime * uWaveSpeed) * uWaveLength; //波のような表現

     modelPosition.y += elecation;

     vec4 viewPosition = viewMatrix * modelPosition;
     vec4 projectionMatrix = projectionMatrix * viewPosition;

     gl_Position = projectionMatrix;
}
