import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { IUser } from '../shared/model/IUser';
import { publishLast, refCount, tap } from 'rxjs/operators';
import { tag } from 'rxjs-spy/operators';

export const UNKNOWN_USER: IUser = { email: 'yes@no.com', firstName: 'Unknown' };

@Injectable({
    providedIn: null,
})
export class UserService {
    private _userSubject: BehaviorSubject<IUser> = new BehaviorSubject(UNKNOWN_USER);
    user$: Observable<IUser> = this._userSubject.asObservable();

    constructor(private _http: HttpClient) {}

    login(email: string, password: string): Observable<IUser> {
        return this._http.post<IUser>('/api/login', { email, password }).pipe(
            tap((user: IUser) => this._userSubject.next(user)),
            publishLast(),
            refCount(),
            tag('userService: login')
        );
        // .subscribe((user: IUser) => this._userSubject.next(user), () => alert('login failed'));
    }
}
