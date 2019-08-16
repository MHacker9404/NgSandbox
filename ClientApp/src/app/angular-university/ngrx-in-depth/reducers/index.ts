import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { User } from '../section-02/model/user.model';
import { AuthActionTypes } from '../section-02/auth/auth/auth.actions';

// interface AuthState {
//     loggedIn: boolean;
//     user: User;
// }

// interface CoursesState {}

// interface LessonsState {}

// const initialAuthState: AuthState = {
//     loggedIn: false,
//     user: undefined,
// };

export interface AppState {
    //     auth: AuthState;
    //     courses: CoursesState;
    //     lessons: LessonsState;
}

// function authReducer(state: AuthState = initialAuthState, action): AuthState {
//     switch (action.type) {
//         case AuthActionTypes.LoginAction:
//             return {
//                 loggedIn: true,
//                 user: action.payload.user,
//             };

//         default:
//             return state;
//     }
// }
// export const reducers: ActionReducerMap<AppState> = {
//     auth: authReducer,
//     courses: null,
//     lessons: null,
// };

export const reducers: ActionReducerMap<AppState> = {};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
