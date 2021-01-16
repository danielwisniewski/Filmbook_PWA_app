import { Routes, RouterModule } from '@angular/router';
import { MainSearchPageComponent } from './main-search-page.component';

const routes: Routes = [
  { path: '', component: MainSearchPageComponent },
];

export const MainSearchPageRoutes = RouterModule.forChild(routes);
