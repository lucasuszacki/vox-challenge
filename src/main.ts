import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appRouting } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';

bootstrapApplication(AppComponent, {
  providers: [
    appRouting,
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(ModalModule.forRoot()),
  ],
}).catch((err) => console.error(err));
