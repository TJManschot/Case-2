package nl.belastingdienst.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.slf4j.Logger;

import javax.crypto.spec.SecretKeySpec;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.security.Key;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@ApplicationScoped
public class TokenProvider {
    private static final long EXPIRATION_TIME_IN_MINUTES = 15L;

    @Inject
    Logger log;

    public String issueToken(String gebruikersnaam, String absolutePath) {
        Key key = generateKey();

        String token = Jwts.builder()
                .setSubject(gebruikersnaam)
                .setIssuer(absolutePath)
                .setIssuedAt(new Date())
                .setExpiration(
                        Date.from(
                                LocalDateTime.now().plusMinutes(EXPIRATION_TIME_IN_MINUTES)
                                .atZone(ZoneId.systemDefault()).toInstant()
                        ))
                .signWith(SignatureAlgorithm.HS512, key)
                .compact();

        log.info("Token " + token + " gegenereerd voor gebruiker " + gebruikersnaam + ".");
        return token;
    }

    Key generateKey() {
        byte[] key = "Spetter pieter pater, lekker in het water".getBytes();
        return new SecretKeySpec(key, 0, key.length, "DES");
    }
}
