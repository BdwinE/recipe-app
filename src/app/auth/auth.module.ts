import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';
import { SharedModules } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    FormsModule,
    SharedModules,
    RouterModule.forChild([{ path: '', component: AuthComponent }]),
  ],
  exports: [AuthComponent],
})
export class AuthModule {}
