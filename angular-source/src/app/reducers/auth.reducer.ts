import * as act from '../actions/auth.action';

export interface State {
    tempAuthCodeValid: boolean;
    didCheckTokenExpire: boolean;
    isTokenExpired: boolean;
    isLoggedIn: boolean;
}

export const initialState: State = {
    tempAuthCodeValid: false,
    didCheckTokenExpire: false,
    isLoggedIn: false,
    isTokenExpired: false
};

export function reducer(state = initialState, action = act.Actions): State {
    switch (action.type) {
        case act.TEMP_AUTH_CODE_VALID: {
            return {
                ...state,
                tempAuthCodeValid: true
            };
        }
        case act.TEMP_AUTH_CODE_INVALID: {
            return {
                ...state,
                tempAuthCodeValid: false
            };
        }
        case act.USER_LOGIN_SUCCESS: {
            return {
                ...state,
                isLoggedIn: true
            };
        }
        case act.USER_LOGIN_FAILED: {
            return {
                ...state,
                isLoggedIn: false
            };
        }
        case act.CHECK_TOKEN_EXPIRE: {
            return {
                ...state,
                didCheckTokenExpire: true
            };
        }
        case act.ACCESS_TOKEN_VALID: {
            return {
                ...state,
                isTokenExpired: false
            };
        }
        case act.ACCESS_TOKEN_EXPIRED: {
            return {
                ...state,
                isTokenExpired: true
            };
        }
        case act.USER_LOGOUT: {
            console.log('logging out');
            return {
                tempAuthCodeValid: false,
                didCheckTokenExpire: false,
                isLoggedIn: false,
                isTokenExpired: false
            };
        }
        default: {
            return state;
        }
    }
}

