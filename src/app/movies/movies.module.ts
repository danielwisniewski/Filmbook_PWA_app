import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MoviesComponent } from './movies.component';
import { InTvTodayComponent } from './in-tv-today/in-tv-today.component';
import { RecommendedComponent } from './recommended/recommended.component';
import { TopComponent } from './top/top.component';

@NgModule({
    imports: [SharedModule],
    exports: [],
    declarations: [MoviesComponent, InTvTodayComponent, RecommendedComponent, TopComponent],
    providers: [],
})
export class MoviesModule { }
