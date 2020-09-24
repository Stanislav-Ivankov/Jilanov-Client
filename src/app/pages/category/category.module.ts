import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';



import { SortComponent } from './sort/sort.component';
import { FiltersComponent } from './filters/filters.component';
import { ProductsComponent } from '../category/products/products.component';
import { CategoryComponent } from './category.component';

const Routes_Array: Routes = [
	{ path: '', component: CategoryComponent }
];

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule,
		TranslateModule,
		RouterModule.forChild(Routes_Array)
	],
	declarations: [
		SortComponent,
		FiltersComponent,
		ProductsComponent,
		CategoryComponent
	],
	exports: [
		CategoryComponent
	]
})

export class CategoryModule {}