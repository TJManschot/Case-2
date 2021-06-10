import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Gebruiker} from '../models/gebruiker';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InlogService {

  serverUrl = 'http://localhost:9080/marktplaats/api';
  uri = this.serverUrl + '/gebruikers/login';
  // tslint:disable-next-line:variable-name
  private _message$ = new Subject<string>();
  // tslint:disable-next-line:variable-name
  private _gebruiker: Gebruiker;

  constructor(private http: HttpClient) {
  }

  get message$(): Subject<string> {
    return this._message$;
  }
  get gebruiker(): Gebruiker {
    return this._gebruiker;
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
    this.message$.next(`Gebruiker ${gebruiker.gebruikersnaam} is ingelogd.`);
    console.log(`Gebruiker ${gebruiker.gebruikersnaam} is ingelogd.`);
    this._gebruiker = gebruiker;
  }
  handleError(response: HttpErrorResponse) {
    this.message$.next('Statuscode: ' + response.status + '\nFoutmelding: ' + response.error);
    console.log('Statuscode: ' + response.status + '\nFoutmelding: ' + response.error);
  }
}
