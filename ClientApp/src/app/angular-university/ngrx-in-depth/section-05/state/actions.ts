import { Action } from '@ngrx/store';

export enum Section05ActionTypes {
    LoadSection05 = '[Section05] Load',
}

export class LoadSection05s implements Action {
    readonly type = Section05ActionTypes.LoadSection05;
}

export type Section05Actions = LoadSection05s;
