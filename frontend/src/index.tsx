import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
//import Login from './pages/Login';
import Cadastro from './pages/Cadastro';

const theme = createMuiTheme({
  /*palette:{
    primary: {
      main: '#FFF',
    }
  }*/
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/*<Login />*/}
      <Cadastro />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);