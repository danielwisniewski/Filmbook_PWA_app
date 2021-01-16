import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MainSearchPageFacadeService } from './main-search-page-facade.service';
import { MainSearchPageComponent } from './main-search-page.component';
import { MainSearchPageRoutes } from './main-search-page.routing';

@NgModule({
    imports: [SharedModule, MainSearchPageRoutes],
    exports: [],
    declarations: [MainSearchPageComponent],
    providers: [MainSearchPageFacadeService],
})
export class MainSearchPageModule { }
