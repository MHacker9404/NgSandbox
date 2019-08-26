import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromSelf from './reducer';

// export const selectAuthState = (state: any): fromSelf.AuthState => state.auth as fromSelf.AuthState;
export const selectAuthState = createFeatureSelector(fromSelf.authFeatureKey);

export const isLoggedIn = createSelector(
    selectAuthState,
    (authState: fromSelf.AuthState): boolean => {
        // console.log(`authState: `, authState);
        return authState && authState.isLoggedIn;
    }
);

export const isLoggedOut = createSelector(
    isLoggedIn,
    (loggedIn: boolean): boolean => !loggedIn
);
