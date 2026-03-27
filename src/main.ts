import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { appConfig } from './app/app.config';
import { routes } from './app/app.routes';
import { App } from './app/app';
import { provideRouter } from '@angular/router';

// ✅ Add HttpClientModule to the providers during bootstrap
bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
provideHttpClient(),
  ]
})
.catch((err) => console.error(err));
