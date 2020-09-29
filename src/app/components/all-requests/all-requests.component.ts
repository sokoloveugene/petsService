import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ConsultationService } from 'src/app/services/consultation.service';
import { consultationRequestInterface } from '../../../interfaces';
import { DocDataService } from '../../services/doc-data.service';
import { AlertService } from 'src/app/services/alert.service';
import { switchMap } from 'rxjs/operators';
import { zip, throwError } from 'rxjs';
import { AppointmentUpdateService } from '../../services/appointment-update.service';

@Component({
  selector: 'app-all-requests',
  templateUrl: './all-requests.component.html',
  styleUrls: ['./all-requests.component.scss'],
})
export class AllRequestsComponent implements OnInit, OnDestroy {
  form: FormGroup;
  sub: Subscription;

  allRequests: Array<consultationRequestInterface>;

  constructor(
    private consultationService: ConsultationService,
    private auth: AuthService,
    private docData: DocDataService,
    private alert: AlertService,
    private appointmentUpdate: AppointmentUpdateService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      docAnswer: new FormControl(''),
    });

    const next = (r) => {
      this.allRequests = r.sort(
        (a, b) => a.desiredTimeForConsultation - b.desiredTimeForConsultation
      );
    };

    const error = () => console.warn;

    this.sub = this.consultationService
      .getAllUnconfirmedConsultationRequests()
      .subscribe(next, error);
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = null;
    }
  }

  confirmRequest(requestId: string, dutyTime: number) {
    const docId = this.auth.userId();
    const { value: enteredAnswer } = this.form.controls.docAnswer;
    const defaultAnswer = "I'll be glad to help. Sincerely, Doc";
    const update = {
      confirmed: true,
      docAnswer: enteredAnswer.trim() ? enteredAnswer.trim() : defaultAnswer,
      docId,
    };

    this.docData
      .checkScedule(dutyTime)
      .pipe(
        switchMap((hasOrderAtThisTime) => {
          if (hasOrderAtThisTime !== null) {
            this.alert.warning('You have meeting on this date and time');
            return throwError('Leave this request to another doctor');
          } else {
            return zip(
              this.docData.createSchedule(requestId, dutyTime),
              this.consultationService.confirmRequestById(requestId, update)
            );
          }
        })
      )
      .subscribe(() => {
        this.allRequests = this.allRequests.filter(
          (item: consultationRequestInterface) => item.requestId !== requestId
        );

        this.appointmentUpdate.update();

        this.alert.success('OK');
      }, console.warn);
  }
}
