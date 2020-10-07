import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { consultationRequestInterface } from '../../../interfaces';
import { ConsultationService } from '../../services/consultation.service';
import { MyValidators } from '../../services/my.validators';
import { AlertService } from 'src/app/services/alert.service';
import { WindowSizeService } from 'src/app/services/window-size.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  dateValiants = [];
  mobileDevice: boolean;
  sub: Subscription;

  constructor(
    public auth: AuthService,
    private router: Router,
    private consultationService: ConsultationService,
    private alert: AlertService,
    private windowService: WindowSizeService
  ) {}

  ngOnInit(): void {
    this.mobileDevice = window.innerWidth < this.windowService.breakpoint;
    this.sub = this.windowService
      .windowWiderBreakPoint()
      .subscribe((e) => (this.mobileDevice = e));

    this.fillWithDates();
    let animal: string = '';
    let comments: string = '';
    let customersName: string = '';
    let phone: string = '+380';
    let time: string = '';
    try {
      ({ animal, comments, customersName, phone, time } = JSON.parse(
        localStorage.getItem('consultationForm')
      ));
      localStorage.removeItem('consultationForm');
    } catch {
      console.warn;
    }

    this.form = new FormGroup({
      customersName: new FormControl(customersName, Validators.required),
      animal: new FormControl(animal, Validators.required),
      date: new FormControl('', Validators.required),
      time: new FormControl(time, Validators.required),
      phone: new FormControl(phone, [
        Validators.required,
        MyValidators.uaPhone,
      ]),
      comments: new FormControl(comments, Validators.required),
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = null;
    }
  }

  fillWithDates() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    for (let i: number = 0; i < 7; i++) {
      this.dateValiants.push(today.getTime() + i * 1000 * 60 * 60 * 24);
    }
  }

  submit() {
    if (!this.auth.isAuth()) {
      try {
        localStorage.setItem(
          'consultationForm',
          JSON.stringify(this.form.value)
        );
      } catch {
        console.warn;
      }

      this.router.navigate(['/login']);
      return;
    }

    if (this.auth.isDoctor()) {
      this.alert.error('To make requests plesase login as Customer');
      return;
    }

    let errorText: string;
    switch (true) {
      case Boolean(this.form.controls.customersName.errors):
        errorText = 'Please enter name';
        break;

      case Boolean(this.form.controls.animal.errors):
        errorText = 'Select animal type';
        break;

      case Boolean(this.form.controls.date.errors):
        errorText = 'Select date';
        break;

      case Boolean(this.form.controls.time.errors):
        errorText = 'Select time for consultation';
        break;

      case Boolean(this.form.controls.phone.errors):
        errorText = 'Enter valid phone number';
        break;

      case Boolean(this.form.controls.comments.errors):
        errorText = 'Describe shortly the problem';
        break;
    }

    if (errorText) {
      this.alert.error(errorText);
      return;
    }

    const { date, time } = this.form.value;
    const desiredTimeForConsultation = new Date(date).setHours(Number(time));

    const consultationRequest: consultationRequestInterface = {
      ...this.form.value,
      userID: this.auth.userId(),
      confirmed: false,
      desiredTimeForConsultation,
    };
    this.consultationService.sendRequest(consultationRequest);
    this.form.reset();
    this.form.controls['phone'].setValue('+380');
    this.form.controls['time'].setValue('');
  }
}
