import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ConsultationService } from 'src/app/services/consultation.service';
import { consultationRequestInterface } from '../../../interfaces';
import { ScheduleService } from '../../services/schedule.service';
import { AlertService } from 'src/app/services/alert.service';
import { switchMap } from 'rxjs/operators';
import { zip, throwError } from 'rxjs';

@Component({
  selector: 'app-all-requests-page',
  templateUrl: './all-requests-page.component.html',
  styleUrls: ['./all-requests-page.component.scss'],
})
export class AllRequestsPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  sub: Subscription;

  allRequests: Array<consultationRequestInterface>;

  constructor(
    private consultationService: ConsultationService,
    private auth: AuthService,
    private schedule: ScheduleService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      docAnswer: new FormControl(''),
    });
    this.sub = this.consultationService
      .getAllUnconfirmedConsultationRequests()
      .subscribe((res) => (this.allRequests = res));
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

    this.schedule
      .checkScedule(dutyTime, docId)
      .pipe(
        switchMap((hasOrderAtThisTime) => {
          if (hasOrderAtThisTime !== null) {
            this.alert.warning('You have meeting on this date and time');
            return throwError("Leave this request to another doctor");
          } else {
            return zip(
              this.schedule.createSchedule(requestId, dutyTime, docId),
              this.consultationService.confirmRequestById(requestId, update)
            );
          }
        })
      )
      .subscribe(() => {
        this.allRequests = this.allRequests.filter(
          (item: consultationRequestInterface) => item.requestId !== requestId
        );
        this.alert.success('OK');
      }, console.warn);
  }
}
