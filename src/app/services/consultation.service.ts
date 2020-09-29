import { Injectable } from '@angular/core';
import { consultationRequestInterface } from '../../interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AlertService } from './alert.service';
import { filter, map } from 'rxjs/operators';

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

    this.http
      .post(
        `https://${environment.projectId}.firebaseio.com/consultationRequests.json`,
        JSON.stringify(request)
      )
      .subscribe(next, error);
  }

  getAllUnconfirmedConsultationRequests() {
    return this.http
      .get(
        `https://${environment.projectId}.firebaseio.com/consultationRequests.json`
      )
      .pipe(
        filter((r) => r !== null),
        map((res) => {
          return Object.keys(res)
            .map((key) => ({
              ...res[key],
              requestId: key,
            }))
            .filter((item) => item.confirmed === false);
        })
      );
  }

  getConsultationRequestsById(id: string) {
    return this.http
      .get(
        `https://${environment.projectId}.firebaseio.com/consultationRequests.json`
      )
      .pipe(
        map((res) => {
          if (res) {
            return Object.keys(res)
              .map((key) => ({ ...res[key], requestId: key }))
              .filter((item) => item.userID === id);
          }
        })
      );
  }

  deleteRequestById(id: string) {
    return this.http.delete(
      `https://${environment.projectId}.firebaseio.com/consultationRequests/${id}.json`
    );
  }

  confirmRequestById(id: string, update: any) {
    return this.http.patch(
      `https://${environment.projectId}.firebaseio.com/consultationRequests/${id}.json`,
      update
    );
  }

  getRequestById(id: string) {
    return this.http
      .get(
        `https://${environment.projectId}.firebaseio.com/consultationRequests/${id}.json`
      )
      .pipe(filter((r) => r !== null));
  }
}
