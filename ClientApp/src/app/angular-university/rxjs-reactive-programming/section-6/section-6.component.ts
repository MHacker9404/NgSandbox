import {Component, NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {SharedModule} from 'src/app/shared/shared.module';

@Component({
  selector: 'ngs-section6',
  template: `
    <p>
      section-6 works!
    </p>
  `,
  styleUrls: ['./section-6.component.scss'],
  })
export class Section6Component implements OnInit {
  constructor() {}

  ngOnInit() {}
}

const routes: Routes = [
  {
    path: '',
    component: Section6Component,
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  })
export class Section6RoutingModule {}

@NgModule({
  declarations: [Section6Component],
  imports: [CommonModule, Section6RoutingModule, SharedModule],
  exports: [Section6Component],
  })
export class Section6Module {}
