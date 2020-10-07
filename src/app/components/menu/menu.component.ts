import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { WindowSizeService } from '../../services/window-size.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
  visible = false;
  sub: Subscription;
  mobileDevice: boolean;

  toggle() {
    this.visible = !this.visible;
  }

  constructor(
    public auth: AuthService,
    private windowService: WindowSizeService
  ) {}

  ngOnInit(): void {
    this.mobileDevice = window.innerWidth < this.windowService.breakpoint;
    this.sub = this.windowService.windowWiderBreakPoint().subscribe(e => this.mobileDevice = e);
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = null;
    }
  }
}
