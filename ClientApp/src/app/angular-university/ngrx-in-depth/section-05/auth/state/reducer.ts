import { Action } from '@ngrx/store';
import { User } from '../../model/user.model';
import { AuthActions, AuthActionTypes } from './actions';
import * as fromApp from 'src/app/state/index';
import * as fromParent from '../../state/reducer';

export const authFeatureKey = `${fromParent.section05FeatureKey}:auth`;

export interface AuthState {
    isLoggedIn: boolean;
    user: User;
}

export const initialState: AuthState = {
    isLoggedIn: false,
    user: undefined,
};

export function reducer(state: AuthState = initialState, action: AuthActions): AuthState {
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
            state = { isLoggedIn: false, user: undefined };
            return state;
        default:
            return state;
    }
}
