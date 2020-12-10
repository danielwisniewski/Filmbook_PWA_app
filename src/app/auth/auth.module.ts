import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';

import { AngularFireAuthModule } from '@angular/fire/auth';


@NgModule({
  imports: [
    SharedModule,
    AngularFireAuthModule,
  ],
  exports: [],
  declarations: [LoginComponent],
  providers: [],
})
export class AuthModule {}
