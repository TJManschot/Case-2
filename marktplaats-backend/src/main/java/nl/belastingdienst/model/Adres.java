package nl.belastingdienst.model;

import javax.persistence.Embeddable;

@Embeddable
public class Adres {
    String straat;
    String huisnummer;
    String postcode;
    String stad;
}
