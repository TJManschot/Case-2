import {Postcode} from "./postcode";

export interface Adres {
  straat: string;
  huisnummer: number;
  postcode: Postcode;
  stad: string;
  provincie: string;
}
