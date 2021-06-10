package nl.belastingdienst.model;

import javax.persistence.Embeddable;

@Embeddable
public class Adres {
    private String straatnaam;
    private String huisnummer;
    private String postcode;
    private String stad;

    public String getStraatnaam() {
        return straatnaam;
    }

    public void setStraatnaam(String straat) {
        this.straatnaam = straat;
    }

    public String getHuisnummer() {
        return huisnummer;
    }

    public void setHuisnummer(String huisnummer) {
        this.huisnummer = huisnummer;
    }

    public String getPostcode() {
        return postcode;
    }

    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }

    public String getStad() {
        return stad;
    }

    public void setStad(String stad) {
        this.stad = stad;
    }
}
