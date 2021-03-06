package nl.belastingdienst.resources;

import nl.belastingdienst.database.GebruikerDao;
import nl.belastingdienst.model.Gebruiker;
import nl.belastingdienst.security.Authorized;
import nl.belastingdienst.security.EncryptionStrategy;
import nl.belastingdienst.security.TokenProvider;
import nl.belastingdienst.security.Wachtwoordverwerker;
import nl.belastingdienst.utility.WachtwoordGenerator;
import org.slf4j.Logger;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
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

    @Inject
    TokenProvider tokenProvider;

    @Context
    private UriInfo uriInfo;

    @GET @Authorized
    public List<Gebruiker> get() {
        log.info("Gebruikers worden opgehaald ...");
        return gebruikerDao.get();
    }

    @GET @Path("/{gebruikersnaam}")
    public Gebruiker getGebruiker(@PathParam("gebruikersnaam") String gebruikersnaam){
        log.info("Gebruiker wordt gezocht in database.");
        return gebruikerDao.getByGebruikersnaam(gebruikersnaam).get(0);
    }


    @PATCH @Path("/{gebruikersnaam}")
    public Gebruiker patch(@PathParam("gebruikersnaam") String gebruikersnaam, Gebruiker updateGebruiker){
        Gebruiker gebruiker = getGebruiker(gebruikersnaam);
        log.info("Gebruiker: " + gebruikersnaam + " wordt aangepast ... " );

        if(updateGebruiker.getGebruikersnaam() != null && !updateGebruiker.getGebruikersnaam().isBlank()){
            gebruiker.setGebruikersnaam(updateGebruiker.getGebruikersnaam());
        }
        if(updateGebruiker.getEmail() != null && !updateGebruiker.getEmail().isBlank()){
            gebruiker.setEmail(updateGebruiker.getEmail());
        }
        if(updateGebruiker.getTempPassword() != null && !updateGebruiker.getTempPassword().isBlank()){
            log.info("wachtwoord wordt gewijzigd");
            gebruiker.setHash(new EncryptionStrategy().encrypt(updateGebruiker.getTempPassword()));
            gebruiker.setTempPassword(null);
        } else {
            log.debug(updateGebruiker.getTempPassword());
        }

        gebruikerDao.patch(gebruiker);
        return gebruiker;
    }


    @POST
    public Gebruiker post(Gebruiker gebruiker) {
        log.info("Gebruiker " + gebruiker.getGebruikersnaam() + " wordt geregistreerd ...");
        gebruiker.setAkkoordMetVoorwaarden(true);
        gebruiker.setHash(wachtwoordGenerator.maakWachtwoord());
        log.info("Het wachtwoord is: " + wachtwoordGenerator.getWachtwoord());
        gebruiker.setTempPassword(wachtwoordGenerator.getWachtwoord());
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

        log.info("Token generen ...");
        String token = tokenProvider.issueToken(gebruikersnaam, uriInfo.getAbsolutePath().toString());

        log.info("Gebruiker inloggen ...");
        return Response.status(200)
                .type(MediaType.APPLICATION_JSON_TYPE)
                .header("Authorization", "Bearer " + token)
                .entity(gebruiker)
                .build();
    }
}
