import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type AlertType = 'success' | 'warning' | 'error';
export interface Alert {
  type: AlertType;
  text: string;
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  public alert$ = new Subject<Alert>();

  success(text: string) {
    this.alert$.next({ type: 'success', text });
  }

  warning(text: string) {
    this.alert$.next({ type: 'warning', text });
  }

  error(text: string) {
    this.alert$.next({ type: 'error', text });
  }
}
