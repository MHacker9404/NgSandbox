import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    public form: FormGroup;
    public loading: Boolean = false;

    constructor(private _authSvc: AuthService) {
        this.form = new FormGroup({
            email: new FormControl(null, { validators: [Validators.required], updateOn: 'change' }),
            password: new FormControl(null, { validators: [Validators.required], updateOn: 'change' }),
        });
    }

    ngOnInit(): void {}

    public onLogin(): void {
        this.loading = true;

        this._authSvc.loginUser(this.form.value.email, this.form.value.password);

        this.form.reset();

        this.loading = false;
    }
}
