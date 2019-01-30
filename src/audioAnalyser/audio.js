import React, { Component } from 'react';
import alphaTexture from '../assets/textures/stripes_gradient.jpg';
import * as THREE from 'three';
import song from './Teehee.mp3';

import threeEntry from './threeEntryPoint';
import threeSubject from './SceneSubject';
import threeLights from './GeneralLights';
import SimplexNoise from './simplexnoise';

class Audio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audio: null
        };
        this.audioEle = null;
        this.songName = 'Blues in A';
        this.audioStatus = 'PAUSED';
        this.toggleMusic = this.toggleMusic.bind(this);
        this.counter = 0;
    }
    componentDidMount() {

        this.audioEle = document.getElementById('audio-element');
        this.canvas = document.getElementById('testCanvas');
        console.log("component mounted");

        // threejs setup
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 8000);
        
        //this.camera.position.set(0, 0, 2100);
        //this.camera.lookAt(this.scene.position);

        this.camera.position.set(0, 0, 100);
        this.camera.lookAt(this.scene.position);
        this.scene.add(this.camera);

        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            canvas: this.canvas
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(500, 500);

        this.clock = new THREE.Clock();

        this.group = new THREE.Group();
        this.noise = new SimplexNoise();

        var icosahedronGeometry = new THREE.IcosahedronGeometry(10, 4);
        var lambertMaterial = new THREE.MeshLambertMaterial({
            color: 0xff00ee,
            wireframe: true
        });

        this.ball = new THREE.Mesh(icosahedronGeometry, lambertMaterial);

        this.ball.position.set(0, 0, 0);
        this.group.add(this.ball);

        

        document.getElementById('test').appendChild(this.renderer.domElement);

    }

    startAnimation4(analyser, renderer, scene, audio, camera, ball, group, noise) {

        analyser.fftSize = 512;
        var bufferLength = analyser.frequencyBinCount;
        var dataArray = new Uint8Array(bufferLength);

        renderer.setSize(window.innerWidth, window.innerHeight);



        var ambientLight = new THREE.AmbientLight(0xaaaaaa);
        scene.add(ambientLight);

        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.intensity = 0.9;
        spotLight.position.set(-10, 40, 20);
        spotLight.lookAt(ball);
        spotLight.castShadow = true;
        scene.add(spotLight);

        //var orbitControls = new THREE.OrbitControls(camera);
        //orbitControls.autoRotate = true;

        scene.add(group);

        //document.getElementById('out').appendChild(renderer.domElement);

        window.addEventListener('resize', onWindowResize, false);

        render();

        function render() {
            analyser.getByteFrequencyData(dataArray);

            var lowerHalfArray = dataArray.slice(0, (dataArray.length / 2) - 1);
            var upperHalfArray = dataArray.slice((dataArray.length / 2) - 1, dataArray.length - 1);

            var overallAvg = avg(dataArray);
            var lowerMax = max(lowerHalfArray);
            var lowerAvg = avg(lowerHalfArray);
            var upperMax = max(upperHalfArray);
            var upperAvg = avg(upperHalfArray);

            var lowerMaxFr = lowerMax / lowerHalfArray.length;
            var lowerAvgFr = lowerAvg / lowerHalfArray.length;
            var upperMaxFr = upperMax / upperHalfArray.length;
            var upperAvgFr = upperAvg / upperHalfArray.length;

            makeRoughBall(ball, modulate(Math.pow(lowerMaxFr, 0.8), 0, 1, 0, 8), modulate(upperAvgFr, 0, 1, 0, 4));

            group.rotation.y += 0.005;
            renderer.render(scene, camera);
            requestAnimationFrame(render);
        }

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        audio.play();

       function makeRoughBall(mesh, bassFr, treFr) {
            mesh.geometry.vertices.forEach(function (vertex, i) {
                var offset = mesh.geometry.parameters.radius;
                var amp = 7;
                var time = window.performance.now();
                vertex.normalize();
                var rf = 0.00001;
                var distance = (offset + bassFr) + noise.noise3D(vertex.x + time * rf * 7, vertex.y + time * rf * 8, vertex.z + time * rf * 9) * amp * treFr;
                vertex.multiplyScalar(distance);
            });
            mesh.geometry.verticesNeedUpdate = true;
            mesh.geometry.normalsNeedUpdate = true;
            mesh.geometry.computeVertexNormals();
            mesh.geometry.computeFaceNormals();
        }
    


        //some helper functions here
        function fractionate(val, minVal, maxVal) {
            return (val - minVal) / (maxVal - minVal);
        }

        function modulate(val, minVal, maxVal, outMin, outMax) {
            var fr = fractionate(val, minVal, maxVal);
            var delta = outMax - outMin;
            return outMin + (fr * delta);
        }

        function avg(arr) {
            var total = arr.reduce(function (sum, b) { return sum + b; });
            return (total / arr.length);
        }

        function max(arr) {
            return arr.reduce(function (a, b) { return Math.max(a, b); })
        }
    };

    makeRoughBall(mesh, bassFr, treFr, noise) {
        mesh.geometry.vertices.forEach(function (vertex, i) {
            var offset = mesh.geometry.parameters.radius;
            var amp = 7;
            var time = window.performance.now();
            vertex.normalize();
            var rf = 0.00001;
            var distance = (offset + bassFr) + noise.noise3D(vertex.x + time * rf * 7, vertex.y + time * rf * 8, vertex.z + time * rf * 9) * amp * treFr;
            vertex.multiplyScalar(distance);
        });
        mesh.geometry.verticesNeedUpdate = true;
        mesh.geometry.normalsNeedUpdate = true;
        mesh.geometry.computeVertexNormals();
        mesh.geometry.computeFaceNormals();
    }

    async startMusic() {

        this.audioEle.play();
        var mediaStream = this.audioEle.captureStream();
        this.setState({ audio: mediaStream });

        if (this.ctx == null) {
            this.ctx = new AudioContext();
            this.audio = document.getElementById('audio-element');
            this.audioSrc = this.ctx.createMediaElementSource(this.audio);
            this.audioSrc.connect(this.ctx.destination);
            this.analyser = this.ctx.createAnalyser();
            this.audioSrc.connect(this.analyser);
        } else {
            this.ctx.resume();
        }

        if (this.counter === 0){
            console.log("test");
                    this.startAnimation4(this.analyser, this.renderer, this.scene, this.audio, this.camera, this.ball, this.group, this.noise);
        this.counter ++;
        }
    }

    stopMusic() {
        this.audioEle.pause();
        this.state.audio.getTracks().forEach(track => track.stop());
        this.setState({ audio: null });

        //this.ctx.pause();
    }

    toggleMusic() {
        if (this.state.audio) {
            this.stopMusic();
        } else {
            this.startMusic();
        }
    }


    render() {
        return (
            <div className="AudioPlayer">
                <audio id="audio-element" preload="true" src={`${song}`} crossorigin="anonymous" ></audio>
                <div className="controls">
                    <button onClick={this.toggleMusic}>
                        {this.state.audio ? 'Pause' : 'Play'}
                    </button>
                </div>

                <div id="test">
                    <canvas id="testCanvas"></canvas>
                </div>

            </div>
        );
    }
}

export default Audio;