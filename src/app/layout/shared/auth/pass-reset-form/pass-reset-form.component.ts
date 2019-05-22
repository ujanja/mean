import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { ValidationMessagesService } from '../../../../services/shared-services/form-services/validation/validation-messages.service';
import { PassResetService } from '../../../../services/auth-services/pass-reset/pass-reset.service';
import { AuthModalService } from '../../../../services/auth-services/auth-modal/auth-modal.service';

@Component({
  selector: 'pass-reset-form',
  templateUrl: './pass-reset-form.component.html',
  styleUrls: ['./pass-reset-form.component.scss']
})
export class PassResetFormComponent implements OnInit {

  passResetForm: FormGroup;
  form_validation_messages;
  validationErrorAlert: any = {};
  errorAlert: any = {};
  user: any = {};
  @Input() data;

  constructor(  private validationMessagesService:ValidationMessagesService,
                private passResetService: PassResetService,
                private authModalMessageService: AuthModalService,

              ) { }

  ngOnInit() {
    this.SetFormGroup();
    this.form_validation_messages = this.validationMessagesService.returnValidationMessages()
    
  }

  passwordsMatchValidator(control: FormControl): ValidationErrors {
    let password = control.root.get('newPassword');
    return password && control.value !== password.value ? {
      passwordMatch: true
    }: null;
  }

  SetFormGroup(){

    this.passResetForm = new FormGroup({    
      newPassword: new FormControl("", [Validators.required, Validators.minLength(8)]),
      repeatNewPassword: new FormControl("", [Validators.required,  this.passwordsMatchValidator]),
    })  
  }

  get newPassword(): any { return this.passResetForm.get('newPassword'); }
  get repeatNewPassword(): any { return this.passResetForm.get('repeatNewPassword'); }

  passReset(){
    if(this.newPassword.value != this.repeatNewPassword.value){
      this.validationErrorAlert.type="Validation Error."
      this.validationErrorAlert.details="Passwords do not match."
      return;
    }
    if(this.newPassword.value === this.repeatNewPassword.value){
    this.passResetService.checkPassResetTokenValidityAndChangePassword(this.data.passResetToken,this.newPassword.value, this.repeatNewPassword.value )
      .subscribe(data => { console.log("56 ", data)
        if(data.error){
          console.log(data.error)
          this.errorAlert = data.error
        }
        if(data.newPasswordUser){
          //
          this.authModalMessageService.sendMessage(data);
          this.authModalMessageService.sendFormMessage("loginForm")
        }
        
      })
    }
  }
}

