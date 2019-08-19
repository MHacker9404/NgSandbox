import { Injectable } from '@angular/core';
import {
    CanActivate,
    CanActivateChild,
    CanLoad,
    Route,
    UrlSegment,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    ActivatedRoute,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../state';
import { isLoggedIn } from './auth/auth.selectors';
import { NGXLogger } from 'ngx-logger';
import { tap } from 'rxjs/operators/tap';
import { tag } from 'rxjs-spy/operators';
import _flatted from 'flatted';
import _first from 'lodash/first';

@Injectable({
    providedIn: null,
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(
        private _state: Store<AppState>,
        private _router: Router,
        private _route: ActivatedRoute,
        private _log: NGXLogger
    ) {}
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this._state.pipe(
            select(isLoggedIn),
            tap((loggedIn: boolean) => {
                if (!loggedIn) {
                    const posn = state.url.search('section-02') + 'section-02'.length;
                    const slice = state.url.slice(0, posn);
                    // this._log.trace(posn, slice);

                    this._router.navigateByUrl(`${slice}/login`);
                }
            }),
            tag('authGuard.canActivate')
        );
    }
    canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return of(true);
    }
    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
        return of(true);
    }
}
