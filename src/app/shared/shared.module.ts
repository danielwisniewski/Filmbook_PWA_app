import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material.module';
import { BottomBarComponent } from './components/nav-bars/bottom-bar/bottom-bar.component';
import { MovieMiniaturesListComponent } from './components/movie-miniatures-list/movie-miniatures-list.component';
import { InterceptorService } from './services/interceptor.service';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { MovieDetailPageComponent } from './components/movie-detail-page/movie-detail.component';
import { GenreListComponent } from './components/genre-list/genre-list.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { RateDialogComponent } from './components/movie-detail-page/rate-dialog/rate-dialog.component';
import { MovieExpandableElementComponent } from './components/movie-expandable-element/movie-expandable-element.component';
import { TopBarComponent } from './components/nav-bars/top-bar/top-bar.component';
import { ChooseViewBarComponent } from './components/nav-bars/choose-view-bar/choose-view-bar.component';
import { FilterBottomSheetComponent } from './components/nav-bars/choose-view-bar/filter-bottom-sheet/filter-bottom-sheet.component';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFirestoreModule.enablePersistence(),
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    BottomBarComponent,
    MovieMiniaturesListComponent,
    AppRoutingModule,
    AngularFirestoreModule,
    LoadingSpinnerComponent,
    MovieDetailPageComponent,
    MovieExpandableElementComponent,
    RateDialogComponent,
    TopBarComponent,
    ChooseViewBarComponent,
    FilterBottomSheetComponent,
    FilterPipe,
  ],
  declarations: [
    BottomBarComponent,
    MovieMiniaturesListComponent,
    LoadingSpinnerComponent,
    MovieDetailPageComponent,
    GenreListComponent,
    MovieExpandableElementComponent,
    RateDialogComponent,
    TopBarComponent,
    ChooseViewBarComponent,
    FilterBottomSheetComponent,
    FilterPipe,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  entryComponents: [FilterBottomSheetComponent, RateDialogComponent]
})
export class SharedModule {}
