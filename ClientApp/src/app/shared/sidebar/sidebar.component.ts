import { Component, OnInit, Input } from '@angular/core';
import { ExampleDef } from '../Models/example.model';

@Component({
  selector: 'ngs-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  @Input('items') items: ExampleDef[];

  constructor() {}

  ngOnInit() {}
}
