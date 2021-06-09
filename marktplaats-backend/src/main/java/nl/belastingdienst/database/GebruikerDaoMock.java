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
        gebruikers.add(new Gebruiker("Thomas", "pw"));
        gebruikers.add(new Gebruiker("Jay", "wachtwoord"));
    }

    @Override
    public List<Gebruiker> get() {
        return gebruikers;
    }

    @Override
    public void add(Gebruiker gebruiker) {
        gebruikers.add(gebruiker);
    }
}
