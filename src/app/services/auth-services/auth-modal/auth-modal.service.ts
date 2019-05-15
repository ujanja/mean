import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthModalService {
  private subject = new Subject<any>();
  private changeForm = new Subject<any>();

  sendMessage(authMessage) {
      this.subject.next(authMessage);
  }

  clearMessage() {
      this.subject.next();
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();   
  }

  sendFormMessage(formToChangeTo) {
    this.changeForm.next(formToChangeTo);
  }

  clearFormMessage() {
    this.changeForm.next();
  }

  getFormMessage(): Observable<any> {
      return this.changeForm.asObservable();
  }
}
