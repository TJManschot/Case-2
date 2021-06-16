package nl.belastingdienst.database;

import nl.belastingdienst.model.Advertentie;
import nl.belastingdienst.model.Categorie;
import nl.belastingdienst.model.Hoofdcategorie;
import nl.belastingdienst.model.Soort;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Stateless
public class AdvertentieDaoImpl implements AdvertentieDao {

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<Advertentie> get(){
        return em
                .createQuery("select ad from Advertentie ad", Advertentie.class)
                .getResultList();
    }

    @Override
    public void add(Advertentie advertentie) {
        em.persist(advertentie);
    }

    @Override
    public List<Soort> getSoorten() {
        return List.of(Soort.values());
    }

    @Override
    public List<Hoofdcategorie> getHoofdcategorieen() {
        return em.createQuery("SELECT c FROM Hoofdcategorie c", Hoofdcategorie.class).getResultList();
    }

    @Override
    public List<Categorie> getCategorieen(String hoofdcategorie) {
        return em.createQuery("SELECT c FROM Categorie c WHERE c.hoofdcategorie.naam = :h", Categorie.class)
                .setParameter("h", hoofdcategorie)
                .getResultList();
    }
}
