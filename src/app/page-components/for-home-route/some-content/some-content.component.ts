import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, } from '@angular/router';
import { Subscription } from 'rxjs';

import { VerifyEmailService } from '../../../services/auth-services/verify-email/verify-email.service';
import { AuthModalService } from '../../../services/auth-services/auth-modal/auth-modal.service';


@Component({
  selector: 'some-content',
  templateUrl: './some-content.component.html',
  styleUrls: ['./some-content.component.scss']
})
export class SomeContentComponent implements OnInit {

  private emailVerificationSecretToken;
  private user_id;

  subscription: Subscription;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private verifyEmailService:VerifyEmailService, 
    private authModalMessageService: AuthModalService,


    ) { 
      this.activatedRoute.params.subscribe(params => {
      
        this.emailVerificationSecretToken = params['emailVerificationSecretToken']; // (+) converts string 'id' to a number

        if(params.user_id){
          this.verifyEmailService.verifyEmail(this.emailVerificationSecretToken, this.user_id).subscribe(data => {
            
            this.authModalMessageService.sendMessage(data)
          })
        }

        if(params.passResetToken){
          this.authModalMessageService.sendMessage({passResetToken:params.passResetToken})
        }
        
      });

      }

  ngOnInit() { }

}