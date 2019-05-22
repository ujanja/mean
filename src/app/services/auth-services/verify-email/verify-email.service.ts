import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerifyEmailService {

  constructor(private http : HttpClient) {}

  verifyEmail(emailVerificationSecretToken : string, user_id : string) : Observable <any> {
    return Observable.create(observer => {
      this.http.post('/api/auth/verifyEmail', {
        emailVerificationSecretToken, user_id
      }).subscribe((data : any) => {
        console.log("17",data)
          observer.next({verifiedUser: data.verifiedEmailUser});
          
          observer.complete();
      },
      (err:any) => {
        console.log(err)
        console.log(err.error.error)
        observer.next({error: err.error.error}); 
        observer.complete();
      })
    });
  }
}
