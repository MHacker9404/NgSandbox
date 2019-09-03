import _flatted from 'flatted';
import { NGXLogger } from 'ngx-logger';
import { defer, of } from 'rxjs';
import { tap } from 'rxjs/operators/tap';

import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { IUser } from '../../model/user.model';
import { AuthActionTypes, Login, Logout } from './actions';

@Injectable()
export class AuthEffects {
    @Effect({ dispatch: false })
    login$ = this._actions$.pipe(
        ofType<Login>(AuthActionTypes.LoginAction),
        tap((action: Login) => localStorage.setItem('user', _flatted.stringify(action.payload.user)))
    );

    @Effect({ dispatch: false })
    logout$ = this._actions$.pipe(
        ofType<Logout>(AuthActionTypes.LogoutAction),
        tap(() => {
            localStorage.removeItem('user');

            const state = this._router.routerState.snapshot;
            const posn = state.url.search('section-06') + 'section-06'.length;
            const slice = state.url.slice(0, posn);
            // this._log.trace(posn, slice);

            this._router.navigateByUrl(`${slice}/login`);
        })
    );

    @Effect()
    init$ = defer(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const user: IUser = _flatted.parse(userData);
            return of(new Login({ user }));
        } else {
            return of(new Logout());
        }
    });

    constructor(
        private _actions$: Actions,
        private _router: Router,
        private _route: ActivatedRoute,
        private _log: NGXLogger
    ) {}
}
