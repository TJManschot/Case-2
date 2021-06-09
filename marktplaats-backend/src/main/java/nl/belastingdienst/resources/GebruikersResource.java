package nl.belastingdienst.resources;

import nl.belastingdienst.database.GebruikerDao;
import nl.belastingdienst.model.Gebruiker;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import java.util.List;

@Path("gebruikers")
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

    @POST @Path("login")
    public void login(Gebruiker input) {
        String gebruikersnaam = input.getGebruikersnaam();
        String wachtwoord = input.getWachtwoord();

        System.out.println(gebruikersnaam + " " + wachtwoord);
        List<Gebruiker> resultaat = gebruikerDao.getByGebruikersnaam(gebruikersnaam);
        if (resultaat.size() == 1) {
            System.out.println(resultaat.get(0).getWachtwoord());
        }
    }
}
