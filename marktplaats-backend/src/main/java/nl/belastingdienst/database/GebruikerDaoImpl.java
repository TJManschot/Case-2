package nl.belastingdienst.database;

import nl.belastingdienst.model.Gebruiker;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Stateless
public class GebruikerDaoImpl implements GebruikerDao {

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<Gebruiker> get() {
        return em
                .createQuery("SELECT g FROM Gebruiker g", Gebruiker.class)
                .getResultList();
    }

    @Override
    public List<Gebruiker> getByGebruikersnaam(String gebruikersnaam) {
        return em.createQuery("SELECT g FROM Gebruiker g WHERE g.gebruikersnaam =:input", Gebruiker.class)
                .setParameter("input", gebruikersnaam)
                .getResultList();
    }

//    @Override
//    public Gebruiker getGebruiker(String gebruikersnaam){
//        return em.createQuery("select g from Gebruiker g  where g.gebruikersnaam =:input", Gebruiker.class)
//                .setParameter("input", gebruikersnaam)
//                .getSingleResult();
//    }

    public void patch(Gebruiker gebruiker){
        em.merge(gebruiker);
    }

    @Override
    public void add(Gebruiker gebruiker) {
        em.persist(gebruiker);
    }
}
