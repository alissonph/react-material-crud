import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { errorReducer } from "./error";

export const reducers = combineReducers({
  auth: authReducer,
  error: errorReducer,
});

export type RootState = ReturnType<typeof reducers>;