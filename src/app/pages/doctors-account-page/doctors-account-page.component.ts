import { Component } from '@angular/core';
import { FreezeScrollService } from 'src/app/services/freeze-scroll.service';

@Component({
  selector: 'app-doctors-account-page',
  templateUrl: './doctors-account-page.component.html',
  styleUrls: ['./doctors-account-page.component.scss'],
})
export class DoctorsAccountPageComponent {
  idForModal: string;

  modalVisible = false;

  constructor(private freezer: FreezeScrollService) {}

  closeModal() {
    this.modalVisible = false;
    this.freezer.unfreeze();
  }

  showModal(id: string) {
    this.idForModal = id;
    this.modalVisible = true;
    this.freezer.freeze();
  }
}
