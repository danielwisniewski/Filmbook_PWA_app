import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilmData } from 'src/app/core/models/film-data.model';
import { MainProfilePageFacadeService } from '../../main-profile-page-facade.service';

@Component({
  selector: 'app-ignore-movies-list',
  templateUrl: './ignore-movies-list.component.html',
  styleUrls: ['./ignore-movies-list.component.css'],
})
export class IgnoreMoviesListComponent implements OnInit {
  sub: Subscription;
  constructor(
    private facadeService: MainProfilePageFacadeService,
    public location: Location
  ) {}

  ngOnInit(): void {
    this.sub = this.facadeService
      .getMoviesOnIgnoreList()
      .subscribe((result: FilmData[]) => {
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
