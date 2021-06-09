import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-adres-vragen',
  templateUrl: './adres-vragen.component.html',
  styleUrls: ['./adres-vragen.component.css']
})
export class AdresVragenComponent {
  @Input()
  adres: FormGroup | undefined;

  constructor() {
  }

}

