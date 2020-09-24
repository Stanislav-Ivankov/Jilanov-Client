import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';



import { OrderComponent } from './order.component';
import { ReactiveFormsModule } from '@angular/forms';

const Routes_Array: Routes = [
	{ path: '', component: OrderComponent }
];

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		TranslateModule,
		RouterModule.forChild(Routes_Array)
	],
	declarations: [
		OrderComponent
	],
	exports: [
		OrderComponent
	],
})

export class OrderModule {}