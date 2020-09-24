import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';


import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { LastSeenItemsComponent } from "./last-seen-items/last-seen-items.component";



import { DiscountPipe } from './pipes/discount.pipe';



@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		TranslateModule
	],
	providers: [
		DiscountPipe
	],
	declarations: [
		BreadcrumbsComponent,
		LastSeenItemsComponent,
		DiscountPipe
	],
	exports: [
		BreadcrumbsComponent,
		LastSeenItemsComponent,
		DiscountPipe
	]
})

export class SharedModule {}