import {Adres} from "./adres";

export interface Gebruiker {
  id: number;
  voornaam: string;
  achternaam: string;
  email: string;
  wachtwoord: string;
  akkoordMetVoorwaarde?: boolean;
  adres: Adres;

  // bezorgwijze: Bezorgwijze[];
}
