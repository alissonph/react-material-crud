import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { store, persistor } from './redux/store';

import Login from './pages/Login';
import Register from './pages/Register';
import User from './pages/User';

const theme = createMuiTheme({
  palette:{
    primary: {
      main: '#000',
    },
    secondary: {
      main: '#db3939'
    }
  }
});


const PrivateRoute = ({component, ...rest}: any) => {
  const routeComponent = (props: any) => (
    store.getState().auth.isAuthenticated
          ? React.createElement(component, props)
          : <Redirect to={{pathname: '/login'}}/>
  );
  return <Route {...rest} render={routeComponent}/>;
};

function App() {
  //TODO - listener no location para dar um clear nos erros sempre que trocar de página

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Switch>
              <Route path="/login" exact component={Login} />
              <Route path="/cadastro" exact component={Register} />
              <PrivateRoute path="/editarPerfil" exact component={Register} />
              <Route path="/usuario" exact component={User} />
              <Redirect to="/login" />
            </Switch>
          </Router>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;