import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDetailService } from '../../movie-detail.service';

@Component({
  selector: 'app-facts-page',
  templateUrl: './facts-page.component.html',
  styleUrls: ['./facts-page.component.css']
})
export class FactsPageComponent implements OnInit {
  facts: string[];
  constructor(public location: Location, private db: MovieDetailService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const ID = this.route.snapshot.paramMap.get('id');
    this.facts = this.db.getLastFilmsData(ID).facts;
  }

}
