import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideServiceWorker } from '@angular/service-worker';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { AuraCustom } from './shared/styles/aura-custom';
import { routes } from './app.routes';
import { httpInterceptor } from './core/interceptor/http.interceptor';
import { ConfirmationService } from 'primeng/api';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(
      withInterceptors([httpInterceptor])
    ),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
      }),
    ),
    provideAnimations(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: AuraCustom,
        options: {
          darkModeSelector: false,
          cssLayer: {
            name: 'primeng',
            order: 'tailwind-base, primeng, tailwind-utilities'
          }
        }
      }
    }),
    provideServiceWorker('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
    ConfirmationService
  ]
};
