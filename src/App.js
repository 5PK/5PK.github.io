import React, { Component } from 'react';
import posed from 'react-pose';
import logo from './logo.svg';
import './App.css';


const Sidebar = posed.ul({
  open: {
    x: '0%',
    delayChildren: 200,
    staggerChildren: 50
  },
  closed: { x: '-100%', delay: 300 }
});

const Item = posed.li({
  open: { y: 0, opacity: 1 },
  closed: { y: 20, opacity: 0 },
  hoverable: true,
  pressable: true,
  init: {
    scale: 1,
    boxShadow: '0px 0px 0px rgba(0,0,0,0)'
  },
  hover: {
    scale: 1.1,
    boxShadow: '0px 5px 10px rgba(0,0,0,0.2)'
  },
  press: {
    scale: 1.05,
    boxShadow: '0px 2px 5px rgba(0,0,0,0.1)'
  }
});

const Line = posed.div({
  





});


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

class Example extends React.PureComponent {
  state = { isOpen: false };

  componentDidMount() {
    setTimeout(this.toggle, 1000);
  }

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const { isOpen } = this.state;

    return (
      <Sidebar className="sidebar" pose={isOpen ? 'open' : 'closed'}>
        <h1 className="menuTitle" >ktran.info</h1>
        <p>Hi, I'm Kevin. I write code, but most of all I like to learn.</p>
        <Item className="menuBtn" > <div> <h3 className="itemText" >My Experience</h3> </div>  </Item>
        <Item className="menuBtn" > <h3 className="itemText" >My Projects </h3></Item>
        <Item className="menuBtn" > <h3 className="itemText" >About Me</h3> </Item>
        <Item className="menuBtn" > <h3 className="itemText" >How to make a site like this</h3> </Item>
      </Sidebar>
    );
  }
}

export default Example;
