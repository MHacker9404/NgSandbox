import { NgUniActions, NgUniActionTypes } from './ng-uni.actions';

export const ngUniFeatureKey = 'ngUni';

export interface NgUniState {}

export const initialState: NgUniState = {};

export function reducer(state = initialState, action: NgUniActions): NgUniState {
    switch (action.type) {
        case NgUniActionTypes.LoadNgUnis:
            return state;

        default:
            return state;
    }
}
