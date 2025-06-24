import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  standalone: true,
  selector: 'app-modal-success',
  imports: [CommonModule],
  templateUrl: './modal-success.component.html',
})
export class ModalSuccessComponent {
  constructor(public bsModalRef: BsModalRef) {}
}
