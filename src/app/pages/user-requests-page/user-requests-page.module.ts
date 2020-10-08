import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { UserRequestsPageComponent } from '../../pages/user-requests-page/user-requests-page.component';
import { NoUserRequestsPlaceholderComponent } from '../../components/no-user-requests-placeholder/no-user-requests-placeholder.component';
import { ModalDoctorDataComponent } from '../../components/modal-doctor-data/modal-doctor-data.component';
import { YearsOfExperincePipe } from '../../pipes/years-of-experince.pipe';

@NgModule({
  declarations: [
    UserRequestsPageComponent,
    NoUserRequestsPlaceholderComponent,
    ModalDoctorDataComponent,
    YearsOfExperincePipe,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: UserRequestsPageComponent }]),
  ],
  exports: [RouterModule],
})
export class UserRequestsPageModule {}
