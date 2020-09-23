import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;

  constructor(private auth: AuthService, private router: Router, private alertServise: AlertService) {}

  ngOnInit(): void {
    if (this.auth.isAuth()) {
      this.router.navigate(['/']);
    }

    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  submit() {
    let errorText: string;
    switch (true) {
      case Boolean(this.form.controls.email.errors):
        if (this.form.controls.email.errors.required) {
          errorText = 'Email is required';
        } else if (this.form.controls.email.errors.email) {
          errorText = 'Email is not valid';
        }
        break;

      case Boolean(this.form.controls.password.errors):
        if (this.form.controls.password.errors.required) {
          errorText = 'Password is required';
        } else if (this.form.controls.password.errors.minlength) {
          errorText = `Password length need to be at least ${this.form.controls.password.errors.minlength.requiredLength}`;
        }
        break;
    }
    if (errorText) {
      this.alertServise.error(errorText);
      return
    }
    this.auth.login(this.form.value);
    this.form.reset();
  }
}
