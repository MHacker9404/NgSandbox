import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { User } from '../section-02/model/user.model';
import { AuthActionTypes } from '../section-02/auth/auth.actions';

interface AuthState {
    loggedIn: boolean;
    user: User;
}

interface CoursesState {}

interface LessonsState {}

export interface AppState {
    auth: AuthState;
    courses: CoursesState;
    lessons: LessonsState;
}

function authReducer(state: AuthState, action): AuthState {
    switch (action.type) {
        case AuthActionTypes.LoginAction:
            return {
                loggedIn: true,
                user: action.payload.user,
            };

        default:
            return state;
    }
}
export const reducers: ActionReducerMap<AppState> = {
    auth: authReducer,
    courses: null,
    lessons: null,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
