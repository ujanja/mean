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

  login_form : boolean = true;
  register_form : boolean;
  forgotPass_form: boolean;
  passReset_form : boolean;

  modalReference: any;

  data: any = {};
  subscription: Subscription;
  form_validation_messages;
  
  @ViewChild('content') content: ElementRef;

  @ViewChild('openModal') openModal: ElementRef;

  @ViewChild('closeModal') _closeModal: ElementRef;

  constructor(

            private modalService: NgbModal,
            private authModalMessageService: AuthModalService,
            private loginThenBetService:LoginThenBetService,
            config: NgbModalConfig,

            ) {
              // customize default values of modals used by this component tree
              config.backdrop = 'static';
              config.keyboard = false;

              this.loginThenBetService.getMessage()
                .subscribe(data =>{
                  this.data=data;
                    if (data==="Trying to place bets but not logged in."){
                      this.openModal.nativeElement.click();
                  }
                })

              // subscribe to auth data messages
              this.authModalMessageService.getMessage()
                .subscribe(data => 
                  { this.data = data;
                    
                    console.log(this.data)
                    if (data.error){
                      
                      if (this.data.error.details == "User does not exist, register first."){
                        this.openModal.nativeElement.click();
                        this.registerForm()
                      }
                      if (this.data.error.details == "Email already verified. Try logging in."){
                        this.openModal.nativeElement.click();
                        this.loginForm()
                      }
                      
                    }
                    
                    if (this.data.verifiedUser){
                        this.openModal.nativeElement.click();
                        this.loginForm()
                    }
                    if (this.data.passResetToken){
                      this.openModal.nativeElement.click();
                      this.passResetForm()
                    }

                  });
              
                  
              this.authModalMessageService.getFormMessage()
                .subscribe(formMessage =>{ 
                  if (formMessage=="loginForm"){this.loginForm()}
                  if (formMessage=="registerForm"){this.registerForm()}
                  if (formMessage=="forgotPassForm"){this.forgotPassForm()}
                  if (formMessage=="resetPassForm"){this.passResetForm()}
                  if (formMessage=="closeModal"){this.modalReference.close()}
                })
             }

  ngOnInit() { }

  closeModal(){
    this.modalReference.close()
  }

  closeModalEmitter($event){
    this._closeModal.nativeElement.click();
    //this.modalReference.close();
  }

  open(content) {
    this.modalReference = this.modalService.open(content)
  }

  clearMessage(): void {
    // clear message
    this.authModalMessageService.clearMessage();
  }

  getLoginForm(): boolean {
    return this.login_form;
  }

  getRegisterForm(): boolean {
    return this.register_form;
  }

  getForgotPassForm(){
    return this.forgotPass_form
  }
  getPassResetForm(){
    return this.passReset_form;
  }

  loginForm() {
    this.register_form = false;
    this.forgotPass_form = false;
    this.passReset_form = false;
    this.login_form = true;
  }

  registerForm() {
    this.login_form = false;
    this.forgotPass_form = false;
    this.passReset_form = false;
    this.register_form = true;
  }

  forgotPassForm() {
    this.login_form = false;
    this.register_form = false;
    this.passReset_form = false;
    this.forgotPass_form = true;
  }

  passResetForm(){
    this.login_form = false;
    this.register_form = false;
    this.forgotPass_form = false;
    this.passReset_form = true;
  }
  
  resetModal() {
    this.loginForm();
  }

}

 