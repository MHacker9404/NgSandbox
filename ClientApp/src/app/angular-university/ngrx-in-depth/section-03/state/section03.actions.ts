import { Action } from '@ngrx/store';

export enum Section03ActionTypes {
    LoadSection03 = '[Section03] Load',
}

export class LoadSection03s implements Action {
    readonly type = Section03ActionTypes.LoadSection03;
}

export type Section03Actions = LoadSection03s;
