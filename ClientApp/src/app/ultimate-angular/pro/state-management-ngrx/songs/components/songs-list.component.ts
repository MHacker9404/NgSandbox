import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '../../store';
import { SongsService } from '../songs.service';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Song } from '../song';

@Component({
    selector: 'ngs-songs-list',
    template: `
        <div class="row justify-content-center"><h3>List</h3></div>
        <div class="row justify-content-left">
            <div class="col">
                <div *ngFor="let song of (playlist$ | async)">{{ song.artist }} {{ song.track }}</div>
            </div>
        </div>
    `,
    styles: ['../songs.scss']
})
export class SongsListComponent implements OnInit, OnDestroy {
    private _destroySubscription = new Subject<boolean>();
    playlist$: Observable<Song[]>;
    constructor(private _store: Store, private _songsService: SongsService) {}
    ngOnInit() {
        this.playlist$ = this._store.select('playlist');
        this._songsService.getPlaylist$.pipe(takeUntil(this._destroySubscription)).subscribe();
    }
    ngOnDestroy(): void {
        this._destroySubscription.next(true);
        this._destroySubscription.complete();
    }
}
