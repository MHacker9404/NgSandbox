import { Component, NgModule, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { IUser } from '../../shared/model/IUser';

@Component({
    selector: 'ngs-login',
    template: `
        <div class="screen-container login-screen">
            <h2>Login</h2>

            <div>
                <input #email type="email" name="email" placeholder="Email" />
            </div>
            <div>
                <input #password type="password" name="password" placeholder="Password" />
            </div>

            <input
                type="submit"
                value="Login"
                class="button button-primary"
                (click)="login(email.value, password.value)"
            />
        </div>
    `,
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
    private _unsubscribe$ = new Subject<void>();
    constructor(private _userService: UserService, private _router: Router, private _route: ActivatedRoute) {
        console.log(this._route);
    }

    ngOnInit() {}

    login(email: string, password: string) {
        this._userService
            .login(email, password)
            .pipe(
                takeUntil(this._unsubscribe$),
                tap(
                    (user: IUser) => {
                        alert(`login successful: ${user.firstName}`);
                        // this._router.navigate(['./'], { relativeTo: this._route.parent });
                        this._router.navigate(['home'], { relativeTo: this._route.parent });
                    },
                    error => console.error(error)
                )
            )
            .subscribe();
    }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}

@NgModule({
    declarations: [LoginComponent],
    imports: [CommonModule],
    exports: [LoginComponent],
    providers: [UserService],
})
export class LoginModule {}
