package nl.belastingdienst.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Hoofdcategorie {
    @Id
    private String naam;

    public String getNaam() {
        return naam;
    }

    public void setNaam(String naam) {
        this.naam = naam;
    }
}
