import { createSelector } from '@ngrx/store';
import { AuthState } from './reducer';

export const selectAuthState = (state: any): AuthState => state.auth as AuthState;

export const isLoggedIn = createSelector(
    selectAuthState,
    (authState: AuthState): boolean => authState && authState.isLoggedIn
);

export const isLoggedOut = createSelector(
    isLoggedIn,
    (loggedIn: boolean): boolean => !loggedIn
);
