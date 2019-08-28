import { Action } from '@ngrx/store';
import { IUser } from '../../model/user.model';

export enum AuthActionTypes {
    LoginAction = '[Auth] Login',
    LogoutAction = '[Auth] Logout',
}

export class Login implements Action {
    readonly type = AuthActionTypes.LoginAction;
    constructor(public payload: { user: IUser }) {}
}

export class Logout implements Action {
    readonly type = AuthActionTypes.LogoutAction;
    constructor() {}
}

export type AuthActions = Login | Logout;
