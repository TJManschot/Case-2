package nl.belastingdienst.database;

import nl.belastingdienst.model.Gebruiker;

import java.util.List;

public interface GebruikerDao {
    List<Gebruiker> get();
    List<Gebruiker> getByGebruikersnaam(String gebruikersnaam);
    void add(Gebruiker gebruiker);
    void patch(Gebruiker gebruiker);
}
