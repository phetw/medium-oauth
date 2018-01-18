import * as fromAuth from '../reducers/auth.reducer';
import * as fromUser from '../reducers/user.reducer';
import * as fromPublication from '../reducers/publication.reducer';

export const reducers = {
    auth: fromAuth.reducer,
    user: fromUser.reducer,
    publication: fromPublication.reducer
};
