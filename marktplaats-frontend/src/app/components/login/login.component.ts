import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {InlogService} from '../../services/inlog/inlog.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  gebruikersnaam = new FormControl('', Validators.required);
  wachtwoord = new FormControl('', Validators.required);
  message$: Subject<string>;

  constructor(private inlogService: InlogService) {
    this.message$ = this.inlogService.message$;
  }

  loginForm = new FormGroup({
    gebruikersnaam: this.gebruikersnaam,
    wachtwoord: this.wachtwoord
  });

  login(): void {
    this.inlogService.login(this.loginForm.value);
    this.loginForm.reset();
  }

}
