import { Component, OnInit, Input } from '@angular/core';
import { LoginNRegistrationService } from '../../services/auth-services/login-n-registration/login-n-registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() user: any = {};

  constructor(
    private authService: LoginNRegistrationService,
    private router: Router,
  ) { 
    //console.log(this.user)
  }

  ngOnInit() {
  }

  navigate2(id) {
    //AboutComponent.doUpdate.next(id)
    //UserProfilePageComponent.doUpdate.next(id)
    this.router.navigate([ 'home/user-profile/', this.user._id ])
  }

  logout(): void {
    this.authService.signOut();
    this.navigate('/home');
  }
  
  navigate(link): void {
    this.router.navigate([link]);
  }
  

}

