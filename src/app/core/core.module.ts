import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { UnauthGuard } from './guards/unauth.guard';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { DateInterceptor } from './interceptors/date.interceptor';
import { DefaultHeadersInterceptor } from './interceptors/default-headers.interceptor';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { CaroselService } from './services/carousel.service';
import { CategoriesService } from './services/categories.service';
import { FiltersService } from './services/filters.service';
import { FooterLinksService } from './services/footer-links.service';
import { LoginService } from './services/login.service';
import { MessagesService } from './services/messages.service';
import { OrdersService } from './services/orders.service';
import { ProductsService } from './services/products.service';
import { CartService } from './services/cart.service';
import { LastSeenService } from './services/last-seen.service';
import { MetaService } from './services/meta.service';


export function HttpLoaderFactory(http: HttpClient) {

	return new TranslateHttpLoader(http);
}

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		ReactiveFormsModule,
		FormsModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient],
			},
		}),
		BrowserAnimationsModule,
		ToastrModule.forRoot({
			timeOut: 10000,
			positionClass: 'toast-bottom-right',
			preventDuplicates: true,
		}),
	],
	declarations: [],
	exports: [TranslateModule, CommonModule, HttpClientModule, ReactiveFormsModule, FormsModule],
	providers: [
		TranslateService,
		AuthService,
		AuthGuard,
		UnauthGuard,
		ApiService,
		CaroselService,
		CategoriesService,
		FiltersService,
		FooterLinksService,
		LoginService,
		MessagesService,
		OrdersService,
		ProductsService,
		CartService,
		LastSeenService,
		MetaService,
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: DefaultHeadersInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: DateInterceptor, multi: true },
	],
})
export class CoreModule {

	constructor(@Optional() @SkipSelf() parentModule: CoreModule) {

		if (parentModule) {
			throw new Error('CoreModule is already loaded. Import only in AppModule');
		}
	}
}