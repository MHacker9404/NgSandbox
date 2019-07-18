import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';

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
export class LoginComponent implements OnInit {
    constructor(private _userService: UserService) {}

    ngOnInit() {}

    login(email: string, password: string) {
        this._userService.login(email, password);
    }
}

@NgModule({
    declarations: [LoginComponent],
    imports: [CommonModule],
    exports: [LoginComponent],
    providers: [UserService],
})
export class LoginModule {}
