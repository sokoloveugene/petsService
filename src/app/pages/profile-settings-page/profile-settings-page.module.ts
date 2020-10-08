import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileSettingsPageComponent } from './profile-settings-page.component';
import { SharedModule } from '../../shared.module';

@NgModule({
  declarations: [ProfileSettingsPageComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: ProfileSettingsPageComponent },
    ]),
  ],
  exports: [RouterModule],
})
export class ProfileSettingsPageModule {}
