import { Component, Input, OnInit } from '@angular/core';
import { consultationRequestInterface } from '../../../interfaces';
@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrls: ['./user-request.component.scss'],
})
export class UserRequestComponent implements OnInit {
  @Input() request: consultationRequestInterface;
  @Input() convertForDoc: boolean;
  constructor() {}

  ngOnInit(): void {}
}
