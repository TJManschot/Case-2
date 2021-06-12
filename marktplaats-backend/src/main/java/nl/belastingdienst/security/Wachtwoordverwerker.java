package nl.belastingdienst.security;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

@ApplicationScoped
public class Wachtwoordverwerker {
    @Inject
    EncryptionStrategy encryptor;

    public String versleutel(String wachtwoord) {
        return encryptor.encrypt(wachtwoord);
    }

    public boolean valideer(String wachtwoord, String hash) {
        return hash.equals(versleutel(wachtwoord));
    }

}
