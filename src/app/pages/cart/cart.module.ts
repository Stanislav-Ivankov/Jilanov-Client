import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { CartComponent } from './cart.component';

const ComponentRoutes: Routes = [
	{ path: '', component: CartComponent }
];

@NgModule({
	imports: [
		CommonModule,
		TranslateModule,
		RouterModule.forChild(ComponentRoutes)],
	declarations: [
		CartComponent
	],
	exports: [
		CartComponent
	]
})

export class CartModule {}