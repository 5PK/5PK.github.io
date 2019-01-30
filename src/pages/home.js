import React, { Component } from 'react';
import threeEntryPoint from '../threejs/threeEntryPoint';

import AudioTest from '../audioAnalyser/audio';


import "./styles/modelViewer.css"

import  { Fragment } from 'react';
import posed from 'react-pose';

const Container = posed.div({
  enter: { staggerChildren: 50 }
});

const P = posed.p({
  enter: { x: 0, opacity: 1 },
  exit: { x: 50, opacity: 0 }
});



export default class Home extends Component {
  componentDidMount() {
    

    
  }
  render () {
      return (
        <div>
          
          <Container>
            <h1>Hello World!</h1>
            <AudioTest></AudioTest>          

            <P>
              I'm Kevin, 
            </P>
            <P>
              Welcome to my portfolio. Feel free to browse and learn more about me.
            </P>
            <P>
              My github is below, and feel free to connect with me on LinkedIn as well :)
            </P>
            <P>
              Also, see my tutorial if you want to make a React app similar to this one!
            </P>
          </Container>
          
    
        </div>
      );
  }
}