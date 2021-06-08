package nl.belastingdienst.model;

import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Gebruiker {

    @Id @GeneratedValue
    long id;
    String gebruikersnaam;
    String wachtwoord;
    String email;
    @Embedded
    Adres adres;
    boolean akkoordMetVoorwaarden;


    public Gebruiker() { }
    public Gebruiker(String gebruikersnaam, String wachtwoord) {
        this.gebruikersnaam = gebruikersnaam;
        this.wachtwoord = wachtwoord;
    }
}
