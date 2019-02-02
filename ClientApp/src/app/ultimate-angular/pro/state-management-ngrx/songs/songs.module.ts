import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { SongsFavoritesComponent } from './components/songs-favorites.component';
import { SongsListenedComponent } from './components/songs-listened.component';
import { SongsService } from './songs.service';
import { SongsPlaylistComponent } from './components/songs-playlist.component';
import { SongsListComponent } from './components/songs-list.component';

@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [SongsPlaylistComponent, SongsFavoritesComponent, SongsListenedComponent, SongsListComponent],
    exports: [SongsPlaylistComponent, SongsFavoritesComponent, SongsListenedComponent, SongsListComponent],
    providers: [SongsService]
})
export class SongsModule { }
