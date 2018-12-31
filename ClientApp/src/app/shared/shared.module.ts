import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarItemComponent } from './sidebar/sidebar-item.component';

@NgModule({
  declarations: [SidebarComponent, SidebarItemComponent],
  imports: [CommonModule],
  exports: [SidebarComponent, SidebarItemComponent]
})
export class SharedModule {}
