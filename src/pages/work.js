import React from 'react';
import posed from 'react-pose';
import { Link } from 'react-router-dom';
import './styles/menu.css';

const ListContainer = posed.ul({
  enter: { staggerChildren: 50 },
  exit: { staggerChildren: 20, staggerDirection: -1 }
});

const Item = posed.li({
  enter: { y: 0, opacity: 1 },
  exit: { y: 50, opacity: 0 }
});

export default () => (
  <div>
    <h1>My Experience</h1>
    <ListContainer>
      <br></br>
      <br></br>
      <Item>
        <div>
          <h3>Evenica</h3>
          <p>Some generic description about the about page. About.</p>
        </div>
      </Item>
      <Item>
        <div>
          <h3>Bashx3</h3>
          <p>Some generic description about the about page. About.</p>
        </div>
      </Item>
      <Item>
        <div>
          <h3>Tomson Automotive</h3>
          <p>Some generic description about the about page. About.</p>
        </div>
      </Item>
    </ListContainer>
  </div>
);
