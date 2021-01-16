import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './interceptor/token.interceptor.service';
import { RouterModule } from '@angular/router';

registerLocaleData(localePl);

@NgModule({
  imports: [RouterModule],
  exports: [],
  declarations: [],
  providers: [
    { provide: LOCALE_ID, useValue: 'pl' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
})
export class CoreModule {}
