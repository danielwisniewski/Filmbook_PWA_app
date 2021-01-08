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
import { AwardsPageComponent } from './components/movie-detail-page/awards-page/awards-page.component';
import { FullCastPageComponent } from './components/movie-detail-page/full-cast-page/full-cast-page.component';
import { TvSeancesComponent } from './components/movie-detail-page/movie-detail-page-elements/tv-seances/tv-seances.component';
import { InitialViewComponent } from './components/movie-detail-page/movie-detail-page-elements/initial-view/initial-view.component';
import { OverviewComponent } from './components/movie-detail-page/movie-detail-page-elements/overview/overview.component';
import { StreamingServicesComponent } from './components/movie-detail-page/movie-detail-page-elements/streaming-services/streaming-services.component';
import { SearchPipe } from './pipes/search.pipe';
import { SearchInListComponent } from './components/nav-bars/search-in-list/search-in-list.component';
import { SimilarMoviesComponent } from './components/movie-detail-page/movie-detail-page-elements/similar-movies/similar-movies.component';
import { SharedRoutingModule } from './shared-routing.module';
import { FactsPageComponent } from './components/movie-detail-page/movie-detail-page-elements/facts-page/facts-page.component';
import { TopBarElementContentDirective } from './directives/top-bar-element-content.directive';
import { ContextMenuActionsComponent } from './directives/context-menu-actions/context-menu-actions.component';
import { MiniatureListContextMenuDirective } from './directives/context-menu-actions/miniature-list-context-menu.directive';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedRoutingModule,
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
    SearchPipe,
    SearchInListComponent,
    TopBarElementContentDirective,
    MiniatureListContextMenuDirective,
    ContextMenuActionsComponent
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
    AwardsPageComponent,
    FullCastPageComponent,
    TvSeancesComponent,
    InitialViewComponent,
    OverviewComponent,
    StreamingServicesComponent,
    SearchPipe,
    SearchInListComponent,
    SimilarMoviesComponent,
    FactsPageComponent,
    TopBarElementContentDirective,
    MiniatureListContextMenuDirective,
    ContextMenuActionsComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  entryComponents: [FilterBottomSheetComponent, RateDialogComponent, ContextMenuActionsComponent]
})
export class SharedModule {}
