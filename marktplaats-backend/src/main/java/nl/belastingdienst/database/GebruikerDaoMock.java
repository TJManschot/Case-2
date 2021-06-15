package nl.belastingdienst.database;

import nl.belastingdienst.model.Gebruiker;

import javax.ejb.Stateful;
import javax.enterprise.inject.Alternative;
import java.util.ArrayList;
import java.util.List;

@Stateful @Alternative
public class GebruikerDaoMock implements GebruikerDao {
    List<Gebruiker> gebruikers = new ArrayList<>();

    {
        gebruikers.add(new Gebruiker());
        gebruikers.add(new Gebruiker());
    }

    @Override
    public List<Gebruiker> get() {
        return gebruikers;
    }

    @Override
    public List<Gebruiker> getByGebruikersnaam(String gebruikersnaam) {
        List<Gebruiker> result = new ArrayList<>();

        for(Gebruiker gebruiker: gebruikers) {
            if (gebruikersnaam.equals(gebruiker.getGebruikersnaam())) {
                result.add(gebruiker);
            }
        }

        return result;
    }

//    @Override
//    public Gebruiker getGebruikerPassword(String gebruikersnaam) {
//        return null;
//    }

    @Override
    public void add(Gebruiker gebruiker) {
        gebruikers.add(gebruiker);
    }

    @Override
    public void patch(Gebruiker gebruiker) {

    }
}
