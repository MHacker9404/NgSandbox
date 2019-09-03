import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromSelf from './reducer';

// export const selectAuthState = (state: any): fromSelf.AuthState => state.auth as fromSelf.AuthState;
export const selectAuthState = createFeatureSelector(fromSelf.authFeatureKey);

export const isLoggedIn = createSelector(
    selectAuthState,
    (authState: fromSelf.AuthState): boolean => {
        return authState && authState.auth && authState.auth.isLoggedIn;
    }
);

export const isLoggedOut = createSelector(
    isLoggedIn,
    (loggedIn: boolean): boolean => !loggedIn
);
