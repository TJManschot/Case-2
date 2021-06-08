package nl.belastingdienst.database;

import nl.belastingdienst.model.Gebruiker;

import javax.ejb.Stateful;
import java.util.ArrayList;
import java.util.List;

@Stateful
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
    public Gebruiker add(Gebruiker gebruiker) {
        gebruikers.add(gebruiker);
        return gebruiker;
    }
}
