import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DocDataService } from 'src/app/services/doc-data.service';
import { MyValidators } from 'src/app/services/my.validators';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile-settings-page',
  templateUrl: './profile-settings-page.component.html',
  styleUrls: ['./profile-settings-page.component.scss'],
})
export class ProfileSettingsPageComponent implements OnInit {
  defaultProfilePhoto = environment.defaultProfilePhotoUrl;

  photoToShow = this.defaultProfilePhoto;

  form: FormGroup;

  constructor(
    private http: HttpClient,
    private docData: DocDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      insta: new FormControl(''),
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      startCareer: new FormControl('', [
        Validators.required,
        MyValidators.careerYear,
      ]),
      phone: new FormControl('+380', [
        Validators.required,
        MyValidators.uaPhone,
      ]),
      biography: new FormControl('', [
        Validators.required,
        Validators.minLength(20),
      ]),
    });
  }

  loadPhotoUrlFromInstagram(e) {
    const userName = e.target.value;
    if (userName.trim()) {
      const next = (r) => {
        this.photoToShow = r['graphql']['user']['profile_pic_url'];
      };

      const error = (err) => {
        this.photoToShow = this.defaultProfilePhoto;
        console.warn(err.message);
      };

      this.http
        .get(`https://www.instagram.com/${userName}/?__a=1`)
        .subscribe(next, error);
    } else {
      this.photoToShow = this.defaultProfilePhoto;
    }
  }

  submit() {
    if (this.form.invalid) return;

    const expirence =
      new Date().getFullYear() - Number(this.form.controls.startCareer.value);

    const body = {
      ...this.form.value,
      photoUrl: this.photoToShow,
      expirence,
    };

    this.docData.writeProfileData(body).subscribe();
    this.router.navigate(['/']);
  }
}
