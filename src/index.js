import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Menu from './App';
import * as serviceWorker from './serviceWorker';


import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import posed, { PoseGroup } from 'react-pose';
import Home from './pages/home';
import About from './pages/about';
import ModelViewer from './pages/modelViewer';

//ReactDOM.render(<App />, document.getElementById('root'));

const RouteContainer = posed.div({
  
    enter: { opacity: 1, delay: 300, beforeChildren: true },
    exit: { opacity: 0 }
  });
  
  const App = () => (
    <Route
      render={({ location }) => (       
      
        
        <div id="site-container">             
            <div id="content-container">     
                <div id="sideBar">
                    <Menu/>
                </div>
                <div id="content">
                <PoseGroup>
                    <RouteContainer key={location.pathname}>
                        <Switch location={location}>
                        <Route exact path="/" component={Home} key="home" />
                        <Route path="/about" component={About} key="about" />
                        <Route path="/modelViewer" component={ModelViewer} key="modelViewer" />
                        </Switch>
                    </RouteContainer>
                </PoseGroup>
                </div>
            </div>
         
        </div>
      )}
    />
  );
  
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('root')
  );

//ReactDOM.render(<Menu />, document.getElementById('sideBar'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();




/*

            <ul id="site-nav">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>

*/