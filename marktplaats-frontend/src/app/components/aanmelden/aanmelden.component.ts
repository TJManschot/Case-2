import {Component, OnInit, ViewChild} from '@angular/core';
import {Gebruiker} from "../../models/gebruiker";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ControlContainer,
  FormControl,
  FormArray
} from '@angular/forms';
import {GebruikerService} from "../../services/gebruiker.service";
import {AdresVragenComponent} from "../adres-vragen/adres-vragen.component";
import {newArray} from "@angular/compiler/src/util";

@Component({
  selector: 'app-signup',
  templateUrl: './aanmelden.component.html',
  styleUrls: ['./aanmelden.component.css']
})
export class SignupComponent implements OnInit {
  gebruikers: Gebruiker[] = [];

  thuisAfhalen: boolean = false;

  // @ts-ignore
  gebruikerForm: FormGroup
  adresForm: FormGroup | undefined;

  constructor(
    private fb: FormBuilder,
    private gebruikerService: GebruikerService
  ) {
  }


  ngOnInit(): void {
    this.gebruikers = this.gebruikerService.getGebruikers();
    this.adresForm = this.fb.group({
      straatnaam: [''],
      huisnummer: [''],
      postcode: [''],
      stad: ['']
    })
    this.gebruikerForm = this.fb.group({
      gebruikersnaam: ['', [Validators.required, Validators.pattern('^[a-zA-Z -]+$')]],
      email: ['', [Validators.required, emailValidator]],
      adres: this.adresForm
    })
    this.maakGebruikerForm();

  }

  public maakGebruikerForm (): void{


  }

  updateState() {
    this.thuisAfhalen = !this.thuisAfhalen;
  }

  addGebruiker() {
    this.gebruikerService.addGebruiker(this.gebruikerForm.value);
    console.log(this.gebruikerForm.value);
  }
}


function emailValidator(control: AbstractControl) {
  if (!control.value) {
    return null;
  }
  const regex = /^.+@.+\.[a-zA-Z]+$/;
  return regex.test(control.value) ? null : {email: {valid: false}};
}
