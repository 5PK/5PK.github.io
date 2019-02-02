import React from 'react';
import posed from 'react-pose';

import "./styles/work.css"

const ListContainer = posed.ul({
  open: {
    y: '0%',
    delayChildren: 200,
    staggerChildren: 50
  },
  closed: { y: '-100%', delay: 250 },
});


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

        <ListContainer className="workList" pose={isOpen ? 'open' : 'closed'}>
        <Item className="workListTitle">
        <h1>My Experience</h1>
        </Item>
        
          <Item className="workListItem">
            <div>
              <h3  >Evenica</h3>
              
            </div>
          </Item>
          <Item className="workListItem">
            <div>
              <h3>Bashx3</h3>
            </div>
          </Item >
          <Item className="workListItem">
            <div>
              <h3>Tomson Automotive</h3>
            </div>
          </Item>
        </ListContainer>
    
    );
  }
}

export default Work;
