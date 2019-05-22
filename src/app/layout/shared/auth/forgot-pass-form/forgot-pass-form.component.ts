import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthModalService } from '../../../../services/auth-services/auth-modal/auth-modal.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidationMessagesService } from '../../../../services/shared-services/form-services/validation/validation-messages.service';
import { PassResetService } from '../../../../services/auth-services/pass-reset/pass-reset.service'

@Component({
  selector: 'forgot-pass-form',
  templateUrl: './forgot-pass-form.component.html',
  styleUrls: ['./forgot-pass-form.component.scss']
})
export class ForgotPassFormComponent implements OnInit {

  forgotPassForm: FormGroup;
  form_validation_messages;
  errorAlert: any = {};
  successAlert: any = {};
  loader:boolean = false;

  constructor(private authModalMessageService: AuthModalService,
              private validationMessagesService:ValidationMessagesService,
              private passResetService:PassResetService

    ) { }

  ngOnInit() {
    this.SetFormGroup();
    this.form_validation_messages = this.validationMessagesService.returnValidationMessages();
  }

  getForm(form): void {
    // clear message... used in template
    this.authModalMessageService.sendFormMessage(form);
  }

  get email(): any { return this.forgotPassForm.get('email').value; }


  SetFormGroup(){

    this.forgotPassForm = new FormGroup({    
      email: new FormControl("", [Validators.required,]),
     
      })  
  }

  sendResetLink(){
    this.loader = true;
    this.passResetService.sendResetLink(this.email)
    .subscribe(data => {
      console.log(data)
      if(data.error){
        this.loader = false;
        console.log(data.error)
        this.errorAlert = data.error
      }
      if(data.emailSentTo){
        this.loader = false;
        this.errorAlert = {}
        this.successAlert.type = "Email successfuly sent."
        this.successAlert.details = `The password reset link was sent to ${data.emailSentTo}. Sign in to your email address and click on the link to proceed with the password resetting.`
      }
    })
  }
}
