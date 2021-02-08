import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { MovieMiniaturesListComponent } from './components/movie-miniatures-list/movie-miniatures-list.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { RateDialogComponent } from './components/movie-detail-page/rate-dialog/rate-dialog.component';
import { ViewSelectionMenuComponent } from './components/nav-bars/view-selection-menu/view-selection-menu.component';
import { FilterBottomSheetComponent } from './components/filter-bottom-sheet/filter-bottom-sheet.component';
import { SearchInListComponent } from './components/nav-bars/search-in-list/search-in-list.component';
import { TopBarElementContentDirective } from './directives/top-bar-element-content.directive';
import { ContextMenuActionsComponent } from './directives/context-menu-actions/context-menu-actions.component';
import { MiniatureListContextMenuDirective } from './directives/context-menu-actions/miniature-list-context-menu.directive';
import { TopTitlePanelComponent } from '../core/components/top-title-panel/top-title-panel.component';
import { CommonModule } from '@angular/common';
import { BottomTabsMenuComponent } from '../core/components/bottom-tabs-menu/bottom-tabs-menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    AngularFirestoreModule.enablePersistence(),
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    MovieMiniaturesListComponent,
    AngularFirestoreModule,
    LoadingSpinnerComponent,
    RateDialogComponent,
    ViewSelectionMenuComponent,
    FilterBottomSheetComponent,
    SearchInListComponent,
    TopBarElementContentDirective,
    MiniatureListContextMenuDirective,
    ContextMenuActionsComponent,
    TopTitlePanelComponent,
    BottomTabsMenuComponent,
  ],
  declarations: [
    MovieMiniaturesListComponent,
    LoadingSpinnerComponent,
    RateDialogComponent,
    ViewSelectionMenuComponent,
    FilterBottomSheetComponent,
    SearchInListComponent,
    TopBarElementContentDirective,
    MiniatureListContextMenuDirective,
    ContextMenuActionsComponent,
    TopTitlePanelComponent,
    BottomTabsMenuComponent,
  ],
  providers: [],
  entryComponents: [
    FilterBottomSheetComponent,
    RateDialogComponent,
    ContextMenuActionsComponent,
  ],
})
export class SharedModule {}
