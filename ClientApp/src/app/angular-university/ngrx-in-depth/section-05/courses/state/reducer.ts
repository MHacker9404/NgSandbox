import { Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as fromApp from 'src/app/state/index';
import * as fromParent from '../../state/reducer';
import { CourseActions } from './actions';
import { ICourse } from '../../model/course';

export const coursesFeatureKey = `${fromParent.section05FeatureKey}:courses`;

// export interface CoursesState extends fromApp.AppState {
export interface CoursesState extends EntityState<ICourse> {
    // courses: {
    //     entities: { [key: number]: ICourse };
    //     order: number[];
    // };
}

export const adapter: EntityAdapter<ICourse> = createEntityAdapter<ICourse>();

// export const initialState: CoursesState = {
//     courses: {
//         entities: {},
//         order: [],
//     },
// };

// export function reducer(state: CoursesState = initialState, action: CourseActions): CoursesState {
//     switch (action.type) {
//         default:
//             return state;
//     }
// }
