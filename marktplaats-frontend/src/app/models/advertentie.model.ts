import {Categorie} from './categorie';

export interface AdvertentieModel {
  id: number;
  titel: string;
  img: string;
  omschrijving: string;
  prijs: number;
  afbeelding: number[];
  soort: string;
  categorie: Categorie;
}
