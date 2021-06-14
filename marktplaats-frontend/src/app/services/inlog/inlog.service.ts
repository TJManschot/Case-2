import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Gebruiker} from '../../models/gebruiker';
import {ReplaySubject, Subject} from 'rxjs';
import {Inloggegevens} from '../../models/inloggegevens';

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

  login(inloggegevens: Inloggegevens): void {
    console.log(inloggegevens.gebruikersnaam + ' probeert in te loggen.');
    this.http.post<Gebruiker>(this.uri, inloggegevens, {
      observe: 'response',
      headers: new HttpHeaders()
        .set('Authorization',  `Basic ` + inloggegevens.gebruikersnaam + ':' + inloggegevens.wachtwoord)
    })
      .subscribe(
        response => this.handleHappyLogin(response),
        response => this.handleLoginError(response)
      );
  }
  handleHappyLogin(response: HttpResponse<Gebruiker>) {
    const gebruiker = response.body;
    console.log(`Gebruiker ${gebruiker.gebruikersnaam} is ingelogd.`);
    console.log(response);
    localStorage.setItem('Token', response.headers.get('Authorization').substring(7));
    this._loggedIn$.next(true);
    this._gebruiker$.next(gebruiker);
  }
  handleLoginError(response: HttpErrorResponse) {
    this.message$.next('Statuscode: ' + response.status + '\nFoutmelding: ' + response.error);
    console.log('Statuscode: ' + response.status + '; Foutmelding: ' + response.error);
  }
  loguit(): void {
    this.loggedIn$.next(false);
    localStorage.setItem('LoggedIn', 'false');
    console.log('Gebruiker uitgelogd.');
  }
}
