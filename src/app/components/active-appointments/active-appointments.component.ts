import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { DocDataService } from '../../services/doc-data.service';
import { AppointmentUpdateService } from '../../services/appointment-update.service';
import { SubscriptionLike } from 'rxjs';
@Component({
  selector: 'app-active-appointments',
  templateUrl: './active-appointments.component.html',
  styleUrls: ['./active-appointments.component.scss'],
})
export class ActiveAppointmentsComponent implements OnInit, OnDestroy {
  @Output() showModalById: EventEmitter<string> = new EventEmitter()

  subscriptions: SubscriptionLike[] = [];

  activeAppointments: Array<string[]>;

  constructor(
    private docData: DocDataService,
    private appointmentUpdate: AppointmentUpdateService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.docData
        .getAppointments()
        .subscribe((data) => (this.activeAppointments = data))
    );

    this.subscriptions.push(
      this.appointmentUpdate.appointments$.subscribe(
        (data: Array<string[]>) => (this.activeAppointments = data)
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
    this.subscriptions = [];
  }
}
