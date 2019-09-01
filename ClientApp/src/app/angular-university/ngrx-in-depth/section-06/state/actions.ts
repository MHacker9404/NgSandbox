import { Action } from '@ngrx/store';

export enum Section06ActionTypes {
    LoadSection06 = '[Section06] Load',
}

export class LoadSection06s implements Action {
    readonly type = Section06ActionTypes.LoadSection06;
}

export type Section06Actions = LoadSection06s;
