import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { profileDataInterface } from '../../interfaces';
import { AuthService } from './auth.service';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DocDataService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  createSchedule(requestId: string, dutyTime: number) {
    const docId = this.auth.userId();

    return this.http.post(
      `https://${environment.projectId}.firebaseio.com/doctors/${docId}/schedule/${dutyTime}.json`,
      JSON.stringify(requestId)
    );
  }

  checkScedule(dutyTime: number) {
    const docId = this.auth.userId();
    return this.http.get(
      `https://${environment.projectId}.firebaseio.com/doctors/${docId}/schedule/${dutyTime}.json`
    );
  }

  deleteOrder(dutyTime: number, docId: string) {
    return this.http.delete(
      `https://${environment.projectId}.firebaseio.com/doctors/${docId}/schedule/${dutyTime}.json`
    );
  }

  writeProfileData(body: profileDataInterface) {
    const docId = this.auth.userId();
    return this.http.put(
      `https://${environment.projectId}.firebaseio.com/doctors/${docId}/profile.json`,
      body
    );
  }

  getProfileData() {
    const docId = this.auth.userId();
    return this.http
      .get(
        `https://${environment.projectId}.firebaseio.com/doctors/${docId}/profile.json`
      )
      .pipe(filter((r) => r !== null));
  }

  getAppointments() {
    const docId = this.auth.userId();
    const today = Date.now();

    return this.http
      .get(
        `https://${environment.projectId}.firebaseio.com/doctors/${docId}/schedule.json`
      )
      .pipe(
        filter((r) => r !== null),
        map((r) => {
          const requestsTimeArr = Object.keys(r);
          const filteredTime = requestsTimeArr.filter(
            (time) => Number(time) > today
          );
          return filteredTime.map((time) => [
            time,
            ...Object.values(r[time]),
          ]) as Array<string[]>;
        })
      );
  }

  getDocDataById(id: string) {
    return this.http
      .get(
        `https://${environment.projectId}.firebaseio.com/doctors/${id}/profile.json`
      )
      .pipe(filter((r) => r !== null));
  }
}
