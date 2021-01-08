import api from '../../services/api';

export const REGISTER_USER = "REGISTER_USER";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAIL = "REGISTER_USER_FAIL";

export const register = (user: object) =>  async (dispatch: any) => {
    var payload = {errorMessage: '', data: []};

    try {
        let response = await api.post('/register',user);
        console.log("Response: ",response.data)
        payload.data = response.data;
        dispatch({type: REGISTER_USER_SUCCESS, payload});
    } catch (error) {
        payload.errorMessage = error;
        dispatch({type: REGISTER_USER_FAIL, payload});
    }
    
};