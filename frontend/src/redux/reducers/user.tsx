import { REGISTER_USER, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL } from '../actions/user';

const INITIAL_STATE = {
    loading: false,
    error: false,
    errorMessage: '',
    data: []
}

interface userAction{
    type: string,
    payload: { errorMessage: string, data: [] },
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = INITIAL_STATE, action: userAction) {
    const { type, payload } = action;

    switch (type) {
        case REGISTER_USER: {
            return {
                ...state,
                loading: true,
                error: false,
                errorMessage: '',
                data: [],
            };
        }
        case REGISTER_USER_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: false,
                errorMessage: '',
                data: payload.data,
            };
        }
        case REGISTER_USER_FAIL: {
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: payload.errorMessage,
                data: payload.data,
            };
        }
        default: {
            return state;
        }
    }
}
