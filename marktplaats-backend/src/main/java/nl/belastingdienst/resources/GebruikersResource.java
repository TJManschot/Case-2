package nl.belastingdienst.resources;

import nl.belastingdienst.database.GebruikerDao;
import nl.belastingdienst.model.Gebruiker;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import java.util.List;

public class GebruikersResource implements JsonResource {

    @Inject
    GebruikerDao gebruikerDao;

    @GET
    public List<Gebruiker> get() {
        return gebruikerDao.get();
    }

    @POST
    public Gebruiker post(Gebruiker gebruiker) {
        gebruikerDao.add(gebruiker);
        return gebruiker;
    }
}
