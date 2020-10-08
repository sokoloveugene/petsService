import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu-links',
  templateUrl: './menu-links.component.html',
  styleUrls: ['./menu-links.component.scss'],
})
export class MenuLinksComponent implements OnInit {
  @Input() inline;

  constructor(public auth: AuthService) {}

  ngOnInit(): void {}
}
