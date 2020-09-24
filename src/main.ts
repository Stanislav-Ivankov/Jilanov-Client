import { environment } from './environments/environment';



import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';



import { AppServerModule } from './app/application.module';



if (environment.production)
	enableProdMode();



platformBrowserDynamic().bootstrapModule(AppServerModule).catch(error => console.error(error));