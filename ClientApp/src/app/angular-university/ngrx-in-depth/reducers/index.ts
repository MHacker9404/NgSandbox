import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';

export interface AppState {
    // courses: {};
    // lessons: {};
    // auth: {};
}

export const reducers: ActionReducerMap<AppState> = {};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
