import {Injectable} from '@angular/core';
import json from 'src/assets/json/angular-university.json';
import {ILesson} from '../shared/model/ilesson';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {ICourse} from '../shared/model/icourse';
import _cloneDeep from 'lodash/cloneDeep';
import _flatMap from 'lodash/flatMap';
import _shuffle from 'lodash/shuffle';
import _slice from 'lodash/slice';
import _find from 'lodash/find';
import {first} from 'rxjs/operators';

@Injectable({
  providedIn: null,
  })
export class DatastoreService {
  private _courses: ICourse[];
  private _courseListSubject: BehaviorSubject<ICourse[]> = new BehaviorSubject(
      this._courses
  );
  public courseList$: Observable<
    ICourse[]
  > = this._courseListSubject.asObservable();

  private _lessons: ILesson[];
  private _lessonsListSubject: BehaviorSubject<ILesson[]> = new BehaviorSubject(
      this._lessons
  );
  public lessonsList$: Observable<
    ILesson[]
  > = this._lessonsListSubject.asObservable();

  constructor() {
    this._courses = _cloneDeep(json.courses);
    this._lessons = _slice(
        _cloneDeep(_shuffle(_flatMap(this._courses, (course) => course.lessons))),
        0,
        10
    );

    this._broadcast(this._courses, this._lessons);
  }

  findCourseByUrl(url: string): Observable<ICourse> {
    const course = _find(this._courses, (c) => c.url === url);
    return of(course);
  }

  findLessonsForCourse(url: string): Observable<ILesson[]> {
    const course = _find(this._courses, (c) => c.url === url);
    const lessons = _cloneDeep(course.lessons);
    return of(lessons);
  }

  private _broadcast(courses: ICourse[], lessons: ILesson[]) {
    setTimeout(() => {
      this._courseListSubject.next(_cloneDeep(courses));
      this._lessonsListSubject.next(_cloneDeep(lessons));
    }, 4000);
  }
}
