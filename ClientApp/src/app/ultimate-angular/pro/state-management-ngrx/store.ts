import { State } from './state';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';

const _initialState: State = {
    playlist: undefined
};
export class Store {
    private _subject = new BehaviorSubject<State>(_initialState);
    private _store = this._subject.asObservable().pipe(distinctUntilChanged());

    get value() {
        return this._subject.value;
    }

    select<T>(name: string): Observable<T> {
        return this._store.pipe(pluck(name));
    }

    set(name: string, newState: any) {
        this._subject.next({ ...this.value, [name]: newState });
    }
}
