import {Component, NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {SharedModule} from 'primeng/components/common/shared';

@Component({
  selector: 'ngs-section4',
  template: `
    <div class="course-container">
      <h2>Stateless Observable Services</h2>
    </div>
  `,
  styleUrls: ['./section4.component.scss'],
  })
export class Section4Component implements OnInit {
  constructor() {}

  ngOnInit() {}
}

const routes: Routes = [
  {path: '', component: Section4Component, pathMatch: 'full'},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  })
export class Section4RoutingModule {}

@NgModule({
  declarations: [Section4Component],
  imports: [CommonModule, SharedModule, Section4RoutingModule],
  exports: [Section4Component],
  })
export class Section4Module {}
