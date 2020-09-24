import { CoreModule } from './core';
import { SharedModule } from './shared/shared.module';

import { CommonModule, Location } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule, Title, Meta } from '@angular/platform-browser';
// import {TranslateModule, TranslateLoader, TranslateService} from '@ngx-translate/core';

import { ApplicationComponent } from './application.component';
import { ApplicationRouter } from './application.routing';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { HttpClient } from '@angular/common/http';

// export function createTranslateLoader(http: HttpClient) {
// 	return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
// }

@NgModule({
	declarations: [
		ApplicationComponent
	],
	providers: [
		Location,
		SharedModule,
		Title,
		Meta
	],
	imports: [
		BrowserModule.withServerTransition({
			appId: 'ng-universal-demystified'
		}),
		ApplicationRouter,
		BrowserModule,
		CommonModule,
		CoreModule,
		SharedModule,
		// TranslateModule.forRoot({
		//   loader: {
		// 	provide: TranslateLoader,
		// 	useFactory: createTranslateLoader,
		// 	deps: [HttpClient]
		//   }
		// })
	],
	bootstrap: [
		ApplicationComponent
	]
})

export class AppServerModule {
	// constructor(
	//   private translate: TranslateService,
  
	// ) {
	//   this.translate.setDefaultLang('en');
	//   translate.use('en');
	// }
}