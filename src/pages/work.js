import React from 'react';
import posed from 'react-pose';
import { Link } from 'react-router-dom';
import { tween } from "popmotion";
import { popmotion } from "popmotion";


const ListContainer = posed.ul({
  open: {
    x: '10%',
    delayChildren: 200,
    staggerChildren: 50
  },
  closed: { x: '100%', delay: 500 },
});
/*
  enter: { staggerChildren: 50 },
  exit: { staggerChildren: 20, staggerDirection: -1 }
});
*/

const Item = posed.li({
  open: { y: 0, opacity: 1 },
  closed: { y: 50, opacity: 0 },

});



class Work extends React.Component {

  state = { isOpen: false };

  componentDidMount() {
    setTimeout(this.toggle, 1000);
  }

  toggle = () => this.setState({ isOpen: !this.state.isOpen });


  render() {

    const { isOpen } = this.state;

    return (

        <ListContainer pose={isOpen ? 'open' : 'closed'}>
        <h1>My Experience</h1>
          <Item >
            <div>
              <h3  >Evenica</h3>
            </div>
          </Item>
          <Item>
            <div>
              <h3>Bashx3</h3>
            </div>
          </Item>
          <Item>
            <div>
              <h3>Tomson Automotive</h3>
            </div>
          </Item>
        </ListContainer>
    
    );
  }
}

export default Work;
