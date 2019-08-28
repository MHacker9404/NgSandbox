import { Action } from '@ngrx/store';
import { IUser } from '../../model/user.model';
import { AuthActions, AuthActionTypes } from './actions';
import * as fromApp from 'src/app/state/index';
import * as fromParent from '../../state/reducer';

export const authFeatureKey = `${fromParent.section05FeatureKey}:auth`;

export interface AuthState extends fromApp.AppState {
    auth: {
        isLoggedIn: boolean;
        user: IUser;
    };
}

export const initialState: AuthState = {
    auth: {
        isLoggedIn: false,
        user: undefined,
    },
};

export function reducer(state: AuthState = initialState, action: AuthActions): AuthState {
    switch (action.type) {
        case AuthActionTypes.LoginAction:
            return {
                auth: {
                    isLoggedIn: true,
                    user: action.payload.user,
                },
            };
        case AuthActionTypes.LogoutAction:
            return {
                auth: {
                    isLoggedIn: false,
                    user: undefined,
                },
            };
        default:
            return state;
    }
}
