package nl.belastingdienst.database;

import nl.belastingdienst.model.Advertentie;
import nl.belastingdienst.model.Categorie;
import nl.belastingdienst.model.Hoofdcategorie;
import nl.belastingdienst.model.Soort;

import java.util.List;

public interface AdvertentieDao {
    List<Advertentie> get();
    List<Advertentie> get(Soort soort, Categorie categorie);
    void add(Advertentie advertentie);
    List<Soort> getSoorten();
    List<Hoofdcategorie> getHoofdcategorieen();
    List<Categorie> getCategorieen(String hoofdcategorie);
}
