import { Component, Input, OnInit } from '@angular/core';
import { MovieDetailService } from '../../movie-detail.service';
import { StreamingServicesModel } from '../../models/streamingServices.model';

@Component({
  selector: 'app-streaming-services',
  templateUrl: './streaming-services.component.html',
  styleUrls: ['./streaming-services.component.css'],
})
export class StreamingServicesComponent implements OnInit {
  @Input() filmTitle: string;
  isLoading: boolean;
  streamingServices: StreamingServicesModel[];
  constructor(private db: MovieDetailService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.db.checkInServices(this.filmTitle).subscribe(
      (val) => {
        this.isLoading = false;
        this.streamingServices = val;
      },
      () => (this.isLoading = false)
    );
  }
}
