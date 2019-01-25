import React, { Component } from 'react';
import SceneManager from '../threejs/SceneManager';


class AudioVisualiser extends SceneManager {
  constructor(props) {
    super(props);
    this.canvas = createCanvas(document,container);
    this.sceneManager = new SceneManager(this.canvas);
  }

  componentDidUpdate() {
    this.draw();
  }

  createCanvas(document, container) {
    const canvas = document.createElement('canvas');     
    container.appendChild(canvas);
    return canvas;
  }

  draw() {
    const { audioData } = this.props;
    const canvas = this.canvas.current;
    const height = canvas.height;
    const width = canvas.width;
    const context = canvas.getContext('2d');
    let x = 0;
    const sliceWidth = (width * 1.0) / audioData.length;

    context.lineWidth = 2;
    context.strokeStyle = '#000000';
    context.clearRect(0, 0, width, height);

    context.beginPath();
    context.moveTo(0, height / 2);
    for (const item of audioData) {
      const y = (item / 255.0) * height;
      context.lineTo(x, y);
      x += sliceWidth;
    }
    context.lineTo(x, height / 2);
    context.stroke();
  }

  newDraw() {
    const { audioData } = this.props;
    //const canvas = createCanvas(document, container);
    const canvas = this.canvas.current;
    const height = canvas.height;
    const width = canvas.width;

    const sceneManager = new SceneManager(canvas);

    let canvasHalfWidth;
    let canvasHalfHeight;

    
    //render();

    function bindEventListeners() {
        window.onresize = resizeCanvas;
        window.onmousemove = mouseMove;
        resizeCanvas();	
    }

    function resizeCanvas() {        
        canvas.style.width = '100%';
        canvas.style.height= '100%';
        
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        canvasHalfWidth = Math.round(canvas.offsetWidth/2);
        canvasHalfHeight = Math.round(canvas.offsetHeight/2);

        sceneManager.onWindowResize()
    }

    function mouseMove({screenX, screenY}) {
        sceneManager.onMouseMove(screenX-canvasHalfWidth, screenY-canvasHalfHeight);
    }

    function render(time) {
        requestAnimationFrame(render);
        sceneManager.update();
    }
  }

  
  render() {
    bindEventListeners();
    return <canvas width="300" height="300" ref={this.canvas} />;
  }
}

export default AudioVisualiser;
