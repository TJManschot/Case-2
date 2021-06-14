import {Injectable} from '@angular/core';
import {AdvertentieModel} from '../../models/advertentie.model';

@Injectable({
  providedIn: 'root'
})
export class AdvertentieService {
  private url = 'http://localhost:9080/marktplaats/api/gebruikers';

  private advertenties: AdvertentieModel[] = [
    {
      id: 0,
      titel: 'Cool Blue',
      omschrijving: 'Cool Blue Cameralenzen',
      img: 'https://cdn.frankwatching.com/app/uploads/2020/05/Coolblue_add-Message-Match.png',
      prijs: 9.99
    },
    {
      id: 1,
      titel: 'Anwb',
      omschrijving: 'Wegenwacht Nederland instap \nDeskundige pechhulp in Nederland',
      img: 'https://www.vormenvrij.nl/wp-content/uploads/bfi_thumb/advertentiewwamersfoort-njx9q8zxu8ze6hunua6jy0akl7wtzajl6id33ioi50.jpg',
      prijs: 45
    },
    {
      id: 2,
      titel: 'Google Advertenties',
      omschrijving: 'Nieuwe google advertenties',
      img: 'https://www.smartdata.agency/wp-content/uploads/nieuwe-google-advertenties.png',
      prijs: 60
    },
    {
      id: 3,
      titel: 'Jumbo Hallo laagste prijsgarantie',
      omschrijving: 'Dag boeren \nDag diversiteit \nDag weidevogels',
      img: 'https://graphicalert.com/wp-content/uploads/2017/04/Dagblad-De-Pers-Milieudefensie-Jumbo-melk-advertentie-campagne-graphic-alert-act-impact.jpg',
      prijs: 1.06
    },
    {
      id: 4,
      titel: 'Jumbo allerbeste supermarkt',
      omschrijving: 'Hebben we ook eens de hoogste prijs',
      img: 'https://www.rtlnieuws.nl/sites/default/files/styles/staand/public/content/images/2021/01/21/Schermafbeelding%202021-01-21%20om%2014.01.54.png?itok=99SBzAva',
      prijs: 1.06
    }
  ];

  constructor() {
  }


  getAdvertenties(): AdvertentieModel[] {
    return this.advertenties;
  }

  addAdvertentie(advertentie: AdvertentieModel){
    this.advertenties.push(advertentie);
  }
}




