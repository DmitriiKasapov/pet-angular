import { ApplicationConfig, APP_INITIALIZER, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { SeedService } from './core/services/seed.service';

function initializeSeed(seed: SeedService): () => void {
  return () => seed.initialize();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeSeed,
      deps: [SeedService],
      multi: true,
    },
  ],
};
