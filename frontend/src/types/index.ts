export interface IAction {
  type: string;
  payload?: any;
}

export interface IStateAuth {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  user: object | null;
}

export interface IStateError {
  msg: string;
  status: number | null;
  id: string | null;
}