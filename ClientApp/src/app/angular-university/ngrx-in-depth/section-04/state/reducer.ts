import { Section04Actions, Section04ActionTypes } from './actions';
import * as fromApp from 'src/app/state/index';
import * as fromParent from '../../state/reducer';

// export const section04FeatureKey = 'au-ngrx-section04';
export const section04FeatureKey = `${fromParent.NgrxInDepthFeatureKey}:section04`;

export interface Section04State extends fromApp.AppState {}

export const initialState: Section04State = {};

export function reducer(state = initialState, action: Section04Actions): Section04State {
    switch (action.type) {
        case Section04ActionTypes.LoadSection04:
            return state;

        default:
            return state;
    }
}
