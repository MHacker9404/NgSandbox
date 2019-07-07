import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AngularUniversityRoutingModule} from './angular-university-routing.module';
import {AngularUniversityBaseComponent} from './angular-university-base.component';
import {ExampleDef} from '../shared/Models/example.model';
import {SharedModule} from '../shared/shared.module';

const examples: ExampleDef[] = [
  {
    label: '01 - RxJs Reactive Programming',
    name: 'RxjsReactiveProgramming',
    path: 'rxjs',
    component: null,
  },
  {
    label: '02 - Angular For Beginners',
    name: 'Beginners',
    path: 'beginners',
    component: null,
  },
  {
    label: '03 - Angular Security Course',
    name: 'Security',
    path: 'security',
    component: null,
  },
  {label: '04 - NgRx in Depth', name: 'NgRx', path: 'ngrx', component: null},
];

@NgModule({
  declarations: [AngularUniversityBaseComponent],
  imports: [CommonModule, SharedModule, AngularUniversityRoutingModule],
  providers: [{ provide: 'AngularUniversity', useValue: examples }],
  })
export class AngularUniversityModule {}
