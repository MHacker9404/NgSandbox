import { Action } from '@ngrx/store';
import { User } from '../../model/user.model';
import { AuthActions, AuthActionTypes } from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
    isLoggedIn: boolean;
    user: User;
}

export const initialState: AuthState = {
    isLoggedIn: false,
    user: undefined,
};

export function authReducer(state: AuthState = initialState, action: AuthActions): AuthState {
    switch (action.type) {
        case AuthActionTypes.LoginAction:
            return {
                isLoggedIn: true,
                user: action.payload.user,
            };
        case AuthActionTypes.LogoutAction:
            // return {
            //     isLoggedIn: false,
            //     user: undefined,
            // };
            state = {isLoggedIn: false, user: undefined};
            return state;
        default:
            return state;
    }
}
