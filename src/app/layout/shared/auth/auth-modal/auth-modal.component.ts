import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import { AuthModalService } from '../../../../services/auth-services/auth-modal/auth-modal.service';
import { Subscription } from 'rxjs';
import { LoginThenBetService } from '../../../../services/auth-services/login-then-bet/login-then-bet.service';

@Component({
  selector: 'auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss'],
  // add NgbModalConfig and NgbModal to the component providers
  providers: [NgbModalConfig, NgbModal]
})
export class AuthModalComponent implements OnInit {

  constructor(

            private modalService: NgbModal,
            config: NgbModalConfig,

            ) {
              // customize default values of modals used by this component tree
              config.backdrop = 'static';
              config.keyboard = false;
              }

  ngOnInit() { }

  open(content) {
    this.modalService.open(content)
  }

}

 