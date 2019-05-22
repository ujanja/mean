import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class PassResetService {

  constructor(private http : HttpClient) { }


  // Add "adminWhoEditedThisGame" and "howManyTimesThisGameHasBeenEdited" in the schema later 
  sendResetLink(email:string) : Observable <any> {
    return Observable.create(observer => {
      this.http.post('/api/auth/sendPassResetToken', {
        email
      }).subscribe(
        (data : any) => { console.log(data);observer.next(data); observer.complete(); }, 
        (err : any) => { console.log(err); observer.next({error: err.error.error}); observer.complete(); }
      )
    });
  }

  //passResetService.checkPassResetTokenValidity
  checkPassResetTokenValidityAndChangePassword(passResetToken:string, newPassword:string, repeatNewPassword:string) : Observable <any> {
    console.log('kuku')
    return Observable.create(observer => {
      this.http.post('/api/auth/checkPassResetTokenValidityAndChangePassword', {
        passResetToken, newPassword ,repeatNewPassword
      }).subscribe(
        (data : any) => { console.log(data);observer.next(data); observer.complete(); }, 
        (err : any) => { console.log(err); observer.next({error: err.error.error}); observer.complete(); }
      )
    });
  }
}

