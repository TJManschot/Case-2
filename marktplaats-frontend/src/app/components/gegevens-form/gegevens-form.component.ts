import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InlogService} from '../../services/inlog/inlog.service';
import {Gebruiker} from '../../models/gebruiker';
import {GebruikerService} from '../../services/gebruiker/gebruiker.service';

@Component({
  selector: 'app-gegevens-form',
  templateUrl: './gegevens-form.component.html',
  styleUrls: ['./gegevens-form.component.css']
})
export class GegevensFormComponent implements OnInit {

  gebruikerForm: FormGroup;
  gebruiker: Gebruiker;

  constructor(private inlogService: InlogService,
              private fb: FormBuilder,
              private gebruikerService: GebruikerService) {
    this.inlogService.gebruiker$.subscribe(gebruiker => this.gebruiker = gebruiker);
  }

  ngOnInit(): void {
    this.gebruikerForm = this.fb.group({
      gebruikersnaam: [''],
      email: ['', [Validators.email]],
      tempPassword: ['']
    });
  }

  wijzigGegevensGebruiker(){
    this.gebruikerService.patchGebruiker(this.gebruikerForm.value, this.gebruiker.gebruikersnaam);
  }

}
