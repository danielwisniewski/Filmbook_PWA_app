import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SearchComponent } from './search.component';

@NgModule({
    imports: [SharedModule],
    exports: [],
    declarations: [SearchComponent],
    providers: [],
})
export class SearchModule { }
