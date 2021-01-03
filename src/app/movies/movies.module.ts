import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MoviesComponent } from './movies.component';
import { InTvTodayComponent } from './in-tv-today/in-tv-today.component';
import { RecommendedComponent } from './recommended/recommended.component';
import { TopComponent } from './top/top.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { EveningSeancesComponent } from './in-tv-today/evening-seances/evening-seances.component';

@NgModule({
    imports: [SharedModule, MoviesRoutingModule],
    exports: [],
    declarations: [MoviesComponent, InTvTodayComponent, RecommendedComponent, TopComponent, EveningSeancesComponent],
    providers: [],
})
export class MoviesModule { }
