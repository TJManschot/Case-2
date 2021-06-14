package nl.belastingdienst.database;

import nl.belastingdienst.model.Advertentie;

import java.util.List;

public interface AdvertentieDao {
    List<Advertentie> get();
    void add(Advertentie advertentie);
}
