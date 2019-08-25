import { Section05Actions, Section05ActionTypes } from './actions';
import * as fromApp from 'src/app/state/index';
import * as fromParent from '../../state/reducer';

// export const section05FeatureKey = 'au-ngrx-section05';
export const section05FeatureKey = `${fromParent.NgrxInDepthFeatureKey}:section05`;

export interface Section05State extends fromApp.AppState {}

export const initialState: Section05State = {};

export function reducer(state = initialState, action: Section05Actions): Section05State {
    switch (action.type) {
        case Section05ActionTypes.LoadSection05:
            return state;

        default:
            return state;
    }
}
