import * as act from '../actions/publication.action';
import { Publication } from '../model/publication';

export interface State {
    isLoading: boolean;
    publicationLoaded: boolean;
    publicationList: Publication[];
}

export const initialState: State = {
    isLoading: false,
    publicationLoaded: false,
    publicationList: []
};

export function reducer(state = initialState, action = act.Actions): State {
    switch (action.type) {
        case act.LOAD_PUBLICATION: {
            return {
                ...state,
                isLoading: true,
                publicationLoaded: false,
            };
        }
        case act.LOAD_PUBLICATION_SUCCESS: {
            return {
                isLoading: false,
                publicationLoaded: true,
                publicationList: action.payload.data
            };
        }
        case act.LOAD_PUBLICATION_FAILED: {
            return {
                isLoading: false,
                publicationLoaded: false,
                publicationList: action.payload.error
            };
        }
        default: {
            return state;
        }
    }
}

