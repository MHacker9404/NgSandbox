import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppState } from '../../../../../state';
import { Login } from '../state/actions';
import { Subject, noop } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { IUser } from '../../model/user.model';
import { NGXLogger } from 'ngx-logger';
import { tag } from 'rxjs-spy/operators/tag';
import _flatted from 'flatted';

@Component({
    selector: 'login',
    template: `
        <mat-card class="login-page">
            <mat-card-title>Login</mat-card-title>
            <mat-card-content>
                <form [formGroup]="form" class="login-form">
                    <mat-form-field>
                        <input matInput type="email" placeholder="Email" formControlName="email" />
                    </mat-form-field>

                    <mat-form-field>
                        <input matInput type="password" placeholder="Password" formControlName="password" />
                    </mat-form-field>

                    <button mat-raised-button color="primary" (click)="login()" [disabled]="!form.valid">Login</button>
                </form>
            </mat-card-content>
        </mat-card>
    `,
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
    private _unsubscribe$ = new Subject<void>();
    form: FormGroup;

    constructor(
        private _fb: FormBuilder,
        private _auth: AuthService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _store$: Store<AppState>,
        private _log: NGXLogger
    ) {
        this.form = _fb.group({
            email: ['test@angular-university.io', [Validators.required]],
            password: ['test', [Validators.required]],
        });
    }

    ngOnInit() {}

    login() {
        // this._store$.dispatch(new Login());
        const val = this.form.value;

        this._auth
            .login(val.email, val.password)
            .pipe(
                takeUntil(this._unsubscribe$),
                tap((user: IUser) => {
                    this._log.info(user);
                    this._store$.dispatch(new Login({ user }));
                    this._router.navigate(['../courses'], { relativeTo: this._route.parent });
                }),
                tag('auth:login')
            )
            .subscribe(() => noop, () => alert('Login failed'));
    }

    ngOnDestroy() {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
