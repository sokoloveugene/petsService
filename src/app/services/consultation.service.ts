import { Injectable } from '@angular/core';
import { consultationRequestInterface } from '../../interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class ConsultationService {
  constructor(private http: HttpClient, private alertService: AlertService) {}

  sendRequest(request: consultationRequestInterface) {
    const next = () => {
      this.alertService.success('You request was successfully send');
    };

    const error = () => {
      this.alertService.error(
        'Unfortunatelly your request was not send, try again later'
      );
    };
    console.log('sending request with ', JSON.stringify(request));
    this.http
      .post(
        `https://${environment.projectId}.firebaseio.com/consultationRequests.json`,
        JSON.stringify(request)
      )
      .subscribe(next, error);
  }
}
