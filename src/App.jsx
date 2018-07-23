import 'semantic-ui-css/semantic.min.css';
import './App.css';

import React from 'react';
// import bottle from 'bottlejs';
// import createHistory from 'history/createBrowserHistory';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Container } from 'semantic-ui-react';

import store from './store';

import MyNavBar from './components/MyNavBar/MyNavBar';
import Lobby from './pages/Lobby/Lobby';
import logo from './img/logo.png';

// const history = bottle(() => createHistory());

function App() {
  return (
    <Provider store={store()}>
      <Router basename="/">
        <React.Fragment>
          <MyNavBar logo={logo} />
          <Container className="app-body">
            <Lobby />
          </Container>
        </React.Fragment>
      </Router>
    </Provider>
  );
}

export default App;
