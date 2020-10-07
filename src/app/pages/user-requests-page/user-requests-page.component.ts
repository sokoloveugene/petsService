import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, SubscriptionLike } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ConsultationService } from 'src/app/services/consultation.service';
import { consultationRequestInterface } from '../../../interfaces';
import { zip } from 'rxjs';
import { DocDataService } from '../../services/doc-data.service';
import { SpinerService } from 'src/app/services/spiner.service';

@Component({
  selector: 'app-user-requests-page',
  templateUrl: './user-requests-page.component.html',
  styleUrls: ['./user-requests-page.component.scss'],
})
export class UserRequestsPageComponent implements OnInit, OnDestroy {
  subscriptions: SubscriptionLike[] = [];
  deleteConfirmedSub: Subscription;
  userID: string;
  userRequests: Array<consultationRequestInterface> = [];
  docModalId: string;
  modalVisibility = false;

  constructor(
    private authService: AuthService,
    private consultationService: ConsultationService,
    private docData: DocDataService,
    private spiner: SpinerService
  ) {}

  ngOnInit(): void {
    this.spiner.loadingStart();
    this.userID = this.authService.userId();
    this.subscriptions.push(
      this.consultationService
        .getConsultationRequestsById(this.userID)
        .subscribe(
          (res) => {
            if (res) {
              this.userRequests = res;
            }
          },
          null,
          () => this.spiner.loadingEnd()
        )
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.subscriptions = [];

    if (this.deleteConfirmedSub) {
      this.deleteConfirmedSub.unsubscribe();
      this.deleteConfirmedSub = null;
    }
  }

  deleteRequest(
    confirmed: boolean,
    dutyTime: number,
    id: string,
    docId?: string
  ) {
    const next = () => {
      this.userRequests = this.userRequests.filter(
        (request: consultationRequestInterface) => request.requestId !== id
      );
    };

    if (confirmed) {
      this.deleteConfirmedSub = zip(
        this.docData.deleteOrder(dutyTime, docId),
        this.consultationService.deleteRequestById(id)
      ).subscribe(next);
    } else {
      this.subscriptions.push(
        this.consultationService.deleteRequestById(id).subscribe(next)
      );
    }
  }

  showModal(id: string) {
    this.docModalId = id;
    this.modalVisibility = true;
  }

  closeModal() {
    this.docModalId = null;
    this.modalVisibility = false;
  }
}
