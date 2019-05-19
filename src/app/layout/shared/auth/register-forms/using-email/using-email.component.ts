import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, ValidationErrors, FormGroup, Validators } from '@angular/forms';
import { LoginNRegistrationService } from '../../../../../services/auth-services/login-n-registration/login-n-registration.service';

import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import { AuthModalService } from '../../../../../services/auth-services/auth-modal/auth-modal.service';
import { Subscription } from 'rxjs';
import { ValidationMessagesService } from '../../../../../services/shared-services/form-services/validation/validation-messages.service';


@Component({
  selector: 'register-using-email',
  templateUrl: './using-email.component.html',
  styleUrls: ['./using-email.component.scss']
})
export class UsingEmailComponent implements OnInit {

  modalErrorAlert: any = {};
  modalSuccessAlert: any = {};
  verificationSuccessAlert: any ={}
  verificationInfoAlert: any ={}
  verificationError: any ={}

  subscription: Subscription;
  form_validation_messages;
  
  @Input() data;


  constructor(
            private loginNRegistrationService: LoginNRegistrationService,
            private authModalMessageService: AuthModalService,
            private validationMessagesService:ValidationMessagesService,


            ) {

              // subscribe to auth messages
              this.subscription = this.authModalMessageService.getMessage()
                .subscribe(data => 
                  { this.data = data;
                    console.log(this.data)
                    this.cleanData()
                    
                  });
             }

  ngOnInit() {  
    this.form_validation_messages = this.validationMessagesService.returnValidationMessages();

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

    if (this.data.verifiedUser){
      this.verificationSuccessAlert.type = "Email verification successful"
      this.verificationSuccessAlert.details = "Your account is now activated. You can now login."
    }

  }


  clearMessage(): void {
    // clear message
    this.authModalMessageService.clearMessage();
  }

  
  // Register Form Knowledge
  passwordsMatchValidator(control: FormControl): ValidationErrors {
    let password = control.root.get('password');
    return password && control.value !== password.value ? {
      passwordMatch: true
    }: null;
  }

  userForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(7)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    repeatPassword: new FormControl('', [Validators.required, this.passwordsMatchValidator, Validators.minLength(8)])
  })

  get username(): any { return this.userForm.get('username'); }
  get email(): any { return this.userForm.get('email'); }
  get password(): any { return this.userForm.get('password'); }
  get repeatPassword(): any { return this.userForm.get('repeatPassword'); }

  register() {

    if(!this.userForm.valid) return;
    if(this.userForm.get('password').value != this.userForm.get('repeatPassword').value){
      this.modalErrorAlert.type = "Authentification Error";
      this.modalErrorAlert.details = "Passwords do not match.";
      return;
    }
    if(this.userForm.get('password').value === this.userForm.get('repeatPassword').value){

    let {
      username,
      email,
      password,
      repeatPassword
    } = this.userForm.getRawValue();

    this.loginNRegistrationService.register(username, email, password, repeatPassword)
    .subscribe(
      data => {
        if(data.user){
          if(this.verificationError.type || this.verificationError.details){
            delete this.verificationError.type;
            delete this.verificationError.details
          }
          this.cleanData()
          this.modalSuccessAlert.type = "Registration successful."
          this.modalSuccessAlert.details = `An email has been sent to ${data.user.email}. Sign in to your email account and verify your email address inorder to activate your account.`
          
          console.log(data.user)
        }
        if(data.error){
          this.cleanData()
          this.modalErrorAlert = data.error
          console.log(data.error)
        }
      }
     
    )}
  }
  close(){
    delete this.verificationError.type;
    delete this.verificationError.details
  }

  cleanData(){
    this.modalErrorAlert = {};
    this.modalSuccessAlert = {};
    this.verificationSuccessAlert ={}
    this.verificationInfoAlert ={}
    this.verificationError = {}

  }
  
}

 
