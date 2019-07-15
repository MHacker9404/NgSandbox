import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuRxjsComponent} from './au-rxjs.component';
import {BrowserEventsComponent} from './components/browser-events/browser-events.component';

const routes: Routes = [
  {
    path: '',
    component: AuRxjsComponent,
    children: [
      {
        path: 'browser-events',
        component: BrowserEventsComponent,
        pathMatch: 'full',
      },
      {
        path: 'custom-events',
        loadChildren:
          './components/custom-events/custom-events.component#CustomEventsModule',
      },
      {
        path: 'observable-pattern',
        loadChildren:
          './observable-pattern/observable-pattern.component#ObservablePatternModule',
      },
      {
        path: 'with-rxjs',
        loadChildren: './with-rxjs/with-rxjs.component#WithRxJsModule',
      },
      {
        path: 'section-4',
        loadChildren: () =>
          import('./section-4/section4.component').then(
              (mod) => mod.Section4Module
          ),
      },
      {
        path: 'section-5',
        loadChildren: () =>
          import('./section-5/section-5.component').then(
              (mod) => mod.Section5Module
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  })
export class AuRxjsRoutingModule {}
