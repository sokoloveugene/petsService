import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DocDataService } from '../services/doc-data.service';

@Injectable({
  providedIn: 'root',
})
export class AppointmentUpdateService {
  constructor(private docData: DocDataService) {}

  public appointments$ = new Subject();

  update() {
    this.docData
      .getAppointments()
      .subscribe((data) => this.appointments$.next(data));
  }
}
