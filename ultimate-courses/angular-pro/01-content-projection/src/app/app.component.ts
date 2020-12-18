import { Component } from '@angular/core';
import { User } from './auth-form/auth-form.interface';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'content-projection';

    createUser(user: User) {
        alert(`Create account: ${JSON.stringify(user)}`);
    }

    loginUser(user: User) {
        alert(`Login: ${JSON.stringify(user)}`);
    }
}
