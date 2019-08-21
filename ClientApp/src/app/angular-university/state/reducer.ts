import { NgUniActions, NgUniActionTypes } from './actions';

export interface State {
    ngUni: {};
}

export const initialState: State = { ngUni: {} };

export function reducer(state = initialState, action: NgUniActions): State {
    switch (action.type) {
        default:
            return state;
    }
}
