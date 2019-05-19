import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

//import { TokenStorage } from '../../../auth/token.storage';
// import { TooltipComponent } from '@angular/material';
@Injectable({
  providedIn: 'root'
})
@Injectable()
export class LoginNRegistrationService {

  constructor(private http : HttpClient) {}

  public $userSource = new Subject<any>();
  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false')

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value
    window.localStorage.setItem('loggedIn', 'true')
  }
  setLoggedOut(value: boolean) {
    this.loggedInStatus = value
    window.localStorage.setItem('loggedIn', 'false')
  }


  login(email : string, password : string) : Observable <any> {
    return Observable.create(observer => {
      this.http.post('/api/auth/login', {
        email,
        password
      }).subscribe((data : any) => {
          observer.next({user: data.user});
          this.setUser(data.user);
          this.setLoggedIn(true)
          observer.complete();
      },
      (err:any) => {
        console.log(err)
        console.log(err.error.error)
        observer.next({error: err.error.error}); 
        observer.complete();
      }
      )
    });
  }

  register(username : string, email : string, password : string, repeatPassword : string) : Observable <any> {
    return Observable.create(observer => {
      this.http.post('/api/auth/register', {
        username,
        email,
        password,
        repeatPassword
      }).subscribe(
        (data : any) => {
          observer.next({user: data.user});
          //this.setUser(data.user);
          //this.setLoggedIn(true)
          //this.token.saveToken(data.token);
          observer.complete();
        },
        (err:any) => {
          console.log(err)
          console.log(err.error.error)
          observer.next({error: err.error.error}); 
          observer.complete();
        }
      )
    });
  }

  setUser(user): void {
    if (user) user.isAdmin = (user.roles.indexOf('admin') > -1);
    this.$userSource.next(user);
    (<any>window).user = user;
  }

  getUser(): Observable<any> {
    return this.$userSource.asObservable();
  }

  me(): Observable<any> {
    return Observable.create(observer => {
      console.log(this.loggedInStatus)
      if (!this.loggedInStatus) return  observer.complete();
      this.http.get('/api/auth/me',{ withCredentials: true }).subscribe((data : any) => {
        observer.next({user: data.user});
        this.setUser(data.user);
        observer.complete();
      })
    });
  }

  signOut(): void {
    //this.token.signOut();
    this.http.get('/api/auth/logout').subscribe()
    this.setUser(null);
    this.setLoggedOut(false)
    delete (<any>window).user;
  }
}
