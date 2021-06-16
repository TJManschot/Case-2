import {Component, OnInit} from '@angular/core';
import {AdvertentieModel} from '../../models/advertentie.model';
import {AdvertentieService} from '../../services/advertentie/advertentie.service';
import {Hoofdcategorie} from '../../models/hoofdcategorie';
import {Categorie} from '../../models/categorie';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-advertentie',
  templateUrl: './advertentie.component.html',
  styleUrls: ['./advertentie.component.css']
})
export class AdvertentieComponent implements OnInit {
  advertenties: AdvertentieModel[];
  keuzeForm: FormGroup;
  soorten: string[];
  hoofdcategorieen: Hoofdcategorie[];
  categorieen: Categorie[];

  constructor(private fb: FormBuilder,
              private ad: AdvertentieService) {
  }

  ngOnInit(): void {
    this.keuzeForm = this.fb.group({
      soort: [''],
      hoofdcategorie: [''],
      categorie: [{
        hoofdcategorie: {naam: ''}, naam: '',
      }],
    });
    this.ad.soorten$.subscribe(soorten => { soorten.unshift('Alle'); this.soorten = soorten; });
    this.ad.hoofdcategorieen$.subscribe(
      hoofdcategorieen => { hoofdcategorieen.unshift({naam: 'Alle'}); this.hoofdcategorieen = hoofdcategorieen; }
    );
    this.ad.categorieen$.subscribe(
      categorieen => { categorieen.unshift({hoofdcategorie: {naam: ''}, naam: 'Alle'}); this.categorieen = categorieen;}
    );
    this.getAdvertenties();

    this.getSoorten();
    this.getHoofdcategorieen();
    this.keuzeForm.controls.hoofdcategorie.valueChanges.subscribe(
      hoofdcategorie => {
        this.getCategorieen(hoofdcategorie);
      }
    );
  }

  getAdvertenties() {
    console.log(
      this.keuzeForm.value.soort +
      this.keuzeForm.value.categorie.hoofdcategorie.naam +
      this.keuzeForm.value.categorie.naam);
    this.ad.getAdvertenties(
      this.keuzeForm.value.soort,
      this.keuzeForm.value.categorie.hoofdcategorie.naam,
      this.keuzeForm.value.categorie.naam
    ).subscribe(
      ads => {
        this.advertenties = ads;
      });
  }
  getSoorten(): void {
    this.ad.getSoorten();
  }

  getHoofdcategorieen(): void {
    this.ad.getHoofdcategorieen();
  }

  getCategorieen(hoofdcategorie: string): void {
    this.ad.getCategorieen(hoofdcategorie);
  }
}
