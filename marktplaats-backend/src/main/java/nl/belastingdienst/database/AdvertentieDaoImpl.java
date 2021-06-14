package nl.belastingdienst.database;

import nl.belastingdienst.model.Advertentie;

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
}
