import {Injectable} from '@angular/core';
import json from 'src/assets/json/angular-university.json';
import {ILesson} from '../shared/model/ilesson';
import {BehaviorSubject, Observable} from 'rxjs';
import {ICourse} from '../shared/model/icourse';
import _cloneDeep from 'lodash/cloneDeep';

@Injectable({
  providedIn: null,
  })
export class DatastoreService {
  private _lessons: ILesson[] = [];
  private _lessonsListSubject: BehaviorSubject<ILesson[]> = new BehaviorSubject(
      []
  );

  public lessonsList$: Observable<
    ILesson[]
  > = this._lessonsListSubject.asObservable();

  private _courses: ICourse[] = [];
  private _courseListSubject: BehaviorSubject<ICourse[]> = new BehaviorSubject(
      []
  );

  public courseList$: Observable<
    ICourse[]
  > = this._courseListSubject.asObservable();

  constructor() {
    this._courses = _cloneDeep(json.courses);
    this._broadcast();
  }

  private _broadcast() {
    this._courseListSubject.next(_cloneDeep(this._courses));
    this._lessonsListSubject.next(_cloneDeep(this._lessons));
  }
}
