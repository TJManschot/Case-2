import { Component, OnInit } from '@angular/core';
import {AdvertentieModel} from '../../models/advertentie.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AdvertentieService} from '../../services/advertentie/advertentie.service';
import {Soort} from '../../models/soort';
import {Hoofdcategorie} from '../../models/hoofdcategorie';
import {Categorie} from '../../models/categorie';

@Component({
  selector: 'app-advertentie-form',
  templateUrl: './advertentie-form.component.html',
  styleUrls: ['./advertentie-form.component.css']
})
export class AdvertentieFormComponent implements OnInit {
  advertentie: AdvertentieModel;
  advertentieForm: FormGroup;
  private imgFile: string;
  soorten: string[];
  hoofdcategorieen: Hoofdcategorie[];
  categorieen: Categorie[];
  soortTekst = 'Soort';
  hoofdcategorieTekst = 'Hoofdcategorie';
  categorieTekst = 'Categorie';

  constructor( private fb: FormBuilder,
               private ad: AdvertentieService) { }

  ngOnInit(): void {
    this.ad.soorten$.subscribe(soorten => this.soorten = soorten);
    this.ad.hoofdcategorieen$.subscribe(hoofdcategorieen => this.hoofdcategorieen = hoofdcategorieen);
    this.ad.categorieen$.subscribe(categorieen => this.categorieen = categorieen);

    this.advertentieForm = this.fb.group({
      titel: [''],
      afbeelding: [''],
      omschrijving: [''],
      prijs: [''],
      soort: [''],
      categorie: [{
        hoofdcategorie: {naam: ''}, naam: '',
      }],
    });
  }

  onImageChange(e){
    const reader = new FileReader();

    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;

      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imgFile = reader.result as string;
        this.advertentieForm.patchValue({
          afbeelding: reader.result
        });
      };
    }
      }

  addAdvertentie(){
    this.ad.addAdvertentie(this.advertentieForm.value);
  }
  getSoorten(): void {
    this.ad.getSoorten();
  }
  getHoofdcategorieen(): void {
    this.ad.getHoofdcategorieen();
  }
  getCategorieen(): void {
    this.ad.getCategorieen();
  }
  kiesSoort(s: string): void {
    this.soortTekst = s.toString();
    this.advertentieForm.value.soort = s;
    console.log('Soort gekozen = ' + s);
  }
  kiesHoofdcategorie(h: Hoofdcategorie): void {
    this.hoofdcategorieTekst = h.naam;
    this.getCategorieen();
  }
  kiesCategorie(c: Categorie): void {
    this.categorieTekst = c.naam;
    this.advertentieForm.value.categorie.hoofdcategorie.naam = c.hoofdcategorie.naam;
    this.advertentieForm.value.categorie.naam = c.naam;
  }
}
