import { NgModule } from '@angular/core';
import { LoginPageComponent } from './login-page.component';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginPageRoutes } from './login-page.routing';


@NgModule({
  imports: [
    AngularFireAuthModule,
    LoginPageRoutes,
    SharedModule,
  ],
  exports: [],
  declarations: [LoginPageComponent],
  providers: [],
})
export class LoginPageModule {}
