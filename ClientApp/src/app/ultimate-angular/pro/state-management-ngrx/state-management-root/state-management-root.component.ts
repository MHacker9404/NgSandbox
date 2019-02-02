import { Component, OnInit } from '@angular/core';
import { Store } from '../store';

@Component({
    selector: 'ngs-state-management-root',
    template: `
        <div class="row">
            <div class="col songs"><ngs-songs-playlist></ngs-songs-playlist></div>
            <div class="col songs"><ngs-songs-favorites></ngs-songs-favorites></div>
            <div class="col songs"><ngs-songs-listened></ngs-songs-listened></div>
        </div>
    `,
    styleUrls: ['./state-management-root.component.scss']
})
export class StateManagementRootComponent implements OnInit {
    todo$ = this._store.select<any[]>('todos');
    constructor(private _store: Store) { }

    ngOnInit() {
        this._store.set('todos', [{ id: 1, name: 'Eat dinner' }, { id: 2, name: 'Do washing' }]);
    }
}
