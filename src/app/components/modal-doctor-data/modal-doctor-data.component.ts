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
import { filter } from 'rxjs/operators';
import { DocDataService } from 'src/app/services/doc-data.service';
import { profileDataInterface } from '../../../interfaces';

@Component({
  selector: 'app-modal-doctor-data',
  templateUrl: './modal-doctor-data.component.html',
  styleUrls: ['./modal-doctor-data.component.scss'],
})
export class ModalDoctorDataComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @Output() onClose: EventEmitter<void> = new EventEmitter();
  @ViewChild('backdrop') backdropRef: ElementRef;

  sub: SubscriptionLike[] = [];
  docData: profileDataInterface;

  constructor(private docDataService: DocDataService) {}

  ngOnInit(): void {
    console.log(this.id);
    this.sub.push(
      this.docDataService
        .getDocDataById(this.id)
        .subscribe((r: profileDataInterface) => (this.docData = r))
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
