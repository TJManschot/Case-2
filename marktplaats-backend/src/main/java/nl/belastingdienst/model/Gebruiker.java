package nl.belastingdienst.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Gebruiker {

    @Id @GeneratedValue
    long id;
    String gebruikersnaam;
    String wachtwoord;

    public Gebruiker() { }
    public Gebruiker(String gebruikersnaam, String wachtwoord) {
        this.gebruikersnaam = gebruikersnaam;
        this.wachtwoord = wachtwoord;
    }
}
