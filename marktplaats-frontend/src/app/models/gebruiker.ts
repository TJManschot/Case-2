import {Adres} from './adres';

export interface Gebruiker {
  id: number;
  gebruikersnaam: string;
  email: string;
  wachtwoord: string;
  akkoordMetVoorwaarden?: boolean;
  adres: Adres;

  // bezorgwijze: Bezorgwijze[];
}
