import {Injectable} from '@angular/core';
import {Gebruiker} from "../models/gebruiker";
import {Adres} from "../models/adres";
import {Bezorgwijzen} from "../models/bezorgwijzen";

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
      bezorgwijze: [Bezorgwijzen.MAGAZIJN.toString(), Bezorgwijzen.VERSTUREN.toString()]
    }
  ];

  getGebruikers(): Gebruiker[] {
    return this.gebruikers;
  }

  addGebruiker(nieuweGebruiker: Gebruiker) {
    this.gebruikers.push(nieuweGebruiker);
  }
}
