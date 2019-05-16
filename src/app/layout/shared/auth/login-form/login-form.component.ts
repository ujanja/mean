import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, ValidationErrors, FormGroup, Validators } from '@angular/forms';
import { LoginNRegistrationService } from '../../../../services/auth-services/login-n-registration/login-n-registration.service';

import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import { AuthModalService } from '../../../../services/auth-services/auth-modal/auth-modal.service';
import { Subscription } from 'rxjs';
import { ValidationMessagesService } from '../../../../services/shared-services/form-services/validation/validation-messages.service';


@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginEmail: string;
  loginPassword: string;
  

  modalErrorAlert: any = {};
  modalSuccessAlert: any = {};
  verificationSuccessAlert: any ={}
  verificationInfoAlert: any ={}
  verificationError: any ={}
  errorAlert: any = {};
  
  //data: any = {};
  subscription: Subscription;
  form_validation_messages;
  
  @Input() data: any = {};

  @Output() closeModalEmitter = new EventEmitter<any>();

  constructor(
            private loginNRegistrationService: LoginNRegistrationService, 
            private router: Router,
            private modalService: NgbModal,
            private authModalMessageService: AuthModalService,
            private validationMessagesService:ValidationMessagesService,

            ) {
              // subscribe to auth messages
              //this.subscription = this.authModalMessageService.getMessage()
              //  .subscribe(data => {})
             }

  ngOnInit() {  
    this.form_validation_messages = this.validationMessagesService.returnValidationMessages()

    if (this.data.error){
                      
      if (this.data.error.details == "User does not exist, register first."){
        this.verificationError.type = this.data.error.type
        this.verificationError.details = this.data.error.details
      }
      if (this.data.error.details == "Email already verified. Try logging in."){
        this.verificationInfoAlert.type = this.data.error.type
        this.verificationInfoAlert.details = this.data.error.details
      }
    }
    if (this.data === "Trying to place bets but not logged in."){
      this.verificationInfoAlert.type = "Login first to be able to play :)."
      this.verificationInfoAlert.details = "Hello there! Welcome. If you are not yet registered, register first :). It only take a minute. If you are registered, login and have fun!"
    }
    if (this.data.verifiedUser){
      this.verificationSuccessAlert.type = "Email verification successful"
      this.verificationSuccessAlert.details = "Your account is now activated. You can now login."
    }
    if (this.data.newPasswordUser){
      this.verificationSuccessAlert.type = "Password reset successful."
      this.verificationSuccessAlert.details = "You can now login with your new password."
    }

  }


  clearMessage(): void {
    // clear message... used in template
    this.authModalMessageService.clearMessage();
  }

  forgotPassForm(): void {
    // clear message... used in template
    this.authModalMessageService.sendFormMessage("forgotPassForm");
  }



  login(): void {
    this.loginNRegistrationService.login(this.loginEmail, this.loginPassword)
    .subscribe(data => {
      if(data.error){
        this.errorAlert = data.error
      }
      if(data.user){
       
        this.cleanData()
        //this.authModalMessageService.sendFormMessage("closeModal");
        this.closeModalEmitter.emit("closeModal");

        } 
      
      //this.router.navigate(['/']);
    })
  }

  cleanData(){
    this.modalErrorAlert = {};
    this.modalSuccessAlert = {};
    this.verificationSuccessAlert ={}
    this.verificationInfoAlert ={}
    this.verificationError = {}

  }

}

 



