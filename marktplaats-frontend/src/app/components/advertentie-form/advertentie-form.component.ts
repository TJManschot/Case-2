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
  private imgFile: string;

  constructor( private fb: FormBuilder,
               private ad: AdvertentieService) { }

  ngOnInit(): void {
    this.advertentieForm = this.fb.group({
      titel: [''],
      afbeelding: [''],
      omschrijving: [''],
      prijs: ['']
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

}
