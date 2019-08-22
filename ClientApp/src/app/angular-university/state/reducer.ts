import { NgUniActions, NgUniActionTypes } from './actions';
import * as fromApp from 'src/app/state/index';

export const ngUniFeatureKey = 'ngUni';

export interface NgUniState extends fromApp.AppState {}

export const initialState: NgUniState = {};

export function reducer(state = initialState, action: NgUniActions): NgUniState {
    switch (action.type) {
        default:
            return state;
    }
}
