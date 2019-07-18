import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IUser } from '../shared/model/IUser';

export const UNKNOWN_USER: IUser = { email: 'yes@no.com', firstName: 'Unknown' };

@Injectable({
    providedIn: null,
})
export class UserService {
    user$: Observable<IUser> = of(UNKNOWN_USER);

    constructor(private _http: HttpClient) {}

    login(email: string, password: string) {
        return this._http.post('/api/login', { email, password });
    }
}
