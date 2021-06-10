import {Component, OnInit} from '@angular/core';
import {InlogService} from '../../services/inlog.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  private _gebruikersnaam = '';
  get gebruikersnaam(): string {
    return this._gebruikersnaam;
  }
  constructor(private inlogService: InlogService) {
    this.inlogService.gebruiker$.subscribe(gebruiker => this._gebruikersnaam = gebruiker.gebruikersnaam);
  }

  ngOnInit(): void {
  }

}
