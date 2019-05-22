import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationMessagesService {

  constructor() { }

returnValidationMessages(){  
  const form_validation_messages = {
    'password': [
      { type: 'required', message: 'Required!' },
      { type: 'passwordMatch', message: 'Passwords do not match!' },
      { type: 'minlength', message: 'Password too short! Minimum length is 8 characters' },
    ],
    'username': [
      { type: 'required', message: 'Username required' },
      { type: 'minlength', message: 'Minimum length accepted is 7 characters' },
    ],
    'email': [
      { type: 'required', message: 'Email required' },
      
    ],
    'phoneOrEmail': [
      { type: 'required', message: 'Phone or email required' },
      
    ],
    }
    return form_validation_messages
}
}
