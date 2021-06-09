import {Adres} from './adres';
import {Bezorgwijzen} from './bezorgwijzen';

export interface Gebruiker {
  id: number;
  gebruikersnaam: string;
  email: string;
  wachtwoord: string;
  akkoordMetVoorwaarden?: boolean;
  adres: Adres;
  bezorgwijze: string[];
}
