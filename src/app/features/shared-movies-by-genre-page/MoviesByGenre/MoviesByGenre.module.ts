import { NgModule } from '@angular/core';
import { MoviesByGenreComponent } from './MoviesByGenre.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MoviesByGenreRoutes } from './MoviesByGenre.routing';

@NgModule({
  imports: [
    SharedModule,
    MoviesByGenreRoutes
  ],
  declarations: [MoviesByGenreComponent]
})
export class MoviesByGenreModule { }
