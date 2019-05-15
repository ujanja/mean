import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginThenBetService {

  private message = new Subject<any>();
  modalOpen: boolean = false;

  sendMessage(Message) {
      this.message.next(Message);
  }

  clearMessage() {
      this.message.next();
  }

  getMessage(): Observable<any> {
      return this.message.asObservable();   
  }

  setModalOpenToTrue(){
    this.modalOpen= true;
  }

  setModalOpenToFalse(){
    this.modalOpen= false;
  }
  getModalOpenBoolean() {
    return this.modalOpen;   
}

}

