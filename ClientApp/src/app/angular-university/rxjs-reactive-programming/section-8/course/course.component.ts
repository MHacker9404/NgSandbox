import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'ngs-course',
  template: `
    <p>
      course works!
    </p>
  `,
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

@NgModule({
  declarations: [CourseComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [CourseComponent]
})
export class CourseModule { }
