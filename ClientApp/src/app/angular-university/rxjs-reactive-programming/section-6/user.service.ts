import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { IUser } from '../shared/model/IUser';
import { tap } from 'rxjs/operators';

export const UNKNOWN_USER: IUser = { email: 'yes@no.com', firstName: 'Unknown' };

@Injectable({
    providedIn: null,
})
export class UserService {
    private _userSubject: BehaviorSubject<IUser> = new BehaviorSubject(UNKNOWN_USER);
    user$: Observable<IUser> = this._userSubject.asObservable();

    constructor(private _http: HttpClient) {}

    login(email: string, password: string) {
        this._http
            .post<IUser>('/api/login', { email, password })
            .subscribe((user: IUser) => this._userSubject.next(user), () => alert('login failed'));
    }
}
