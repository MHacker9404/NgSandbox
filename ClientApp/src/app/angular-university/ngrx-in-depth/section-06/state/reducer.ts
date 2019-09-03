import { Section06Actions, Section06ActionTypes } from './actions';
import * as fromApp from 'src/app/state/index';
import * as fromParent from '../../state/reducer';

// export const section06FeatureKey = 'au-ngrx-section06';
export const section06FeatureKey = `${fromParent.NgrxInDepthFeatureKey}:section06`;

export interface Section06State extends fromApp.AppState {}

export const initialState: Section06State = {};

export function reducer(state = initialState, action: Section06Actions): Section06State {
    switch (action.type) {
        case Section06ActionTypes.LoadSection06:
            return state;

        default:
            return state;
    }
}
