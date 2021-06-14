package nl.belastingdienst.utility;

import net.bytebuddy.utility.RandomString;
import nl.belastingdienst.security.EncryptionStrategy;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class WachtwoordGenerator {
    String wachtwoord;

    public String maakWachtwoord(){

        this.wachtwoord = RandomString.make();

        String wachtwoordHash = new EncryptionStrategy().encrypt(this.wachtwoord);

        return wachtwoordHash;
    }

    public String getWachtwoord() {
        return wachtwoord;
    }
}
