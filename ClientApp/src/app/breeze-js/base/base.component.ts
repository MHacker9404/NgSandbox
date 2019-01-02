import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngs-base',
  template: `
    <p>
      base works!
    </p>
  `,
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
