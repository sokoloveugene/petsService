import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { switchMap, filter, tap } from 'rxjs/operators';
import { AlertService } from '../../../app/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() delay = 2500;

  private contentPlaceholder: ElementRef;

  @ViewChild('contentPlaceholder', { static: false }) set content(
    content: ElementRef
  ) {
    if (content) {
      this.contentPlaceholder = content;

      const touchstart$ = fromEvent(
        this.contentPlaceholder.nativeElement,
        'touchstart'
      );
      const touchend$ = fromEvent(
        this.contentPlaceholder.nativeElement,
        'touchend'
      );

      this.closeSub = touchstart$
        .pipe(
          switchMap((prevEvent) => {
            return touchend$.pipe(
              filter(
                (e) =>
                  e['changedTouches'][0]['clientY'] -
                    prevEvent['touches'][0]['clientY'] >
                  20
              )
            );
          })
        )
        .subscribe((e) => this.close());
    }
  }

  alertSub: Subscription;
  closeSub: Subscription;

  public text: string;

  public type = 'success';

  constructor(private alertService: AlertService) {}

  timeout: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    this.alertSub = this.alertService.alert$.subscribe((alert) => {
      this.text = alert.text;
      this.type = alert.type;

      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(() => {
        this.close();
        clearTimeout(this.timeout);
      }, this.delay);
    });
  }

  ngAfterViewInit(): void {}

  close() {
    this.text = '';
  }

  ngOnDestroy(): void {
    if (this.alertSub) {
      this.alertSub.unsubscribe();
    }
  }
}
