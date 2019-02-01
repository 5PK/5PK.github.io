import React, { Component } from 'react';
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


export default class About extends Component {

  state = { isOpen: false };

  componentDidMount() {
    setTimeout(this.toggle, 1000);
  }

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render() {

    const { isOpen } = this.state;
    return (
      <ListContainer pose={isOpen ? 'open' : 'closed'}>
        <h2>Who is Kevin Tran?</h2>
        <P>
          I'm a Software Developer from Hamilton, Ontario.
    </P>
        <P>
          I love to learn new things and apply what I've learned to my work. I'm mainly a web developer .
    </P>
        <P>
          Speaking of guitar,
    </P>
        <P>
          It was popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop publishing
          software like Aldus PageMaker including versions of Lorem Ipsum.
    </P>
      </ListContainer>
    )
  }
};
