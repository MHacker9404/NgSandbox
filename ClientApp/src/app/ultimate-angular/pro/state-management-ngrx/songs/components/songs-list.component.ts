import { Component, OnInit, Input } from '@angular/core';
import { Song } from '../song';

@Component({
    selector: 'ngs-songs-list',
    template: `
        <div class="row justify-content-left">
            <div class="col">
                <div class="songs-list">
                    <h3>
                        <ng-content></ng-content>
                    </h3>
                    <!--<div *ngFor="let song of songs">{{ song.artist }} {{ song.track }}</div>-->
                    <ul>
                        <li *ngFor="let song of songs">
                            <p>{{ song.artist }}</p>
                            <span>{{ song.track }}</span>
                            <div class="songs-list__favorite" [class.active]="song.favorite"></div>
                            <div class="songs-list__listened" [class.active]="song.listened"></div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['../songs.scss']
})
export class SongsListComponent implements OnInit {
    @Input() songs: Song[];

    constructor() {}

    ngOnInit() {}
}
