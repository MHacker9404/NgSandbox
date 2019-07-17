import {Component, NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'ngs-login',
  template: `
    <div class="screen-container login-screen">
      <h2>Login</h2>

      <div>
        <input type="email" name="email" placeholder="Email" />
      </div>
      <div>
        <input type="password" name="password" placeholder="Password" />
      </div>

      <input
        type="submit"
        value="Login"
        class="button button-primary"
        (click)="login()"
      />
    </div>
  `,
  styleUrls: ['./login.component.scss'],
  })
export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  login() {}
}

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule],
  exports: [LoginComponent],
  })
export class LoginModule {}
