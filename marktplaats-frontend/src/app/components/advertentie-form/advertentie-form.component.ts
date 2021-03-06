import { Component, OnInit } from '@angular/core';
import {AdvertentieModel} from '../../models/advertentie.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AdvertentieService} from '../../services/advertentie/advertentie.service';
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

  constructor( private fb: FormBuilder,
               private ad: AdvertentieService) { }

  ngOnInit(): void {
    this.advertentieForm = this.fb.group({
      titel: [''],
      afbeelding: [''],
      omschrijving: [''],
      prijs: [''],
      soort: [''],
      hoofdcategorie: [''],
      categorie: [{
        hoofdcategorie: {naam: ''}, naam: '',
      }],
    });
    this.ad.soorten$.subscribe(soorten => {
      if (soorten[0] !== 'Maak een keuze') {
        soorten.unshift('Maak een keuze');
      }
      this.soorten = soorten;
    });
    this.ad.hoofdcategorieen$.subscribe(
      hoofdcategorieen => {
        if (JSON.stringify(hoofdcategorieen[0]) !== '{"naam":"Maak een keuze"}') {
          hoofdcategorieen.unshift({naam: 'Maak een keuze'});
        }
        this.hoofdcategorieen = hoofdcategorieen;
      });
    this.ad.categorieen$.subscribe(categorieen => this.categorieen = categorieen);
    this.getSoorten();
    this.getHoofdcategorieen();
    this.advertentieForm.controls.hoofdcategorie.valueChanges.subscribe(
      hoofdcategorie => this.getCategorieen(hoofdcategorie)
    );
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
    this.advertentieForm.reset();
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
