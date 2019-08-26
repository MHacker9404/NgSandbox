import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Login, AuthActionTypes, Logout } from './actions';
import { tap } from 'rxjs/operators/tap';
import _flatted from 'flatted';
import { defer, of } from 'rxjs';
import { User } from '../../model/user.model';
import { NGXLogger } from 'ngx-logger';

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
            const posn = state.url.search('section-05') + 'section-05'.length;
            const slice = state.url.slice(0, posn);
            this._log.trace(posn, slice);

            this._router.navigateByUrl(`${slice}/login`);
        })
    );

    @Effect()
    init$ = defer(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const user: User = _flatted.parse(userData);
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
