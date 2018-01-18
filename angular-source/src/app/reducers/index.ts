import * as fromAuth from '../reducers/auth.reducer';
import * as fromUser from '../reducers/user.reducer';
import * as fromPublication from '../reducers/publication.reducer';

export interface IndexState {
    auth: fromAuth.State;
    user: fromUser.State;
    publication: fromPublication.State;
}

export const reducers = {
    auth: fromAuth.reducer,
    user: fromUser.reducer,
    publication: fromPublication.reducer
};
