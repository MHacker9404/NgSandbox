import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '../../store';
import { SongsService } from '../songs.service';
import { Subject, Observable } from 'rxjs';
import { Song } from '../song';
import { filter, map } from 'rxjs/operators';

@Component({
    selector: 'ngs-songs-favorites',
    template: `
        <!--
        <div class="row justify-content-center"><h3>Favorites</h3></div>
        <div class="row justify-content-left">
            <div class="col">
                <div *ngFor="let song of (favorites$ | async)">{{ song.artist }} {{ song.track }}</div>
            </div>
        </div>
        -->
        <ngs-songs-list [songs]="favorites$ | async" (toggle)="onToggle($event)">>Favorites</ngs-songs-list>
    `,
    styleUrls: ['../songs.scss']
})
export class SongsFavoritesComponent implements OnInit, OnDestroy {
    private _destroySubscription = new Subject<boolean>();
    favorites$: Observable<Song[]>;
    constructor(private _store: Store, private _songsService: SongsService) {}
    ngOnInit() {
        this.favorites$ = this._store.select('playlist').pipe(
            filter(Boolean),
            map((songs: Song[]) => songs.filter((song: Song) => song.favorite))
        );
    }
    ngOnDestroy(): void {
        this._destroySubscription.next(true);
        this._destroySubscription.complete();
    }
    onToggle(song: Song) {
        this._songsService.toggle(song);
    }
}
