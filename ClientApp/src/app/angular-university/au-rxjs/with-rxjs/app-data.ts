import { Subject, Observable, BehaviorSubject } from 'rxjs';
import _remove from 'lodash/remove';
import _forEach from 'lodash/forEach';
import _cloneDeep from 'lodash/cloneDeep';
import _find from 'lodash/find';
import { ILesson } from '../shared/model/ilesson';

class DataStore {
    private _lessons: ILesson[] = [];
    private _lessonsListSubject: BehaviorSubject<ILesson[]> = new BehaviorSubject([]);
    public lessonsList$: Observable<ILesson[]> = this._lessonsListSubject.asObservable();

    public initializeLessonsList(newList: ILesson[]) {
        this._lessons = _cloneDeep(newList);
        this._broadcast();
    }
    public addLesson(lesson: ILesson) {
        this._lessons.push(_cloneDeep(lesson));
        this._broadcast();
    }
    public deleteLesson(deleted: ILesson) {
        _remove(this._lessons, lesson => lesson.id === deleted.id);
        this._broadcast();
    }
    public toggleLessonViewed(toggeled: ILesson) {
        const lesson = _find(this._lessons, l => l.id === toggeled.id);
        lesson.completed = !lesson.completed;
        this._broadcast();
    }
    private _broadcast() {
        this._lessonsListSubject.next(_cloneDeep(this._lessons));
    }
}
export const store = new DataStore();
