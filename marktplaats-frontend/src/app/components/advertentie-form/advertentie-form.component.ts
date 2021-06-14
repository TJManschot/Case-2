import { Component, OnInit } from '@angular/core';
import {AdvertentieModel} from '../../models/advertentie.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AdvertentieService} from '../../services/advertentie/advertentie.service';

@Component({
  selector: 'app-advertentie-form',
  templateUrl: './advertentie-form.component.html',
  styleUrls: ['./advertentie-form.component.css']
})
export class AdvertentieFormComponent implements OnInit {
  advertentie: AdvertentieModel;
  advertentieForm: FormGroup;

  constructor( private fb: FormBuilder,
               private ad: AdvertentieService) { }

  ngOnInit(): void {
    this.advertentieForm = this.fb.group({
      titel: [''],
      img: [''],
      omschrijving: [''],
      prijs: ['']
    });
  }

  addAdvertentie(){
    this.ad.addAdvertentie(this.advertentieForm.value);
  }

}
