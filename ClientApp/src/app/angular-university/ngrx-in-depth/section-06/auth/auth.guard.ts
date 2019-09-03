import { Injectable, OnInit, OnDestroy } from '@angular/core';
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
import { isLoggedIn } from './state/selectors';
import { NGXLogger } from 'ngx-logger';
import { tap } from 'rxjs/operators/tap';
import { tag } from 'rxjs-spy/operators';
import _flatted from 'flatted';
import _first from 'lodash/first';
import { AppState } from '../../../../state';

@Injectable({
    providedIn: null,
})
export class AuthGuard implements OnDestroy, CanActivate, CanActivateChild, CanLoad {
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
                // this._log.trace(`canActivate: isLoggedIn: ${loggedIn}`);

                if (!loggedIn) {
                    const posn = state.url.search('section-06') + 'section-06'.length;
                    const slice = state.url.slice(0, posn);
                    this._log.trace(posn, slice);

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

    ngOnDestroy(): void {
        throw new Error('Method not implemented.');
    }
}
