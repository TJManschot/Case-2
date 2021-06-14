package nl.belastingdienst.security;

import io.jsonwebtoken.Jwts;
import org.slf4j.Logger;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.security.Key;

@ApplicationScoped
public class TokenValidator {
    @Inject
    TokenProvider tokenProvider;

    @Inject
    Logger log;

    public boolean valideer(String token) {
        Key key = tokenProvider.generateKey();

        try {
            Jwts.parser().setSigningKey(key).parseClaimsJws(token);
            log.info("Token is gevalideerd");
            return true;
        } catch (Exception e) {
            log.warn("Token is ongeldig!");
            return false;
        }
    }
}
