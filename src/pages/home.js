import React, { Component } from 'react';

import AudioTest from '../audioAnalyser/audio';

import "./styles/home.css"

import { Fragment } from 'react';
import posed from 'react-pose';


const ListContainer = posed.ul({
  open: {
    y: '0%',
    delayChildren: 200,
    staggerChildren: 50
  },
  closed: { y: '-100%', delay: 500 },
});

const Item = posed.li({
  open: { y: 0, opacity: 1 },
  closed: { y: 20, opacity: 0 },
});



export default class Home extends Component {

  state = { isOpen: false };

  componentDidMount() {
    setTimeout(this.toggle, 1000);
  }

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render() {

    const { isOpen } = this.state;
    return (


      <ListContainer pose={isOpen ? 'open' : 'closed'} className="homeList">
        <Item className="homeListTitle">
          <h1>Hello World!</h1>
        </Item>

        <Item className="homeListItem">
          <AudioTest></AudioTest>
        </Item>
        <Item className="homeListItem">
          <div className="talk-bubble tri-right round left-top">
            <div className="talktext">
              <p>Hi there, I'm Kevin and welcome to my portfolio. 
                <br></br>
                <br></br>
                 Feel free to have a browse around and learn more about me!
                 <br></br>
                 I have my github and LinkedIn on the left menu if you want to see my work in depth, or if you want to contact me. 
                 <br></br>
                 <br></br>
                 Thanks for stopping by!
              </p>
            </div>
          </div>
       </Item>
      </ListContainer>



    );
  }
}