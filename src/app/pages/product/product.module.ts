import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxImageZoomModule } from 'ngx-image-zoom';



import { ProductComponent } from '../product/product.component';

const Routes_Array: Routes = [
	{ path: '', component: ProductComponent }
];

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule,
		TranslateModule,
		NgxImageZoomModule,
		RouterModule.forChild(Routes_Array)
	],
	declarations: [
		ProductComponent
	],
	exports: [
		ProductComponent,

	]
})

export class ProductModule {}