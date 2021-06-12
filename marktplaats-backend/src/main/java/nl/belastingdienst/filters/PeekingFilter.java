package nl.belastingdienst.filters;

import org.slf4j.Logger;

import javax.inject.Inject;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.PreMatching;
import javax.ws.rs.ext.Provider;

@Provider @PreMatching
public class PeekingFilter implements ContainerRequestFilter {
    @Inject
    Logger log;

    @Override
    public void filter(ContainerRequestContext containerRequestContext) {
        log.debug("Backend received incoming " + containerRequestContext.getMethod() + " request.");

    }
}
