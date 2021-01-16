import { NgModule } from '@angular/core';
import { LoginPageComponent } from './login-page.component';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    AngularFireAuthModule,
    SharedModule,
  ],
  exports: [],
  declarations: [LoginPageComponent],
  providers: [],
})
export class LoginPageModule {}
