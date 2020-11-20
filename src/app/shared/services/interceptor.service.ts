import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (
      req.url.includes('a3eaec728d6e-bluemix.cloudant.com') ||
      req.url.includes('homeautodaniel.eu-gb.mybluemix.net')
    ) {
      
      const CLOUDANT_USERNAME = 'b89d1667-e790-4e13-980b-a3eaec728d6e-bluemix';
      const CLOUDANT_PASSWORD =
        '979fbb6cd2dba92f0640716fa5f60a441e7de305e66771ee212cd6a61ed2a896';
      const BASIC_AUTH =
        'Basic ' + btoa(CLOUDANT_USERNAME + ':' + CLOUDANT_PASSWORD);
      const MODIFIED_REQUEST = req.clone({
        headers: req.headers.append('Authorization', BASIC_AUTH),
      });

      return next.handle(MODIFIED_REQUEST);
    } else {
      return next.handle(req);
    }
  }
}
