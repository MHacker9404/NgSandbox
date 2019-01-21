import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { SongsListComponent } from './components/songs-list.component';
import { SongsFavoritesComponent } from './components/songs-favorites.component';
import { SongsListenedComponent } from './components/songs-listened.component';
import { SongsService } from './songs.service';

@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [SongsListComponent, SongsFavoritesComponent, SongsListenedComponent],
    exports: [SongsListComponent, SongsFavoritesComponent, SongsListenedComponent],
    providers: [SongsService]
})
export class SongsModule {}
