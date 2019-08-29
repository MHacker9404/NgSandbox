import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromSelf from './reducer';

export const selectCoursesState = createFeatureSelector<fromSelf.CoursesState>(fromSelf.coursesFeatureKey);

export const selectCourseById = (courseId: number) =>
    createSelector(
        selectCoursesState,
        coursesState => coursesState.entities[courseId]
    );
