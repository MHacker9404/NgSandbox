import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ngs-lessons-counter',
  template: `
    <p>
      lessons-counter works!
    </p>
  `,
  styleUrls: ['./lessons-counter.component.scss']
})
export class LessonsCounterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

@NgModule({
  declarations: [LessonsCounterComponent],
  imports: [
    CommonModule
  ],
  exports: [LessonsCounterComponent]
})
export class LessonsCounterModule { }
