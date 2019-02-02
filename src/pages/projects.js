import React, { Component } from 'react';
import posed from 'react-pose';
import { Link } from 'react-router-dom';
import "./styles/projects.css"

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


export default class Projects extends Component {

  state = { isOpen: false };

  componentDidMount() {
    setTimeout(this.toggle, 1000);
  }

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render() {

    const { isOpen } = this.state;
    return (

      <ListContainer pose={isOpen ? 'open' : 'closed'} className="projectList">
       <Item className="projectListItem">
       <h1>My Experience</h1>
       </Item>

        <Item className="projectListItem">
          <p>SeizeAlert</p>
        </Item>
        <Item className="projectListItem">
          <p>Hold 'Em</p>
        </Item>
        <Item className="projectListItem">
          <p>AutoManage</p>
        </Item>
        <Item className="projectListItem">
          <p>Raspberry Pi</p>
        </Item>
      </ListContainer>

    );
  }
}
