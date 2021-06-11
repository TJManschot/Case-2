import {Injectable} from '@angular/core';
import {Gebruiker} from "../models/gebruiker";
import {Adres} from "../models/adres";
import {Bezorgwijzen} from "../models/bezorgwijzen";
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class GebruikerService {
  private url = 'http://localhost:9080/marktplaats/api/gebruikers';
  private gebruikerSubject = new Subject<Gebruiker[]>();

  constructor(private http: HttpClient) { }

  addGebruiker(nieuweGebruiker: Gebruiker){
    nieuweGebruiker = this.bezorgwijzenFix(nieuweGebruiker);
    this.http.post<Gebruiker>(this.url, nieuweGebruiker, httpOptions).subscribe(() => this.getGebruiker())
  }

  getGebruiker(): Observable<Gebruiker[]> {
    this.http.get<Gebruiker[]>(this.url).subscribe(gebruiker => {
      this.gebruikerSubject.next(gebruiker);
    });
    return this.gebruikerSubject;
  }

  adres: Adres = {
    straat: "Kees van Dongenpad",
    huisnummer: "59",
    postcode: "1112WZ",
    stad: "Diemen"
  };


  private gebruikers: Gebruiker[] = [
    {
      id: 0,
      gebruikersnaam: "Richardson",
      email: "jay.richardson@outlook.com",
      wachtwoord: "Wachtwoord",
      adres: this.adres,
      bezorgwijzen: [Bezorgwijzen.MAGAZIJN, Bezorgwijzen.VERSTUREN]
    }
  ];

  getGebruikers(): Gebruiker[] {
    return this.gebruikers;
  }

  // addGebruiker(nieuweGebruiker: Gebruiker) {
  //   nieuweGebruiker = this.bezorgwijzenFix(nieuweGebruiker);
  //   this.gebruikers.push(nieuweGebruiker);
  // }

  bezorgwijzenFix(g: Gebruiker) :Gebruiker {
    const bezorgwijzenArrayFix: Bezorgwijzen[] = [];
    if(g.bezorgwijzen[0].valueOf().toString() === "true"){
      bezorgwijzenArrayFix.push(Bezorgwijzen.MAGAZIJN)
    }
    if (g.bezorgwijzen[1].valueOf().toString() === "true"){
      bezorgwijzenArrayFix.push(Bezorgwijzen.OPHALEN)
    }
    if (g.bezorgwijzen[2].valueOf().toString() === "true"){
      bezorgwijzenArrayFix.push(Bezorgwijzen.VERSTUREN)
    }
    if (g.bezorgwijzen[3].valueOf().toString() === "true"){
      bezorgwijzenArrayFix.push(Bezorgwijzen.VERSTUREN_ONDER_REMBOURS)
    }
    g.bezorgwijzen = [];
    g.bezorgwijzen = bezorgwijzenArrayFix;
    return g;
  }
}
