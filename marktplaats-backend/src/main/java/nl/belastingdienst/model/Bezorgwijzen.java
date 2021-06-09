package nl.belastingdienst.model;

public enum Bezorgwijzen {
    MAGAZIJN(false),
    OPHALEN(true),
    VERSTUREN(false),
    VERSTUREN_ONDER_REMBOURS(false);

    Bezorgwijzen(boolean verplichtAdres) {
        this.verplichtAdres = verplichtAdres;
    }
    private final boolean verplichtAdres;

    public boolean getVerplichtAdres() {
        return verplichtAdres;
    }
}
