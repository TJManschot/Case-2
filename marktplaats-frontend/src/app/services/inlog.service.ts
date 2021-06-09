import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
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
    this.http.post<Gebruiker>(this.uri, gebruiker).subscribe(() => {});
    console.log(gebruiker.gebruikersnaam + ' ' + gebruiker.wachtwoord + ' ' + 'gepost op ' + this.uri);
  }
}
