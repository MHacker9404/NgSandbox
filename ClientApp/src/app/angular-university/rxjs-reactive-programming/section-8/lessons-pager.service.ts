import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ILesson } from '../shared/model/ilesson';

@Injectable({
    providedIn: null,
})
export class LessonsPagerService {
    private _subject = new BehaviorSubject<ILesson[]>([]);
    lessonsPage$: Observable<ILesson[]> = this._subject.asObservable();
    currentPageNumber = 1;
    constructor() {}
}
