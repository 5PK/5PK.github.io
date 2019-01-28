import React, { Component } from 'react';

import * as THREE from 'three';
import song from './Teehee.mp3';

class Audio extends Component {
  constructor(props) {
    super(props);
    this.state = {        
        audio : null
    };
    this.audioEle = null;
    this.songName = 'Blues in A';
    this.audioStatus = 'PAUSED';

    this.toggleMusic = this.toggleMusic.bind(this);

    
  }
  componentDidMount() {

    this.audioEle = document.getElementById('audio-element');
    console.log("component mounted");

    // audio setup


    // threejs setup
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 80000);
    this.camera.position.set(0, 0, 2100);

    this.camera.lookAt(this.scene.position);

    this.renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(300, 200);

    document.getElementById('test').appendChild(this.renderer.domElement);

  }

  getaudio(){

  }


  letsgo2(analyser, renderer, scene, audio, camera) {

    console.log("Enter letsgo2");

    // threejs color gradient line helper
    function getColoredBufferLine(steps, phase, geometry) {

        var vertices = geometry.vertices;
        var segments = geometry.vertices.length;

        // geometry
        var geometry = new THREE.BufferGeometry();

        // material
        var lineMaterial = new THREE.LineBasicMaterial({
            vertexColors: THREE.VertexColors
        });

        // attributes
        var positions = new Float32Array(segments * 3); // 3 vertices per point
        var colors = new Float32Array(segments * 3);

        var frequency = 1 / (steps * segments);
        var color = new THREE.Color();

        var x, y, z;

        for (var i = 0, l = segments; i < l; i++) {

            x = vertices[i].x;
            y = vertices[i].y;
            z = vertices[i].z;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            color.set(makeColorGradient(i, frequency, phase));

            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;

        }

        geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));

        // line
        var line = new THREE.Line(geometry, lineMaterial);

        return line;

    }

    // threejs color gradient line helper
    function makeColorGradient(i, frequency, phase) {

        var center = 128;
        var width = 127;

        var redFrequency, grnFrequency, bluFrequency;
        grnFrequency = bluFrequency = redFrequency = frequency;

        var phase2 = phase + 2;
        var phase3 = phase + 4;

        var red = Math.sin(redFrequency * i + phase) * width + center;
        var green = Math.sin(grnFrequency * i + phase2) * width + center;
        var blue = Math.sin(bluFrequency * i + phase3) * width + center;

        return parseInt('0x' + _byte2Hex(red) + _byte2Hex(green) + _byte2Hex(blue));
    }

    function _byte2Hex(n) {
        var nybHexString = "0123456789ABCDEF";
        return String(nybHexString.substr((n >> 4) & 0x0F, 1)) + nybHexString.substr(n & 0x0F, 1);
    }

    // create geometry and add to scene
    function geo(arr) {

        var geometry = new THREE.Geometry();

        for (var i = 0; i < arr.length; i++) {
            var r = arr[i] + 10;
            var theta = (2 * Math.PI / 1024) * i * 11;

            geometry.vertices.push(
                new THREE.Vector3(r * Math.cos(theta), r * Math.sin(theta), 4)
            );

        }

        // parameters for gradient
        var steps = 0.09;
        var phase = 1.7;
        var coloredLine = getColoredBufferLine(steps, phase, geometry);
        coloredLine.position.set(0, -20, 0);
        scene.add(coloredLine);

    }

  
    function renderPage(arr) {
        geo(arr);
        renderer.render(scene, camera);
    }



    // analyzer return size
    var frequencyData = new Uint8Array(analyser.frequencyBinCount);

    // animation frame loop
    function renderFrame() {
        requestAnimationFrame(renderFrame);
        // update data in frequencyData
        analyser.getByteFrequencyData(frequencyData);
        // render frame based on values in frequencyData 


        //threejs visualizations
        while (scene.children.length > 0) {
            scene.remove(scene.children[0]);
        }
        renderPage(frequencyData);


        // custom audio controls


    }

    // start program
    audio.play();
    renderFrame();

  };


  async startMusic() {   

    this.audioEle.play();
    
    var mediaStream = this.audioEle.captureStream();
    
    this.setState({ audio: mediaStream });

    if (this.ctx == null){
        this.ctx = new AudioContext();
        this.audio = document.getElementById('audio-element');
        this.audioSrc = this.ctx.createMediaElementSource(this.audio);
        this.audioSrc.connect(this.ctx.destination);
        this.analyser = this.ctx.createAnalyser();
        this.audioSrc.connect(this.analyser);
    } else {
        this.ctx.resume();
    }

    this.letsgo2(this.analyser, this.renderer, this.scene, this.audio, this.camera);
    
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

        <div id="test"></div>

      </div>
    );
  }
}

export default Audio;