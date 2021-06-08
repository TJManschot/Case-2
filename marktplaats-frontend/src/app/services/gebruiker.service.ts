import {Injectable} from '@angular/core';
import {Gebruiker} from "../models/gebruiker";
import {Adres} from "../models/adres";
import {Postcode} from "../models/postcode";
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GebruikerService {
  // private url = 'http://localhost:9080/rest/api/gebruikers';
  // private gebruikerSubject = new Subject<Gebruiker[]>();
  //
  // constructor(private http: HttpClient) { }
  //
  // addGebruiker(nieuweGebruiker: Gebruiker){
  //   this.http.post(this.url, nieuweGebruiker).subscribe(()=> this.getGebruiker())
  // }
  //
  // getGebruiker(): Observable<Gebruiker[]> {
  //   this.http.get<Gebruiker[]>(this.url).subscribe(gebruiker => {
  //     this.gebruikerSubject.next(gebruiker);
  //   });
  //   return this.gebruikerSubject;
  // }

  postcode: Postcode = {
    cijfers: 1112,
    letters: "WZ"
  }

  adres: Adres = {
    straat: "Kees van Dongenpad",
    huisnummer: 59,
    postcode: this.postcode,
    stad: "Diemen",
    provincie: "Noord-Holland"
  };


  private gebruikers: Gebruiker[] = [
    {
      id: 0,
      voornaam: "Jay",
      achternaam: "Richardson",
      email: "jay.richardson@outlook.com",
      wachtwoord: "Wachtwoord",
      adres: this.adres
    }
  ];

  getGebruikers(): Gebruiker[] {
    return this.gebruikers;
  }

  addGebruiker(nieuweGebruiker: Gebruiker) {
    this.gebruikers.push(nieuweGebruiker);
  }
}
