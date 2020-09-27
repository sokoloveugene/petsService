import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private http: HttpClient) {}

  createSchedule(requestId: string, dutyTime: number, docId: string) {
    return this.http.post(
      `https://${environment.projectId}.firebaseio.com/doctors/${docId}/schedule/${dutyTime}.json`,
      JSON.stringify(requestId)
    );
  }

  checkScedule(dutyTime: number, docId: string) {
    return this.http.get(
      `https://${environment.projectId}.firebaseio.com/doctors/${docId}/schedule/${dutyTime}.json`
    );
  }

  deleteOrder(dutyTime: number, docId: string) {
    return this.http.delete(
      `https://${environment.projectId}.firebaseio.com/doctors/${docId}/schedule/${dutyTime}.json`
    );
  }
}
