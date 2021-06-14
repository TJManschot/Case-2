package nl.belastingdienst.filters;

import nl.belastingdienst.security.Authorized;
import nl.belastingdienst.security.TokenValidator;
import nl.belastingdienst.security.Wachtwoordverwerker;

import javax.annotation.Priority;
import javax.inject.Inject;
import javax.ws.rs.NotAuthorizedException;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;

@Provider
@Authorized
@Priority(Priorities.AUTHORIZATION)
public class AuthorizationFilter implements ContainerRequestFilter {
    @Inject
    TokenValidator tokenValidator;

    @Override
    public void filter(ContainerRequestContext containerRequestContext) {
        String authorizationHeader = containerRequestContext.getHeaderString("Authorization");

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer "))
            throw new NotAuthorizedException("No correctly formatted authorization header found.");

        String token = authorizationHeader.substring(7);

        if (!tokenValidator.valideer(token)) {
            containerRequestContext.abortWith(
                    Response.status(401)
                            .type(MediaType.TEXT_PLAIN_TYPE)
                            .entity("Log in om toegang te krijgen.")
                            .build()
            );
        }
    }
}
