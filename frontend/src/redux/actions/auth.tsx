import api from "../../services/api";
import { returnErrors } from "./error";

export const USER_LOADED = "USER_LOADED";
export const USER_LOADING = "USER_LOADING";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";

export const register = (user: object) => async (dispatch: any) => {
  dispatch({type: USER_LOADING});
  try {
    const response = await api.post("/register", user);
    console.log("Response: ", response.data);
    dispatch({ type: REGISTER_SUCCESS, payload: response.data });
  } catch (error) {
    console.log("Error:" + error.response.data.error);
    dispatch(
      returnErrors(error.response.data.error, error.response.status, 'REGISTER_FAIL')
    );
    dispatch({ type: REGISTER_FAIL });
  }
};
