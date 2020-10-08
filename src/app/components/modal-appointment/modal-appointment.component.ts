import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { fromEvent, SubscriptionLike } from 'rxjs';
import { ConsultationService } from '../../services/consultation.service';
import { consultationRequestInterface } from '../../../interfaces';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-modal-appointment',
  templateUrl: './modal-appointment.component.html',
  styleUrls: ['./modal-appointment.component.scss'],
})
export class ModalAppointmentComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @Output() onClose: EventEmitter<void> = new EventEmitter();
  @ViewChild('backdrop') backdropRef: ElementRef;

  sub: SubscriptionLike[] = [];
  consultation: consultationRequestInterface;

  constructor(private consultationService: ConsultationService) {}

  ngOnInit(): void {
    this.sub.push(
      this.consultationService
        .getRequestById(this.id)
        .subscribe((r: consultationRequestInterface) => (this.consultation = r))
    );

    const mouseClick$ = fromEvent(window, 'click');

    this.sub.push(
      mouseClick$
        .pipe(
          filter(
            (e) =>
              this.backdropRef !== undefined &&
              e.target === this.backdropRef.nativeElement
          )
        )
        .subscribe(() => this.onClose.emit())
    );
  }

  ngOnDestroy(): void {
    this.sub.forEach((s) => s.unsubscribe());
    this.sub = [];
  }
}
