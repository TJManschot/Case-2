package nl.belastingdienst.model;

import javax.persistence.Embeddable;
import java.math.BigDecimal;

@Embeddable
public class Advertentie {
    private Long id;
    private String titel;
    private String img;
    private String omschrijving;
    private BigDecimal prijs;

}
