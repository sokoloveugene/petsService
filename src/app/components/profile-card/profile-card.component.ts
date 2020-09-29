import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DocDataService } from 'src/app/services/doc-data.service';
import { profileDataInterface } from '../../../interfaces';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent {
  sub: Subscription;

  photoUrl: string;
  name = 'Name';
  surname = 'Surname';

  constructor(private docData: DocDataService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    const next = (r: profileDataInterface) => {
      if (!!r) {
        this.photoUrl = r.photoUrl;
        this.name = r.name;
        this.surname = r.surname;
      } else {
        this.photoUrl = environment.defaultProfilePhotoUrl;
      }
    };

    const error = () => console.warn;

    this.sub = this.docData.getProfileData().subscribe(next, error);
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = null;
    }
  }
}
