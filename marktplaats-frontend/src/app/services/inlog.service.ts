import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Gebruiker} from '../models/gebruiker';

@Injectable({
  providedIn: 'root'
})
export class InlogService {

  serverUrl = 'http://localhost:9080/marktplaats/api';
  uri = this.serverUrl + '/gebruikers/login';

  constructor(private http: HttpClient) {
  }

  login(gebruiker: Gebruiker): void {
    console.log(gebruiker.gebruikersnaam + ' probeert in te loggen.');
    this.http.post<Gebruiker>(this.uri, gebruiker)
      .subscribe(
        response => this.handleHappy(response),
        response => this.handleError(response)
      );
  }
  handleHappy(gebruiker: Gebruiker) {
    console.log('De volgende gebruiker heeft zich succesvol aangemeld: ' + gebruiker.gebruikersnaam + '.');
    console.log(gebruiker);
  }
  handleError(response: HttpErrorResponse) {
    console.log('Statuscode ' + response.status);
    console.log(response.error);
  }
}
