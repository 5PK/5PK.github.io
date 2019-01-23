import React, { Component } from 'react';
import AudioAnalyser from './audioAnalyser';

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
  }

  async startMusic() {   

    this.audioEle.play();
    
    var mediaStream = this.audioEle.captureStream();
    
    this.setState({ audio: mediaStream });

    
  }

  stopMusic() {
    this.audioEle.pause();
    this.state.audio.getTracks().forEach(track => track.stop());
    this.setState({ audio: null }); 
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
        {this.state.audio ? <AudioAnalyser audio={this.state.audio} /> : ''}
      </div>
    );
  }
}

export default Audio;