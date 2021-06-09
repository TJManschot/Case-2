import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {InlogService} from '../../services/inlog.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  gebruikersnaam = new FormControl('', Validators.required);
  wachtwoord = new FormControl('', Validators.required);

  constructor(private inlogService: InlogService) {
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
