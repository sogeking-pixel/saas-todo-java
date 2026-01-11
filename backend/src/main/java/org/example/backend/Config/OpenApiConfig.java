package org.example.backend.Config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
    info = @Info(
        contact = @Contact(
                name = "Yerson Sanchez :/",
                email = "sanchezleivayerson@gmail.com",
                url = "https://yerson.dev"
        ),
        description = "Documentación oficial del Backend SaaS Multi-tenant",
        title = "SaaS API - Todo App",
        version = "1.0",
        license = @License(
                name = "Yerson Sanchez",
                url = "https://yerson.dev"
        ),
        termsOfService = "Terminos de servicio"
    ),
    servers = {
        @Server(
                description = "Entorno Local",
                url = "http://localhost/api"
        )
    },
    security = {
        @SecurityRequirement(
                name = "bearerAuth"
        )
    }
)
@SecurityScheme(
        name = "bearerAuth",
        description = "JWT auth description",
        scheme = "bearer",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        in = SecuritySchemeIn.HEADER
)
public class OpenApiConfig {
}
