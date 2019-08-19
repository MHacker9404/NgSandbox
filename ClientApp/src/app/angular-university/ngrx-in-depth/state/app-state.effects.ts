import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

@Injectable()
export class AppStateEffects {
    constructor(private actions$: Actions) {}
}
