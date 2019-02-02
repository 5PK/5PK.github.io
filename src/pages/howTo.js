import React, { Component }  from 'react';
import posed from 'react-pose';
import "./styles/howTo.css"

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

export default class HowTo extends Component {


  state = { isOpen: false };

  componentDidMount() {
    setTimeout(this.toggle, 1000);
  }

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render() {

    const { isOpen } = this.state;
    return (
      <ListContainer pose={isOpen ? 'open' : 'closed'} className="howList">
      <Item className="howTitle">
      <h1>How did I make this app?</h1>

      </Item>
        <Item className="howItem">
          <p>Coming Soon!</p>
      </Item>
      </ListContainer>
    )
}};
