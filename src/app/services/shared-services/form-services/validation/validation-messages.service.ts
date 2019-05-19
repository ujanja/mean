import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationMessagesService {

  constructor() { }

returnValidationMessages(){  
  const form_validation_messages = {
    'matchPlayDate': [
      { type: 'required', message: 'Match Play Date is required' },
      { type: 'dateInvalid', message: 'Date cannot be in the past!' }
    ],
    'HRvalue': [
      { type: 'required', message: 'Time is needed' },
      { type: 'min', message: 'Time error' },
      { type: 'max', message: 'Time Error' },
    ],
    'MINvalue': [
      { type: 'required', message: 'Time is needed' },
      { type: 'min', message: 'Time error' },
      { type: 'max', message: 'Time error' },
    ],
    'game_ID': [
      { type: 'required', message: 'Game ID is required' },
      { type: 'min', message: 'Game ID must be > 999 and < 10000' },
      { type: 'max', message: 'Game ID must be > 999 and < 10000' },
      { type: 'pattern', message: 'Game ID has to be a number' }
    ],
    'homeTeam': [
      { type: 'required', message: 'Home Team is required' },
      { type: 'areEqual', message: 'Home Team cannot be the same as Away Team' }
    ],
    'homeTeamOdds': [
      { type: 'required', message: 'Home Team Odds are required' },
      { type: 'pattern', message: 'Odds have to be a number' }
    ],
    'drawOutcomeOdds': [
      { type: 'required', message: 'Draw Outcome Odds are required' },
      { type: 'pattern', message: 'Odds have to be a number' },
    ],
    'awayTeam': [
      { type: 'required', message: 'Away Team is required' },
      { type: 'areEqual', message: 'Away Team cannot be the same as Home Team' }
    ],
    'awayTeamOdds': [
      { type: 'required', message: 'Away Team Odds are required' },
      { type: 'pattern', message: 'Odds have to be a number' },
    ],
    'addBalance': [
      { type: 'required', message: 'Required!' },
      { type: 'pattern', message: 'Balance to add has to be a number' },
    ],
    'addHousingRights': [
      { type: 'required', message: 'Required' },
      { type: 'pattern', message: 'Housing Rights to add has to be a number' },
    ],
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
