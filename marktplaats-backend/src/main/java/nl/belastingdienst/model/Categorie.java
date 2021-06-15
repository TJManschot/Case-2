package nl.belastingdienst.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Categorie {
    @Id
    private String naam;
    @Id @ManyToOne
    private Hoofdcategorie hoofdcategorie;

    public String getNaam() {
        return naam;
    }

    public void setNaam(String naam) {
        this.naam = naam;
    }

    public Hoofdcategorie getHoofdcategorie() {
        return hoofdcategorie;
    }

    public void setHoofdcategorie(Hoofdcategorie hoofdcategorie) {
        this.hoofdcategorie = hoofdcategorie;
    }
}
