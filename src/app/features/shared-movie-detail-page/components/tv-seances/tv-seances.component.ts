import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MovieDetailService } from '../../movie-detail.service';
import { TelevisionSeancesModel } from '../../models/televisionSeances.model';

@Component({
  selector: 'app-tv-seances',
  templateUrl: './tv-seances.component.html',
  styleUrls: ['./tv-seances.component.css']
})
export class TvSeancesComponent implements OnInit {
  @Input() url: string;
  tvSeances: TelevisionSeancesModel[];
  isLoading: boolean;
  constructor(private movieService: MovieDetailService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.movieService.checkInTv(this.url).subscribe(
      val => {
        this.isLoading = false;
        this.tvSeances = val;
      }
    )
  }

}
