import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { FilmData } from 'src/app/core/models/film-data.model';
import { MovieDetailService } from '../../../features/shared-movie-detail-page/movie-detail.service';
import { RateDialogComponent } from '../../components/movie-detail-page/rate-dialog/rate-dialog.component';


@Component({
  selector: 'app-context-menu-actions',
  templateUrl: './context-menu-actions.component.html',
  styleUrls: ['./context-menu-actions.component.css'],
})
export class ContextMenuActionsComponent implements OnInit, AfterViewInit {
  @Input() film: FilmData;
  @Input() contextMenuPosition = { x: '0px', y: '0px' };
  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;
  constructor(private db: MovieDetailService, private dialog: MatDialog) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.contextMenu.menuData = { film: this.film };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  onWatchlist(film: FilmData) {
    film.watchlist = !film.watchlist;
    this.db.updateMovieOnProfile(film, 'watchlist');
  }

  onSeen(film: FilmData) {
    this.dialog.open(RateDialogComponent, {
      data: film,
    });
  }

  onIgnore(film: FilmData) {
    film.ignore = !film.ignore;
    this.db.updateMovieOnProfile(film, 'ignore');
  }
}
