import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router/immutable';
import createHistory from 'history/createBrowserHistory';

import { configureStore } from './store/configure-store';


//Pages to import
import Home from './pages/home';
import Work from './pages/work';
import Projects from './pages/projects';
import About from './pages/about';
import HowTo from './pages/howTo';


export default function Routes() {
    const history = createHistory({
        basename: process.env.PUBLIC_URL
    });

    const store = configureStore({ history });

    return (


        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch location={location}>
                    <Route exact path="/" component={Home} key="home" />
                    <Route path="/projects" component={Projects} key="projects" />
                    <Route path="/work" component={Work} key="work" />
                    <Route path="/howTo" component={HowTo} key="howTo" />
                    <Route path="/about" component={About} key="about" />

                </Switch>
            </ConnectedRouter>
        </Provider>

        
    );
}