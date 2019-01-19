import { Component, OnInit } from '@angular/core';
import { Store } from '../store';

@Component({
    selector: 'ngs-state-management-root',
    template: `
        <p>state-management-root works!</p>
        <ul>
            <li *ngFor="let todo of (todo$ | async)">{{ todo.name }}</li>
        </ul>
    `,
    styleUrls: ['./state-management-root.component.scss']
})
export class StateManagementRootComponent implements OnInit {
    todo$ = this._store.select<any[]>('todos');
    constructor(private _store: Store) {}

    ngOnInit() {
        this._store.set('todos', [{ id: 1, name: 'Eat dinner' }, { id: 2, name: 'Do washing' }]);
    }
}
