import _remove from 'lodash/remove';
import _forEach from 'lodash/forEach';
import _cloneDeep from 'lodash/cloneDeep';
import _find from 'lodash/find';

import { ILesson } from '../shared/model/ilesson.js';

export interface Observer {
    next(payload: any);
}

export interface Observable {
    subscribe(obs: Observer);
    unsubscribe(obs: Observer);
}

interface Subject extends Observer, Observable {}

class SubjectImpl implements Subject {
    private _observers: Observer[] = [];
    constructor() {}
    next(payload: any) {
        _forEach(this._observers, observer => observer.next(payload));
    }
    subscribe(obs: Observer) {
        this._observers.push(obs);
    }
    unsubscribe(obs: Observer) {
        _remove(this._observers, el => el === obs);
    }
}

// const lessons: ILesson[] = json.slice();

class DataStore {
    private _lessons: ILesson[] = [];
    private _lessonsListSubject: SubjectImpl = new SubjectImpl();
    public lessonsList$: Observable = {
        subscribe: obs => {
            this._lessonsListSubject.subscribe(obs);
            obs.next(this._lessons);
        },
        unsubscribe: obs => this._lessonsListSubject.unsubscribe(obs),
    };
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
        console.log(this._lessons);
        this._lessonsListSubject.next(_cloneDeep(this._lessons));
    }
}
export const store = new DataStore();
