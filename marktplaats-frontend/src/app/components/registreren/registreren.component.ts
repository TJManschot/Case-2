import {Component, OnInit} from '@angular/core';
import {Gebruiker} from '../../models/gebruiker';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {GebruikerService} from '../../services/gebruiker/gebruiker.service';
import {Bezorgwijzen} from '../../models/bezorgwijzen';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './registreren.component.html',
  styleUrls: ['./registreren.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class SignupComponent implements OnInit {
  gebruikers: Gebruiker[] = [];
  bezorgwijzen = [];

  get ordersFormArray() {
    return this.gebruikerForm.controls.bezorgwijzen as FormArray;
  }
  ophalenChecked = false;

  // @ts-ignore
  gebruikerForm: FormGroup;
  adresForm: FormGroup | undefined;

  constructor(
    private fb: FormBuilder,
    private gebruikerService: GebruikerService
  ) {}


  ngOnInit(): void {
    this.gebruikerService.getGebruikers().subscribe(gebruikers => this.gebruikers = gebruikers);
    this.adresForm = this.fb.group({
      straatnaam: [''],
      huisnummer: [''],
      postcode: [''],
      stad: ['']
    });
    this.gebruikerForm = this.fb.group({
      gebruikersnaam: ['', [Validators.required, Validators.pattern('^[a-zA-Z -]+$')]],
      email: ['', [Validators.required, emailValidator]],
      adres: this.adresForm,
      bezorgwijzen: new FormArray([])
    });

    this.bezorgwijzen = this.getBezorgwijzen();
    this.addCheckboxes();
  }

  private addCheckboxes() {
    this.bezorgwijzen.forEach(() => this.ordersFormArray.push(new FormControl(false)));
  }

  getBezorgwijzen() {
    return Object.values(Bezorgwijzen);
  }


  updateState() {
    this.ophalenChecked = !this.ophalenChecked;
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


