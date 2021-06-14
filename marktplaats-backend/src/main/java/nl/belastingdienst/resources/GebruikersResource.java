package nl.belastingdienst.resources;

import nl.belastingdienst.database.GebruikerDao;
import nl.belastingdienst.model.Gebruiker;
import nl.belastingdienst.security.Wachtwoordverwerker;
import nl.belastingdienst.utility.WachtwoordGenerator;
import org.slf4j.Logger;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
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

    @Inject
    Wachtwoordverwerker wachtwoordverwerker;

    @Inject
    WachtwoordGenerator wachtwoordGenerator;

    @GET
    public List<Gebruiker> get() {
        log.info("Gebruikers worden opgehaald ...");
        return gebruikerDao.get();
    }

    @POST
    public Gebruiker post(Gebruiker gebruiker) {
        log.info("Gebruiker " + gebruiker.getGebruikersnaam() + " wordt geregistreerd ...");
        gebruiker.setAkkoordMetVoorwaarden(true);
        gebruiker.setHash(wachtwoordGenerator.maakWachtwoord());
        log.info(wachtwoordGenerator.getWachtwoord());
        gebruikerDao.add(gebruiker);
        return gebruiker;
    }

    @POST @Path("login")
    public Response login(@HeaderParam("Authorization") String header) {
        if(!header.startsWith("Basic ") || !header.contains(":"))
            return Response.status(400)
                .type(MediaType.TEXT_PLAIN_TYPE)
                .entity("De Authorization-header is niet correct.")
                .build();

        String[] inloggegevens = header.substring(6).split(":");
        String gebruikersnaam = inloggegevens[0];
        String wachtwoord = inloggegevens[1];

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

        if(!wachtwoordverwerker.valideer(wachtwoord, gebruiker.getHash())) {
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
