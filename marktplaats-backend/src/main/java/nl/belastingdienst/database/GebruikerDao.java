package nl.belastingdienst.database;

import nl.belastingdienst.model.Gebruiker;

import java.util.List;

public interface GebruikerDao {
    List<Gebruiker> get();
    Gebruiker add(Gebruiker gebruiker);
}
