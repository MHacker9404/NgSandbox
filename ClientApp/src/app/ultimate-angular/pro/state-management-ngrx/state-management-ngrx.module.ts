import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StateManagementNgrxRoutingModule } from './state-management-ngrx-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { StateManagementRootComponent } from './state-management-root/state-management-root.component';
import { Store } from './store';
import { SongsModule } from './songs/songs.module';

@NgModule({
    declarations: [StateManagementRootComponent],
    imports: [CommonModule, SharedModule, StateManagementNgrxRoutingModule, SongsModule],
    providers: [Store]
})
export class StateManagementNgrxModule {}
