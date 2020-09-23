import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { consultationRequestInterface } from '../../interfaces';
import { ConsultationService } from '../services/consultation.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  form: FormGroup;
  dateValiants = [];

  constructor(
    public auth: AuthService,
    private router: Router,
    private consultationService: ConsultationService
  ) {}

  ngOnInit(): void {
    this.fillWithDates();
    let animal: string;
    let comments: string;
    let customersName: string;

    try {
      ({ animal = '', comments = '', customersName = '' } = JSON.parse(
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
      comments: new FormControl(comments, Validators.required),
    });
  }

  fillWithDates() {
    const today = new Date();
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

    if (this.form.invalid) {
      console.log('INVALID');
      return;
    }

    const consultationRequest: consultationRequestInterface = {
      ...this.form.value,
      userID: this.auth.userId(),
      confirmed: false,
      createdAt: Date.now(),
    };
    this.consultationService.sendRequest(consultationRequest);
    this.form.reset();
  }
}