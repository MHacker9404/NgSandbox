import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarItemComponent } from './sidebar/sidebar-item.component';
import { RouterModule } from '@angular/router';
import { SafeUrlPipe } from './pipes/safe-url.pipe';

@NgModule({
    declarations: [SidebarComponent, SidebarItemComponent, SafeUrlPipe],
    imports: [CommonModule, RouterModule],
    exports: [SidebarComponent, SidebarItemComponent, SafeUrlPipe],
})
export class SharedModule {}
