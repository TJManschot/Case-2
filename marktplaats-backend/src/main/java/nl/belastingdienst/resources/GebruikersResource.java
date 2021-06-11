package nl.belastingdienst.resources;

import nl.belastingdienst.database.GebruikerDao;
import nl.belastingdienst.model.Gebruiker;
import org.slf4j.Logger;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("gebruikers")
public class GebruikersResource implements JsonResource {
    @Inject
    Logger log;

    @Inject
    GebruikerDao gebruikerDao;

    @GET
    public List<Gebruiker> get() {
        log.info("Gebruikers worden opgehaald ...");
        return gebruikerDao.get();
    }

    @POST
    public Gebruiker post(Gebruiker gebruiker) {
        log.info("Gebruiker " + gebruiker.getGebruikersnaam() + " wordt geregistreerd ...");
        gebruikerDao.add(gebruiker);
        return gebruiker;
    }

    @POST @Path("login")
    public Response login(Gebruiker input) {
        String gebruikersnaam = input.getGebruikersnaam();
        String wachtwoord = input.getWachtwoord();

        log.info("Gebruiker ophalen uit database ...");
        List<Gebruiker> gebruikerList = gebruikerDao.getByGebruikersnaam(gebruikersnaam);

        if(gebruikerList.size() == 0) {
            log.warn("Gebruiker niet gevonden!");
            return Response.status(401)
                    .type(MediaType.TEXT_PLAIN_TYPE)
                    .entity("De opgegeven gebruikersnaam werd niet gevonden.")
                    .build();
        }

        Gebruiker gebruiker = gebruikerList.get(0);

        if(!wachtwoord.equals(gebruiker.getWachtwoord())) {
            log.warn("Wachtwoord niet correct!");
            return Response.status(401)
                    .type(MediaType.TEXT_PLAIN_TYPE)
                    .entity("Het opgegeven wachtwoord is niet correct.")
                    .build();
        }

        log.info("Gebruiker inloggen ...");
        return Response.status(200)
                .type(MediaType.APPLICATION_JSON_TYPE)
                .entity(gebruiker)
                .build();
    }
}
