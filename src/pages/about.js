import React, { Component } from 'react';
import posed from 'react-pose';
import "./styles/about.css"

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


export default class About extends Component {

  state = { isOpen: false };

  componentDidMount() {
    setTimeout(this.toggle, 1000);
  }

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render() {

    const { isOpen } = this.state;
    return (
      <ListContainer pose={isOpen ? 'open' : 'closed'} className="aboutList">
      <Item className="aboutListTitle">
      <h2>Who is Kevin Tran?</h2>

      </Item>
        <Item className="aboutListItem">
          I'm a Software Developer from Hamilton, Ontario.
    </Item>
        <Item className="aboutListItem">
          I love to learn new things and apply what I've learned to my work. I'm mainly a web developer. But I have an active interest in embedded systems and lower level programming. 
    </Item>
        <Item className="aboutListItem">
          Some of my hobbies are climbing, playing the guitar and I also love to travel.
    </Item>
        <Item className="aboutListItem">
          If you see any issues, please submit an issue to my github! It's much appreciated.
    </Item>
      </ListContainer>
    )
  }
};
