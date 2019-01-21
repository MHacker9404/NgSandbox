import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '../../store';
import { SongsService } from '../songs.service';
import { Subject, Observable } from 'rxjs';
import { Song } from '../song';

@Component({
    selector: 'ngs-songs-listened',
    template: `
        <div class="row justify-content-center"><h3>Listened</h3></div>
        <div class="row justify-content-left">
            <div class="col">
                <div *ngFor="let song of (listened$ | async)">{{ song.artist }} {{ song.track }}</div>
            </div>
        </div>
    `,
    styles: ['../songs.scss']
})
export class SongsListenedComponent implements OnInit, OnDestroy {
    private _destroySubscription = new Subject<boolean>();
    listened$: Observable<Song[]>;
    constructor(private _store: Store, private _songsService: SongsService) {}
    ngOnInit() {
        this.listened$ = this._store.select('playlist');
    }
    ngOnDestroy(): void {
        this._destroySubscription.next(true);
        this._destroySubscription.complete();
    }
}
