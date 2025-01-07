import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { serverErrorInterceptor, jwtInterceptor } from './interceptors';

import { AuthModule } from '@auth0/auth0-angular';
import { environment } from '@env/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      AuthModule.forRoot({
          domain: environment.auth.domain,
          clientId: environment.auth.clientId,
          authorizationParams: {
              redirect_uri: window.location.origin,
              audience: environment.auth.audience,
          },
          httpInterceptor: {
              ...environment.httpInterceptor,
          },
      }),
  ),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(withInterceptors([serverErrorInterceptor, jwtInterceptor])),
  ]
};
