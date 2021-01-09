import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';

import store from './redux/store';
import Login from './pages/Login';
import Register from './pages/Register';
import User from './pages/User';

const theme = createMuiTheme({
  /*palette:{
    primary: {
      main: '#FFF',
    }
  }*/
});

/*const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)*/

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/cadastro" exact component={Register} />
            <Route path="/cadastro/:id" exact component={Register} />
            <Route path="/usuario" exact component={User} />
            <Redirect to="/login" />
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;