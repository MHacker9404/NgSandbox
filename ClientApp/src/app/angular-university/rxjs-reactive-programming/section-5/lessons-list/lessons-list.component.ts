import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ngs-lessons-list',
  template: `
    <p>
      lessons-list works!
    </p>
  `,
  styleUrls: ['./lessons-list.component.scss']
})
export class LessonsListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

@NgModule({
  declarations: [LessonsListComponent],
  imports: [
    CommonModule
  ],
  exports: [LessonsListComponent]
})
export class LessonsListModule { }
