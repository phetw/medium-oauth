import { Action } from '@ngrx/store';

export const LOAD_PUBLICATION = '[Publication] Publication list';
export const LOAD_PUBLICATION_SUCCESS = '[User] Load publication success';
export const LOAD_PUBLICATION_FAILED = '[User] Load publication failed';

export class LoadPublication implements Action {
    readonly type = LOAD_PUBLICATION;
}

export class LoadPublicationSuccess implements Action {
    readonly type = LOAD_PUBLICATION_SUCCESS;
    constructor(public payload: any) { }
}

export class LoadPublicationFailed implements Action {
    readonly type = LOAD_PUBLICATION_FAILED;
    constructor(public payload: any) { }
}


export type Actions = LoadPublication | LoadPublicationSuccess | LoadPublicationFailed;
