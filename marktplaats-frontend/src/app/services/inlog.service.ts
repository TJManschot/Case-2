import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Gebruiker} from '../models/gebruiker';
import {ReplaySubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InlogService {

  serverUrl = 'http://localhost:9080/marktplaats/api';
  uri = this.serverUrl + '/gebruikers/login';
  // tslint:disable-next-line:variable-name
  private _message$ = new Subject<string>();
  // tslint:disable-next-line:variable-name
  private _gebruiker$ = new ReplaySubject<Gebruiker>(1);
  // tslint:disable-next-line:variable-name
  private _loggedIn$ = new Subject<boolean>();

  constructor(private http: HttpClient) {
  }

  get message$(): Subject<string> {
    return this._message$;
  }
  get gebruiker$(): Subject<Gebruiker> {
    return this._gebruiker$;
  }
  get loggedIn$(): Subject<boolean> {
    return this._loggedIn$;
  }

  login(gebruiker: Gebruiker): void {
    console.log(gebruiker.gebruikersnaam + ' probeert in te loggen.');
    this.http.post<Gebruiker>(this.uri, gebruiker)
      .subscribe(
        response => this.handleHappyLogin(response),
        response => this.handleLoginError(response)
      );
  }
  handleHappyLogin(gebruiker: Gebruiker) {
    console.log(`Gebruiker ${gebruiker.gebruikersnaam} is ingelogd.`);
    this._loggedIn$.next(true);
    this._gebruiker$.next(gebruiker);
  }
  handleLoginError(response: HttpErrorResponse) {
    this.message$.next('Statuscode: ' + response.status + '\nFoutmelding: ' + response.error);
    console.log('Statuscode: ' + response.status + '\nFoutmelding: ' + response.error);
  }
  loguit(): void {
    this.loggedIn$.next(false);
    console.log('Gebruiker uitgelogd.');
  }
}
