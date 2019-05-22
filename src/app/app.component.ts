import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { DomSanitizer } from "@angular/platform-browser";


//import { loginNRegistrationService } from './auth/auth.service';
import * as schema from './schema/equipment.json';
import { LoginNRegistrationService } from './services/auth-services/login-n-registration/login-n-registration.service.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private userSubscription: Subscription;
  public user: any;

  constructor(
    private loginNRegistrationService: LoginNRegistrationService,
    private router: Router,
  ) { }


  public ngOnInit() {

    // init this.user on startup
    this.loginNRegistrationService.me().subscribe(data => {
      this.user = data.user;
    });

    // update this.user after login/register/logout
    this.userSubscription = this.loginNRegistrationService.$userSource.subscribe((user) => {
      this.user = user;
    });
  }

  logout(): void {
    this.loginNRegistrationService.signOut();
    this.navigate('');
  }

  navigate(link): void {
    this.router.navigate([link]);
  }

  ngOnDestroy() { 
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
  
}
