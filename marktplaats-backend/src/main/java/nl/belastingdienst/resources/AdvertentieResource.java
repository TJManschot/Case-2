package nl.belastingdienst.resources;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import nl.belastingdienst.database.AdvertentieDao;
import nl.belastingdienst.model.Advertentie;
import nl.belastingdienst.model.Categorie;
import nl.belastingdienst.model.Hoofdcategorie;
import nl.belastingdienst.model.Soort;
import org.slf4j.Logger;

import java.util.List;

@Path("advertenties")
public class AdvertentieResource implements JsonResource{
    @Inject
    Logger log;

    @Inject
    AdvertentieDao advertentieDao;

//    @GET
//    public List<Advertentie> get(){
//        log.info("Advertenties worden opgehaald ...");
//        return advertentieDao.get();
//    }

    @GET
    public List<Advertentie> get(
            @QueryParam("soort") String s,
            @QueryParam("hoofdcategorie") String h,
            @QueryParam("categorie") String c) {
        if (s != null && h != null && c != null) {
            log.info("Advertenties worden opgehaald met " + s + " " + h + " " + c);
            Soort soort = Soort.valueOf(s);
            Hoofdcategorie hoofdcategorie = new Hoofdcategorie();
            hoofdcategorie.setNaam(h);
            Categorie categorie = new Categorie();
            categorie.setHoofdcategorie(hoofdcategorie);
            categorie.setNaam(c);
            return advertentieDao.get(soort, categorie);
        } else {
            return advertentieDao.get();
        }
    }

    @POST
    public Advertentie post(Advertentie ad){
        log.info("Advertentie " + ad.getId() + " wordt geregistreerd ..." );
        advertentieDao.add(ad);
        return ad;
    }

    @GET @Path("soorten")
    public Response getSoorten() {
        return Response.status(200)
                .type(MediaType.APPLICATION_JSON_TYPE)
                .entity(advertentieDao.getSoorten())
                .build();
    }

    @GET @Path("hoofdcategorieen")
    public Response getHoofdcategorieen() {
        return Response.status(200)
                .type(MediaType.APPLICATION_JSON_TYPE)
                .entity(advertentieDao.getHoofdcategorieen())
                .build();
    }

    @GET @Path("categorieen")
    public Response getCategorieen(@QueryParam("hoofdcategorie") String hoofdcategorie) {
        return Response.status(200)
                .type(MediaType.APPLICATION_JSON_TYPE)
                .entity(advertentieDao.getCategorieen(hoofdcategorie))
                .build();
    }
}
