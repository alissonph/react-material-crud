import { GET_ERRORS, CLEAR_ERRORS } from '../actions/error';
import { IAction } from '../../types';

const INITIAL_STATE = {
  msg: {},
  status: null,
  id: null
};

export const errorReducer = (state = INITIAL_STATE, action: IAction) => {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id
      };
    case CLEAR_ERRORS:
      return {
        msg: {},
        status: null,
        id: null
      };
    default:
      return state;
  }
}
