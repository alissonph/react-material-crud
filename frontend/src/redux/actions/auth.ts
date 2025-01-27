import api from '../../services/api';
import { returnErrors } from './error';

export const USER_LOADED = 'USER_LOADED';
export const USER_LOADING = 'USER_LOADING';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const USER_UPDATE_FAIL = 'USER_UPDATE_FAIL';

export const loadUser = () => async (dispatch: any, getState: any) => {
  const token = getState().auth.token;
  dispatch({type: USER_LOADING});
  
  try {
    const response = await api.get('/user', { headers: {'Authorization' : `Bearer ${token}`}});
    dispatch({ type: USER_LOADED, payload: response.data });
  } catch (error) {
    dispatch(
      returnErrors(error.response ? error?.response?.data?.error : error.toString(), error?.response?.status, 'AUTH_ERROR')
    );
    dispatch({ type: AUTH_ERROR });
  }
};

export const register = (user: object) => async (dispatch: any) => {
  dispatch({type: USER_LOADING});
  try {
    const response = await api.post('/register', user);
    dispatch({ type: REGISTER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch(
      returnErrors(error.response ? error?.response?.data?.error : error.toString(), error?.response?.status, 'REGISTER_FAIL')
    );
    dispatch({ type: REGISTER_FAIL });
  }
};

export const updateUser = (user: object) => async (dispatch: any, getState: any) => {
  const token = getState().auth.token;
  dispatch({type: USER_LOADING});
  try {
    const response = await api.put('/user', user, { headers: {'Authorization' : `Bearer ${token}`}});
    dispatch({ type: USER_UPDATE_SUCCESS, payload: {user: response.data} });
  } catch (error) {
    dispatch(
      returnErrors(error.response ? error?.response?.data?.error : error.toString(), error?.response?.status, 'USER_UPDATE_FAIL')
    );
    dispatch({ type: USER_UPDATE_FAIL });
  }
};

export const login = (user: object) => async (dispatch: any) => {
  dispatch({type: USER_LOADING});
  try {
    const response = await api.post('/auth', user);
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch(
      returnErrors(error.response ? error?.response?.data?.error : error.toString(), error?.response?.status, 'LOGIN_FAIL')
    );
    dispatch({ type: LOGIN_FAIL });
  }
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};