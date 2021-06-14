import {Injectable} from '@angular/core';
import {Gebruiker} from '../../models/gebruiker';
import {Adres} from '../../models/adres';
import {Bezorgwijzen} from '../../models/bezorgwijzen';
import {Observable, Subject} from 'rxjs';
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
  // tslint:disable-next-line:variable-name
  private _gebruikers$ = new Subject<Gebruiker[]>();

  constructor(private http: HttpClient) { }

  addGebruiker(nieuweGebruiker: Gebruiker){
    nieuweGebruiker = this.bezorgwijzenFix(nieuweGebruiker);
    this.http.post<Gebruiker>(this.url, nieuweGebruiker, httpOptions).subscribe(() => this.getGebruikers());
  }

  getGebruikers(): Observable<Gebruiker[]> {
    this.http.get<Gebruiker[]>(this.url).subscribe(gebruikers => {
      this._gebruikers$.next(gebruikers);
    });
    return this._gebruikers$;
  }

  get gebruikers(): Subject<Gebruiker[]> {
    this.getGebruikers();
    return this._gebruikers$;
  }

  // addGebruiker(nieuweGebruiker: Gebruiker) {
  //   nieuweGebruiker = this.bezorgwijzenFix(nieuweGebruiker);
  //   this.gebruikers.push(nieuweGebruiker);
  // }

  bezorgwijzenFix(g: Gebruiker): Gebruiker {
    const bezorgwijzenArrayFix: Bezorgwijzen[] = [];
    if (g.bezorgwijzen[0].valueOf().toString() === 'true'){
      bezorgwijzenArrayFix.push(Bezorgwijzen.MAGAZIJN);
    }
    if (g.bezorgwijzen[1].valueOf().toString() === 'true'){
      bezorgwijzenArrayFix.push(Bezorgwijzen.OPHALEN);
    }
    if (g.bezorgwijzen[2].valueOf().toString() === 'true'){
      bezorgwijzenArrayFix.push(Bezorgwijzen.VERSTUREN);
    }
    if (g.bezorgwijzen[3].valueOf().toString() === 'true'){
      bezorgwijzenArrayFix.push(Bezorgwijzen.VERSTUREN_ONDER_REMBOURS);
    }
    g.bezorgwijzen = [];
    g.bezorgwijzen = bezorgwijzenArrayFix;
    return g;
  }
}
