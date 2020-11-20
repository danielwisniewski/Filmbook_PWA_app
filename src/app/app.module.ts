import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { BottomBarComponent } from './shared/components/bottom-bar/bottom-bar.component';
import { InterceptorService } from './shared/services/interceptor.service';
import { FormsModule } from '@angular/forms';
import { MovieMiniatureComponent } from './shared/components/movie-miniature/movie-miniature.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    SearchComponent,
    ProfileComponent,
    BottomBarComponent,
    MovieMiniatureComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
