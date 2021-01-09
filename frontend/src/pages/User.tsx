import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { RootState } from '../redux/reducers';
import { useHistory } from 'react-router-dom';
import { logout } from '../redux/actions/auth';


const useStyles = makeStyles((theme) => ({
  container:{
    wordWrap : 'break-word',
  },
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(5, 2, 1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Login: React.FC = () => {
  let history = useHistory();
  const { auth } = useSelector((store: RootState) => store);
  const dispatch = useDispatch();
  const classes = useStyles();
  
  const handleClickEdit = () => {
    history.push('/editarPerfil');
  }
  
  const handleClickLogout = () => {
    dispatch(logout());
  }

  useEffect(() => {
    if(!auth.isAuthenticated){
      history.push('/login');
    }
  }, [history, auth.isAuthenticated]);

  return (
    <Container component="main" maxWidth="sm" className={classes.container}>
      <Paper elevation={5} className={classes.paper}>
        <Typography component="h1" variant="h5">
          Bem-vindo {auth?.user?.name} 
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body2" gutterBottom>
              Token JWT: {auth.token}
            </Typography>
          </Grid>
        </Grid>
        <Box alignSelf="flex-end">
          <Button variant="contained" color="secondary" size="medium" onClick={handleClickEdit} className={classes.button} startIcon={<ExitToAppIcon />}>
            Editar Cadastro
          </Button>
          <Button variant="contained" color="primary" size="medium" onClick={handleClickLogout} className={classes.button} startIcon={<ExitToAppIcon />}>
            Sair
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
