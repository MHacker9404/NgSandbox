import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Login, AuthActionTypes, Logout } from './auth.actions';
import { tap } from 'rxjs/operators/tap';
import _flatted from 'flatted';

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
            const posn = state.url.search('section-03') + 'section-03'.length;
            const slice = state.url.slice(0, posn);
            // this._log.trace(posn, slice);

            this._router.navigateByUrl(`${slice}/login`);
        })
    );
    constructor(private _actions$: Actions, private _router: Router, private _route: ActivatedRoute) {}
}
