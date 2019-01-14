import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarItemComponent } from './sidebar/sidebar-item.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SidebarComponent, SidebarItemComponent],
  imports: [CommonModule, RouterModule],
  exports: [SidebarComponent, SidebarItemComponent]
})
export class SharedModule {}
