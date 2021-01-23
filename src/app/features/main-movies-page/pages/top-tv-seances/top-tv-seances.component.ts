import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MainMoviesPageFacadeService } from '../../main-movies-page-facade.service';
import { TopTvSeancesModel } from '../../models/top-tv-seances.model';

@Component({
  selector: 'app-in-tv-today',
  templateUrl: './top-tv-seances.component.html',
  styleUrls: ['./top-tv-seances.component.css'],
})
export class TopTvSeancesComponent implements OnInit {
  sub: Subscription;
  constructor(private facadeService: MainMoviesPageFacadeService) {}

  ngOnInit(): void {
    this.sub = this.facadeService
      .getTopTvSeances()
      .subscribe((result: TopTvSeancesModel[]) => {
        this.facadeService.changeCurrentList(result);
      });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.facadeService.closeMiniaturesSub();
      this.sub.unsubscribe();
    }
  }
}
