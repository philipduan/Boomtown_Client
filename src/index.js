import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import muiTheme from './config/theme';

import Layout from './components/Layout';
import store from './redux/store.js';
import Login from './containers/Login';
import Items from './containers/Items';
import Profile from './containers/Profile';
import Share from './containers/Share';

const Boomtown = () => (
  <BrowserRouter>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Provider store={store}>
        <Switch>
          <Layout>
            <Route exact path="/" component={Login} />
            <Route path="/items" component={Items} />
            <Route path="/profile/:id" component={Profile} />
            <Route path="/share" component={Share} />
          </Layout>
        </Switch>
      </Provider>
    </MuiThemeProvider>
  </BrowserRouter>
);

ReactDOM.render(<Boomtown />, document.getElementById('root'));
registerServiceWorker();
