import {Injectable} from '@angular/core';
import {AdvertentieModel} from '../../models/advertentie.model';
import {Gebruiker} from '../../models/gebruiker';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Hoofdcategorie} from '../../models/hoofdcategorie';
import {Categorie} from '../../models/categorie';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class AdvertentieService {
  private url = 'http://localhost:9080/marktplaats/api/advertenties';
  private advertentieSubject = new Subject<AdvertentieModel[]>();
  // tslint:disable-next-line:variable-name
  private _soorten$ = new Subject<string[]>();
  // tslint:disable-next-line:variable-name
  private _hoofdcategorieen$ = new Subject<Hoofdcategorie[]>();
  // tslint:disable-next-line:variable-name
  private _categorieen$ = new Subject<Categorie[]>();

  constructor(private http: HttpClient) {
  }
  get soorten$(): Subject<string[]> {
    return this._soorten$;
  }
  get hoofdcategorieen$(): Subject<Hoofdcategorie[]> {
    return this._hoofdcategorieen$;
  }
  get categorieen$(): Subject<Categorie[]> {
    return this._categorieen$;
  }
  getAdvertenties(s?: string, h?: string, c?: string): Subject<AdvertentieModel[]>{
    let url: string;
    if (s === undefined || s === '' || s === 'Alle' || h === undefined || h === '' || h === 'Alle' || c === undefined || c === '' || c === 'Alle') {
      url = this.url;
    } else {
      url = this.url + '?soort=' + s + '&hoofdcategorie=' + h + '&categorie=' + c;
    }
    // if (s === '' || s === undefined) {
    //   url = url + '?soort=' + 'Alle';
    // } else {
    //   url = url + '?soort=' + s;
    // }
    // if (h === '' || h === undefined) {
    //   url = url + '&hoofdcategorie=' + 'Alle';
    // } else {
    //   url = url + '&hoofdcategorie=' + h;
    // }
    // if (c === '' || c === undefined) {
    //   url = url + '&categorie=' + 'Alle';
    // } else {
    //   url = url + '&categorie=' + c;
    // }
    this.http.get<AdvertentieModel[]>(url)
      .subscribe(
        ad => this.advertentieSubject.next(ad)
      );
    return this.advertentieSubject;
  }

  addAdvertentie(advertentie: AdvertentieModel){
      this.http.post<Gebruiker>(this.url, advertentie, httpOptions).subscribe(() => this.getAdvertenties());
    }
  getSoorten(): void {
    this.http.get<string[]> (this.url + '/soorten')
      .subscribe(
        soorten => this._soorten$.next(soorten)
      );
  }
  getHoofdcategorieen(): void {
    this.http.get<Hoofdcategorie[]> (this.url + '/hoofdcategorieen')
      .subscribe(
        hoofdcategorieen => this._hoofdcategorieen$.next(hoofdcategorieen)
      );
  }
  getCategorieen(hoofdcategorie: string): void {
    this.http.get<Categorie[]> (this.url + '/categorieen?hoofdcategorie=' + hoofdcategorie)
      .subscribe(
        categorieen => this._categorieen$.next(categorieen)
      );
  }
}




