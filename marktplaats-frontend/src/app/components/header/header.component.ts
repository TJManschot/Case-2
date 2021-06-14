import {Component, OnInit} from '@angular/core';
import {InlogService} from '../../services/inlog/inlog.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  private _loggedIn = false;

  get loggedIn(): boolean {
    return this._loggedIn;
  }

  constructor(private inlogService: InlogService) {
    inlogService.loggedIn$.subscribe(bool => this._loggedIn = bool);
  }

  ngOnInit(): void {
  }

}
