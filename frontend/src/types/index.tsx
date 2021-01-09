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
