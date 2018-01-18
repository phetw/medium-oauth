import { Action } from '@ngrx/store';

export const TEMP_AUTH_CODE_VALID = '[Auth] Teporary code';
export const TEMP_AUTH_CODE_INVALID = '[Auth] Teporary code';

export const USER_LOGIN_SUCCESS = '[Auth] Authorize';
export const USER_LOGIN_FAILED = '[Auth] Unauthorize';

export const CHECK_TOKEN_EXPIRE = '[Auth] Check token expiry date';

export const ACCESS_TOKEN_VALID = '[Auth] Access valid';
export const ACCESS_TOKEN_EXPIRED = '[Auth] Access expired';

export class GetTemporaryAuthCodeSuccess implements Action {
    readonly type = TEMP_AUTH_CODE_VALID;
    constructor(public payload: any) { }
}

export class GetTemporaryAuthCodeFailed implements Action {
    readonly type = TEMP_AUTH_CODE_INVALID;
    constructor(public payload: any) { }
}

export class UserLoginSuccess implements Action {
    readonly type = USER_LOGIN_SUCCESS;
}

export class UserLoginFailed implements Action {
    readonly type = USER_LOGIN_FAILED;
    constructor(public payload: any) { }
}

export class CheckTokenExpiry implements Action {
    readonly type = CHECK_TOKEN_EXPIRE;
}

export class AccessTokenValid implements Action {
    readonly type = ACCESS_TOKEN_VALID;
}

export class AccessTokenExpired implements Action {
    readonly type = ACCESS_TOKEN_EXPIRED;
}

export type Actions =
    GetTemporaryAuthCodeSuccess |
    GetTemporaryAuthCodeFailed |
    UserLoginSuccess |
    UserLoginFailed |
    AccessTokenValid |
    AccessTokenExpired;
