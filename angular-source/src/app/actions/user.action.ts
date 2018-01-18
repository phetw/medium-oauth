import { Action } from '@ngrx/store';

export const LOAD_PROFILE = '[User] Profile';
export const LOAD_PROFILE_SUCCESS = '[User] Load profile success';
export const LOAD_PROFILE_FAILED = '[User] Load profile failed';

export class LoadProfile implements Action {
    readonly type = LOAD_PROFILE;
}

export class LoadProfileSuccess implements Action {
    readonly type = LOAD_PROFILE_SUCCESS;
    constructor(public payload: any) { }
}

export class LoadProfileFailed implements Action {
    readonly type = LOAD_PROFILE_FAILED;
    constructor(public payload: any) { }
}


export type Actions = LoadProfile | LoadProfileSuccess | LoadProfileFailed;
