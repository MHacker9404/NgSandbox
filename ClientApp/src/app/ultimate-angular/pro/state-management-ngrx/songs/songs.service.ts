import { Injectable } from '@angular/core';
import { Store } from '../store';
import { of } from 'rxjs';

import json from 'src/assets/json/ultimate-angular.json';
import { tap, map } from 'rxjs/operators';
import { Song } from './song';
import _findIndex from 'lodash/findIndex';
import _sortBy from 'lodash/sortBy';

@Injectable({
    providedIn: 'root'
})
export class SongsService {
    private _db$ = of(json);
    constructor(private _store: Store) {}
    getPlaylist$ = this._db$.pipe(
        map((results: any) => results.playlist as Song[]),
        // tap(results => console.log('results', results)),
        tap(results => this._store.set('playlist', results))
    );
    toggle(event: any): any {
        const song = event.song;
        const songs = this._store.value.playlist;
        const index = _findIndex(songs, (s: Song) => s.id === song.id);
        songs.splice(index, 1, song);
        this._store.set('playlist', _sortBy(songs, (s: Song) => s.id));
    }
}
