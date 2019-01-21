import { Injectable } from '@angular/core';
import { Store } from '../store';
import { of } from 'rxjs';

import json from 'src/assets/json/ultimate-angular.json';
import { tap, map } from 'rxjs/operators';
import { Song } from './song';

@Injectable({
    providedIn: 'root'
})
export class SongsService {
    private _db$ = of(json);
    constructor(private _store: Store) {}
    getPlaylist$ = this._db$.pipe(
        map((results: any) => results.playlist as Song[]),
        tap(results => console.log('results', results)),
        tap(results => this._store.set('playlist', results))
    );
}
