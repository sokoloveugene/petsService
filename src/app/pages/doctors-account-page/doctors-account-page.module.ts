import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { DoctorsAccountPageComponent } from './doctors-account-page.component';
import { ProfileCardComponent } from '../../components/profile-card/profile-card.component';
import { ActiveAppointmentsComponent } from '../../components/active-appointments/active-appointments.component';
import { AllRequestsComponent } from '../../components/all-requests/all-requests.component';
import { ModalAppointmentComponent } from '../../components/modal-appointment/modal-appointment.component';
import { NoRequestsPlaceholderComponent } from '../../components/no-requests-placeholder/no-requests-placeholder.component';

@NgModule({
  declarations: [
    DoctorsAccountPageComponent,
    ModalAppointmentComponent,
    AllRequestsComponent,
    ActiveAppointmentsComponent,
    ProfileCardComponent,
    NoRequestsPlaceholderComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: DoctorsAccountPageComponent },
    ]),
  ],
  exports: [RouterModule],
})
export class DoctorsAccountPageModule {}
