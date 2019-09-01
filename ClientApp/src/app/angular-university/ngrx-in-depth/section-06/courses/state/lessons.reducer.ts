import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ILesson } from '../../model/lesson';
import { CourseActions } from './actions';
import * as fromParent from '../../state/reducer';

export const lessonsFeatureKey = `${fromParent.section06FeatureKey}:lessons`;

export interface LessonsState extends EntityState<ILesson> {
    allLessonsLoaded: boolean;
}

const adapter: EntityAdapter<ILesson> = createEntityAdapter<ILesson>();
const initialState: LessonsState = adapter.getInitialState({ allLessonsLoaded: false });

export function reducer(state: LessonsState = initialState, action: CourseActions): LessonsState {
    switch (action.type) {
        default: {
            return state;
        }
    }
}

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();
