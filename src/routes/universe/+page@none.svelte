<script lang="ts">
    import {onMount} from "svelte";
    import * as THREE from "three";
    import WEBGL from "three/examples/jsm/capabilities/WebGL";
    import {Vector3} from "three";

    let canvas

    let PK: {[key: string]: boolean} = {}

    let drag = false

    let scrollWheel = 0

    let delta = [new Vector3(), new Vector3()]

    let mouse = {
        x: 0,
        y: 0,
        dx: 0,
        dy: 0
    }

    function init() {
        const scene = new THREE.Scene()

        const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)

        const renderer = new THREE.WebGLRenderer({canvas})

        renderer.setPixelRatio(devicePixelRatio)
        renderer.setSize(innerWidth, innerHeight)
        camera.position.set(30, 30, 30)

        /*        const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100)
                const torusMaterial = new THREE.MeshStandardMaterial({color: 0xFF6347})
                const torus = new THREE.Mesh(torusGeometry, torusMaterial)
                scene.add(torus)*/


         //const testTexture = new THREE.TextureLoader().load('astley.jpg')

        const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
        const cubeMaterial = new THREE.MeshBasicMaterial({color: 0xf24e2a})
        //const cubeMaterial = new THREE.MeshBasicMaterial({map: testTexture})
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
        scene.add(cube)

        const pointLight = new THREE.PointLight(0xffffff)
        pointLight.position.set(30, 30, 30)
        scene.add(pointLight)

        /*        const pointLightHelper = new THREE.PointLightHelper(pointLight)
                scene.add(pointLightHelper)*/

        const ambientLight = new THREE.AmbientLight(0xffffff)
        scene.add(ambientLight)

        let previous = 0


        function render(timestamp) {
            requestAnimationFrame(render)

            if (!previous) {
                previous = timestamp
                return
            }

            const elapsed = timestamp - previous
            const S = 60 / (1000 / elapsed) // global scalar - normalize animations and movement with fps

            previous = timestamp

            cube.rotation.x += 0.01 * S
            cube.rotation.y += 0.01 * S

            const AMS = 0.06 // arrow movement scalar

            if (PK["ArrowUp"] || PK["w"]) delta[0].y = AMS
            else if (PK["ArrowDown"] || PK["s"] ) delta[0].y = -AMS

            if (PK["ArrowLeft"] || PK["a"]) delta[0].x = -AMS
            else if (PK["ArrowRight"] || PK["d"]) delta[0].x = AMS

            const SWS = 0.6 // scroll wheel scalar

            delta[0].z = scrollWheel < 0
                ? -SWS : scrollWheel > 0
                    ? SWS : 0
            scrollWheel = 0

            if (drag) {
                let y = (Math.PI * (mouse.dx / innerWidth)) % (Math.PI * 2)
                let x = (Math.PI * (mouse.dy / innerHeight)) % (Math.PI * 2)
                mouse.dx = 0
                mouse.dy = 0
                // camera.rotation.set(x, y, 0)

                let quaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(x, y, 0))

                camera.quaternion.multiply(quaternion)
            }


            delta[1].add(delta[0])

            camera.translateX(delta[1].x * S)
            camera.translateY(delta[1].y * S)
            camera.translateZ(delta[1].z * S)

            delta[0].set(0,0,0)

            delta[1].multiplyScalar(0.9)

/*            delta[1].x = Math.pow(Math.abs(delta[1].x * 0.9), 1/S) * (delta[1].x < 0 ? -1 : 1)
            delta[1].y = Math.pow(Math.abs(delta[1].y * 0.9), 1/S) * (delta[1].y < 0 ? -1 : 1)
            delta[1].z = Math.pow(Math.abs(delta[1].z * 0.9), 1/S) * (delta[1].z < 0 ? -1 : 1)*/

            renderer.render(scene, camera)
        }

        requestAnimationFrame(render)

        function addRick() {
            const star = new THREE.Mesh(cubeGeometry, cubeMaterial)

            const [x, y, z] = Array(3)
                .fill(null)
                .map(() => THREE.MathUtils.randFloatSpread(10));

            star.position.set(x, y, z);
            scene.add(star);
        }

        Array(100).fill(null).forEach(addRick);
    }

    onMount(() => {
        if (WEBGL.isWebGLAvailable()) {
            init()
        } else {
            const warning = WEBGL.getWebGLErrorMessage()
            alert(warning)
        }
    })
</script>

<svelte:window
        on:keydown|preventDefault={e => PK[e.key] = true}
        on:keyup|preventDefault={e => PK[e.key] = false}
        on:wheel={e => scrollWheel += e.deltaY < 0 ? -1 : 1}
        on:mousedown={e => {
            drag = true
            mouse.x = e.clientX
            mouse.y = e.clientY
        }}
        on:mouseup={e => drag = false}
        on:mousemove={e => {
            if (drag) {
            mouse.dx += mouse.x - e.clientX
            mouse.dy += mouse.y - e.clientY
            mouse.x = e.clientX
            mouse.y = e.clientY
            }
        }}
></svelte:window>

<canvas class="canvas" bind:this={canvas}></canvas>

{#if !import.meta.env.DEV}
<h1>in progress... stay tuned!</h1>
{/if}

<style lang="sass">
  .canvas
    top: 0
    left: 0
    position: fixed

  h1
    color: white
    position: fixed
    text-align: center
    width: 100%
</style>