import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginNRegistrationService } from '../../services/auth-services/login-n-registration/login-n-registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'main-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {


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
      console.log("mtumiaji", user)
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
