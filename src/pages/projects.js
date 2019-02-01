import React, { Component } from 'react';
import posed from 'react-pose';
import { Link } from 'react-router-dom';

const ListContainer = posed.ul({
  open: {
    x: '10%',
    delayChildren: 200,
    staggerChildren: 50
  },
  closed: { x: '100%', delay: 500 },
});

const Item = posed.li({
  open: { y: 0, opacity: 1 },
  closed: { y: 20, opacity: 0 },
});


export default class Projects extends Component {

  state = { isOpen: false };

  componentDidMount() {
    setTimeout(this.toggle, 1000);
  }

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render() {

    const { isOpen } = this.state;
    return (

      <ListContainer pose={isOpen ? 'open' : 'closed'}>
        <h2>My Experience</h2>
        <Item>
          <Link to="/about">About</Link>
          <p>Some generic description about the about page. About.</p>
        </Item>
        <Item>
          <Link to="/about">About</Link>
          <p>Some generic description about the about page. About.</p>
        </Item>
        <Item>
          <Link to="/about">About</Link>
          <p>Some generic description about the about page. About.</p>
        </Item>
        <Item>
          <Link to="/about">About</Link>
          <p>Some generic description about the about page. About.</p>
        </Item>
      </ListContainer>

    );
  }
}
