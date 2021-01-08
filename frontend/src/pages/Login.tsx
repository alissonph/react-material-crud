import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { Checkbox, CircularProgress, Container, FormControlLabel, Grid, Link, makeStyles, Paper, Snackbar, TextField, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

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

function Login() {
  const classes = useStyles();
  const [state, setState] = useState({loading: false, email: '', password: ''})
  const [error, setError] = useState({visible: false, message: ''});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    setState({...state, loading: true});

    setTimeout(() => {
      if(state.email === 'alissonphausmann@hotmail.com' && state.password === '123'){

      }else{
        setError({visible: true, message: 'E-mail ou senha incorretos.'});
      }
      setState({...state, loading: false});
    },2000);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({...state, [event.target.id]: event.target.value});
  }

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
              disabled={state.loading}
              className={classes.submit}>
              {!state.loading && 'Entrar'}
              {state.loading && <CircularProgress color="primary" size={25} />}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#">
                  Esqueceu a senha?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#">
                  Cadastre-se
                </Link>
              </Grid>
            </Grid>
          </form>

          <Snackbar open={error.visible} autoHideDuration={6000} onClose={()=> setError({...error, visible: false})}>
            <Alert severity="error" elevation={6} variant="filled">
              {error.message}
            </Alert>
          </Snackbar>
      </Paper>
    </Container>
  );
}

export default Login;
