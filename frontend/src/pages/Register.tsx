import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { CircularProgress, Container, FormControl, Grid, InputLabel, makeStyles, MenuItem, Paper, Select, Snackbar, TextField, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

//import { IAuthReduxProps } from '../types';
import { RootState } from '../redux/reducers';
import { register } from '../redux/actions/auth';
import { clearErrors, returnErrors } from '../redux/actions/error';
import { useHistory } from 'react-router-dom';

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

const Register: React.FC = () => {
  let history = useHistory();
  const { auth, error } = useSelector((store: RootState) => store);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [state, setState] = useState({name: '', sex: '', birthDate: '', email: '', password: '', passwordConfirmation: ''})
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();

    if(state.password !== state.passwordConfirmation){
      dispatch(returnErrors('As senhas estão diferentes', 0, 'REGISTER_FAIL'));
    }else{
      dispatch(await register({
        name: state.name,
        email: state.email,
        sex: state.sex,
        birthDate: new Date(state.birthDate),
        password: state.password
      }));
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({...state, [event.target.id]: event.target.value});
  }

  const handleChangeSelect = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
    if(event.target.name){
      setState({...state, [event.target.name]: event.target.value});
    }
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
    <Container component="main" maxWidth="sm">
      <Paper elevation={5} className={classes.paper}>
          <Typography component="h1" variant="h5">
            Cadastro
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            
            <TextField variant="outlined" margin="normal" fullWidth required
              label="Nome Completo"
              type="text"
              id="name"
              value={state.name}
              onChange={handleChange}
              autoFocus
            />
            <TextField variant="outlined" margin="normal" fullWidth required
              label="E-mail"
              type="email"
              id="email"
              value={state.email}
              onChange={handleChange}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" margin="normal" required fullWidth>
                  <InputLabel id="labelSexo">Sexo</InputLabel>
                  <Select label="Sexo" required labelId="labelSexo"
                    id="sex"
                    name="sex"
                    value={state.sex}
                    onChange={handleChangeSelect}>
                    <MenuItem value="" selected>Selecione</MenuItem>
                    <MenuItem value="M">Masculino</MenuItem>
                    <MenuItem value="F">Faminino</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField variant="outlined" margin="normal" fullWidth required
                  id="birthDate"
                  label="Data de Nascimento"
                  type="date"
                  value={state.birthDate}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
            <TextField variant="outlined" margin="normal" fullWidth required
              label="Senha"
              type="password"
              id="password"
              value={state.password}
              onChange={handleChange}
            />
            <TextField variant="outlined" margin="normal" fullWidth required
              label="Confirmar Senha"
              type="password"
              id="passwordConfirmation"
              value={state.passwordConfirmation}
              onChange={handleChange}
              helperText={state.password !== state.passwordConfirmation ? 'As senhas estão diferentes' : ''}
              error={state.password !== state.passwordConfirmation}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={auth.isLoading}
              className={classes.submit}>
              {!auth.isLoading && 'Confirmar'}
              {auth.isLoading && <CircularProgress color="primary" size={25} />}
            </Button>
          </form>

          <Snackbar open={error.id === 'REGISTER_FAIL'} autoHideDuration={6000} onClose={closeErrorAlert}>
            <Alert severity="error" elevation={6} variant="filled">
              {error.msg}
            </Alert>
          </Snackbar>
      </Paper>
    </Container>
  );
}

export default Register;
