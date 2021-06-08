import {Component, OnInit} from '@angular/core';
import {Gebruiker} from "../../models/gebruiker";
import {FormGroup, FormBuilder, Validators, AbstractControl, NgForm} from '@angular/forms';
import {GebruikerService} from "../../services/gebruiker.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  gebruikers: Gebruiker[] = [];

  thuisAfhalen: boolean = false;
  nieuweGebruiker = {} as Gebruiker;
  toevoegenGebruikerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private gebruikerService: GebruikerService
  ) {
  }

  // ngOnInit(): void {
  //   this.gebruikers = this.gebruikerService.getGebruikers();
  // }

  ngOnInit(): void {
    this.gebruikers = this.gebruikerService.getGebruikers();

    this.toevoegenGebruikerForm = this.fb.group({
      voornaam: ['', [Validators.required, Validators.pattern('^[a-zA-Z -]+$')]],
      achternaam: ['', [Validators.required, Validators.pattern('^[a-zA-Z -]+$')]],
      email: ['', [Validators.required, emailValidator]],
      adres: this.fb.group({
        straatnaam: [''],
        huisnummer: [''],
        postcode: [''],
        stad: [''],
        provincie: ['']
      })
    });
  }

  updateState() {
    this.thuisAfhalen = !this.thuisAfhalen;
  }

  addGebruiker() {
    this.gebruikerService.addGebruiker(this.toevoegenGebruikerForm.value);
  }
}


function emailValidator(control: AbstractControl) {
  if (!control.value) {
    return null;
  }
  const regex = /^.+@.+\.[a-zA-Z]+$/;
  return regex.test(control.value) ? null : {email: {valid: false}};
}


//
//   addContact(form: NgForm) {
//     this.gebruikerService.addGebruiker(this.toevoegenGebruikerForm.value);
//     this.nieuweGebruiker = this.toevoegenGebruikerForm.value;
//     // this.nieuweGebruiker = {} as Gebruiker;
//     form.reset();
//   }
//
//
//
