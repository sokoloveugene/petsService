import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { consultationRequestInterface } from '../../../interfaces';
@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrls: ['./user-request.component.scss'],
})
export class UserRequestComponent{
  @Input() request: consultationRequestInterface;
  @Input() convertForDoc: boolean;
  @Output() showInfoModal: EventEmitter<string> = new EventEmitter()
}
