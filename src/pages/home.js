import React, { Component } from 'react';


import AudioTest from '../audioAnalyser/audio';


import "./styles/modelViewer.css"

import  { Fragment } from 'react';
import posed from 'react-pose';


const ListContainer = posed.ul({
  open: {
    x: '10%',
    delayChildren: 200,
    staggerChildren: 50
  },
  closed: { x: '100%', delay: 500 },
});

const P = posed.li({
  open: { y: 0, opacity: 1 },
  closed: { y: 20, opacity: 0 },
});



export default class Home extends Component {

  state = { isOpen: false };

  componentDidMount() {
    setTimeout(this.toggle, 1000);
  }

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render () {

    const { isOpen } = this.state;
      return (
     
        
          <ListContainer pose={isOpen ? 'open' : 'closed'} >
            <h1>Hello World!</h1>
            <P>
            <AudioTest></AudioTest>          
            </P>
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
          </ListContainer>
          
       
       
      );
  }
}