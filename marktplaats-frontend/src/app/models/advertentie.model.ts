import {Soort} from './soort';

export interface AdvertentieModel {
  id: number;
  titel: string;
  img: string;
  omschrijving: string;
  prijs: number;
  afbeelding: number[];
  soort: Soort;
  hoofdcategorie: string;
  categorie: string;
}
