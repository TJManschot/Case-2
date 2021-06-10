package nl.belastingdienst.model;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Gebruiker {

    @Id @GeneratedValue
    private long id;
    private String gebruikersnaam;
    private String wachtwoord;
    private String email;
    @Embedded
    private Adres adres;
    private boolean akkoordMetVoorwaarden;
    @ElementCollection
    private Set<Bezorgwijzen> bezorgwijzenSet;



    public Gebruiker() { }
    public Gebruiker(String gebruikersnaam, String wachtwoord) {
        this.gebruikersnaam = gebruikersnaam;
        this.wachtwoord = wachtwoord;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) { this.id = id; }

    public String getGebruikersnaam() {
        return gebruikersnaam;
    }

    public void setGebruikersnaam(String gebruikersnaam) {
        this.gebruikersnaam = gebruikersnaam;
    }

    public String getWachtwoord() {
        return wachtwoord;
    }

    public void setWachtwoord(String wachtwoord) {
        this.wachtwoord = wachtwoord;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Adres getAdres() {
        return adres;
    }

    public void setAdres(Adres adres) {
        this.adres = adres;
    }

    public boolean isAkkoordMetVoorwaarden() {
        return akkoordMetVoorwaarden;
    }

    public void setAkkoordMetVoorwaarden(boolean akkoordMetVoorwaarden) {
        this.akkoordMetVoorwaarden = akkoordMetVoorwaarden;
    }

    public Set<Bezorgwijzen> getBezorgwijzenSet() {
        return bezorgwijzenSet;
    }

    public void setBezorgwijzenSet(Set<Bezorgwijzen> bezorgwijzenSet) {
        this.bezorgwijzenSet = bezorgwijzenSet;
    }
}
