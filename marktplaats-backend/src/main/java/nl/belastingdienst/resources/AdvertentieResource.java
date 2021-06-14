package nl.belastingdienst.resources;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;

import nl.belastingdienst.database.AdvertentieDao;
import nl.belastingdienst.model.Advertentie;
import org.slf4j.Logger;

import java.util.List;

@Path("advertenties")
public class AdvertentieResource implements JsonResource{
    @Inject
    Logger log;

    @Inject
    AdvertentieDao advertentieDao;

    @GET
    public List<Advertentie> get(){
        log.info("Advertenties worden opgehaald ...");
        return advertentieDao.get();
    }

    @POST
    public Advertentie post(Advertentie ad){
        log.info("Advertentie " + ad.getId() + " wordt geregistreerd ..." );
        advertentieDao.add(ad);
        return ad;
    }
}
