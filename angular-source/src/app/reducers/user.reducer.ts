import * as act from '../actions/user.action';
import { Profile } from '../model/profile';

export interface State {
    isLoading: boolean;
    profileLoaded: boolean;
    userProfile: Profile;
}

export const initialState: State = {
    isLoading: false,
    profileLoaded: false,
    userProfile: {
        id: 'user_id',
        imageUrl: 'https://www.h1club.co.uk/images/bits/profile-placeholder.gif',
        name: 'name',
        url: '',
        username: 'username'
    }
};

export function reducer(state = initialState, action = act.Actions): State {
    switch (action.type) {
        case act.LOAD_PROFILE: {
            return {
                ...state,
                isLoading: true,
                profileLoaded: false
            };
        }
        case act.LOAD_PROFILE_SUCCESS: {
            return {
                isLoading: false,
                profileLoaded: true,
                userProfile: action.payload.data.data
            };
        }
        case act.LOAD_PROFILE_FAILED: {
            return {
                isLoading: false,
                profileLoaded: false,
                userProfile: action.payload.error
            };
        }
        default: {
            return state;
        }
    }
}

