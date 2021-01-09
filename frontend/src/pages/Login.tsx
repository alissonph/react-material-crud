import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as LinkRouter, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Checkbox, CircularProgress, Container, FormControlLabel, Grid, Link, makeStyles, Paper, Snackbar, TextField, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { RootState } from '../redux/reducers';
import { clearErrors } from '../redux/actions/error';
import { login } from '../redux/actions/auth';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(5, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login: React.FC = () => {
  let history = useHistory();
  const { auth, error } = useSelector((store: RootState) => store);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [state, setState] = useState({email: '', password: ''})

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    dispatch(await login({
      email: state.email,
      password: state.password
    }));
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({...state, [event.target.id]: event.target.value});
  }

  const closeErrorAlert = () => {
    dispatch(clearErrors());
  }

  useEffect(() => {
    if(auth.isAuthenticated){
      history.push('/usuario');
    }
  }, [history, auth.isAuthenticated]);

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={5} className={classes.paper}>
          <Typography component="h1" variant="h5">
            Entrar no Sistema
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField variant="outlined" margin="normal" fullWidth required
              label="E-mail"
              type="email"
              id="email"
              value={state.email}
              onChange={handleChange}
              //helperText="Incorrect entry."
              //error
              autoFocus
            />
            <TextField variant="outlined" margin="normal" fullWidth required
              label="Senha"
              type="password"
              id="password"
              value={state.password}
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Mantenha-me conectado"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={auth.isLoading}
              className={classes.submit}>
              {!auth.isLoading && 'Entrar'}
              {auth.isLoading && <CircularProgress color="primary" size={25} />}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link component={LinkRouter} to="/">
                  Esqueceu a senha?
                </Link>
              </Grid>
              <Grid item>
                <Link component={LinkRouter} to="/cadastro">
                  Cadastre-se
                </Link>
              </Grid>
            </Grid>
          </form>

          <Snackbar open={error.id === 'LOGIN_FAIL'} autoHideDuration={6000} onClose={closeErrorAlert}>
            <Alert severity="error" elevation={6} variant="filled">
              {error.msg}
            </Alert>
          </Snackbar>
      </Paper>
    </Container>
  );
}

export default Login;
