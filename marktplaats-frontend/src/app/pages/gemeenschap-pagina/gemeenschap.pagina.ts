import {Component, OnInit} from '@angular/core';
import {GebruikerService} from '../../services/gebruiker/gebruiker.service';
import {Gebruiker} from '../../models/gebruiker';

@Component({
  selector: 'app-gemeenschap-pagina',
  templateUrl: './gemeenschap.pagina.html'
})
// tslint:disable-next-line:component-class-suffix
export class GemeenschapPagina implements OnInit {
  // tslint:disable-next-line:variable-name
  private _gebruikers: Gebruiker[];
  constructor(private gebruikerService: GebruikerService) {
  }

  ngOnInit(): void {
    this.gebruikerService.gebruikers.subscribe(gebruikers => this._gebruikers = gebruikers);
  }
  get gebruikers(): Gebruiker[] {
    return this._gebruikers;
  }

}
