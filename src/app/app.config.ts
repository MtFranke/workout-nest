import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {httpTokenAuthInterceptor} from "./interceptors/token-auth.interceptor";
import {AuthService} from "./services/auth.service";
import {JwtHelperService, JwtModule} from "@auth0/angular-jwt";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    JwtHelperService, AuthService,
    provideHttpClient(withInterceptors([httpTokenAuthInterceptor])),
    importProvidersFrom(JwtModule.forRoot({}))
  ],
};
