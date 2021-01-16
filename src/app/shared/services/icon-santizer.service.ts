import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class IconSantizerService {
  constructor(private icon: MatIconRegistry, private santizer: DomSanitizer) {
    this.icon.addSvgIcon(
      'small_view',
      this.santizer.bypassSecurityTrustResourceUrl(
        '../../../../assets/icons/view-grid.svg'
      )
    );
    this.icon.addSvgIcon(
      'large_view',
      this.santizer.bypassSecurityTrustResourceUrl(
        '../../../../assets/icons/view-split-vertical.svg'
      )
    );
    this.icon.addSvgIcon(
      'filter_button',
      this.santizer.bypassSecurityTrustResourceUrl(
        '../../../../assets/icons/filter-plus.svg'
      )
    );
    this.icon.addSvgIcon(
      'movie_counter',
      this.santizer.bypassSecurityTrustResourceUrl(
        '../../../../assets/icons/filmstrip-box-multiple.svg'
      )
    );
    this.icon.addSvgIcon(
      'add_watchlist',
      this.santizer.bypassSecurityTrustResourceUrl(
        '../../../../assets/icons/movie-open-star.svg'
      )
    );
    this.icon.addSvgIcon(
      'add_seen',
      this.santizer.bypassSecurityTrustResourceUrl(
        '../../../../assets/icons/movie-open-check.svg'
      )
    );
    this.icon.addSvgIcon(
      'add_ignore',
      this.santizer.bypassSecurityTrustResourceUrl(
        '../../../../assets/icons/movie-open-minus.svg'
      )
    );
    this.icon.addSvgIcon(
      'remove_from_list',
      this.santizer.bypassSecurityTrustResourceUrl(
        '../../../../assets/icons/movie-open-remove.svg'
      )
    );
  }
}
