import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'lil-gui'

import vertexShader from './shadars/vertexShader.glsl?raw'
import fragmentShader from './shadars/fragmentShader.glsl?raw'

const gui = new dat.GUI({ width: 300 })

/**
 * Sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
}

// Canvas
const canvas = document.querySelector('.webgl') as HTMLCanvasElement

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

// Geometry
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32)

// Material
// const material = new THREE.MeshBasicMaterial()

/**
 * ShaderMaterialを追加
 */
const material = new THREE.ShaderMaterial({
	vertexShader: vertexShader,
	fragmentShader: fragmentShader,

	//グローバルで変数を定義
	uniforms: {
		uWaveLength: { value: 0.2 },
		uFrequency: { value: new THREE.Vector2(5.0, 2.5) },
	},
})

/**
 * UIデバッグの実装
 */

gui.add(material.uniforms.uWaveLength, 'value').min(0).max(1).step(0.001).name('uWaveLength')
gui.add(material.uniforms.uFrequency.value, 'x').min(0).max(10).step(0.001).name('uFrequencX')
gui.add(material.uniforms.uFrequency.value, 'y').min(0).max(10).step(0.001).name('uFrequencY')

// Mesh
const mesh = new THREE.Mesh(geometry, material)
mesh.rotation.x = -Math.PI / 2
scene.add(mesh)

window.addEventListener('resize', () => {
	sizes.width = window.innerWidth
	sizes.height = window.innerHeight

	camera.aspect = sizes.width / sizes.height
	camera.updateProjectionMatrix()

	renderer.setSize(sizes.width, sizes.height)
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0.2, 0.7, 0.7)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const animate = () => {
	//時間取得
	const elapsedTime = clock.getElapsedTime()

	controls.update()

	renderer.render(scene, camera)

	window.requestAnimationFrame(animate)
}

animate()
