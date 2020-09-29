import { Component } from '@angular/core';

@Component({
  selector: 'app-doctors-account-page',
  templateUrl: './doctors-account-page.component.html',
  styleUrls: ['./doctors-account-page.component.scss'],
})
export class DoctorsAccountPageComponent {
  idForModal: string;

  modalVisible = false;

  closeModal() {
    this.modalVisible = false;
  }

  showModal(id: string) {
    this.idForModal = id;
    this.modalVisible = true;
  }
}
