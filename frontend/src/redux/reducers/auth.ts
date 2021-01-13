import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL
} from "../actions/auth";
import { IAction, IStateAuth } from "../../types";

const INITIAL_STATE: IStateAuth = {
  token: null,
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

export const authReducer = (state = INITIAL_STATE, action: IAction) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
      };
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isLoading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case USER_UPDATE_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
