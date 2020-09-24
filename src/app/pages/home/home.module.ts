import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { HomeComponent } from './home.component';



const ComponentRoutes: Routes = [
	{
		path: '',
		component: HomeComponent
	}
];



@NgModule({
	imports: [
		CommonModule,
		TranslateModule,
		RouterModule.forChild(ComponentRoutes)
	],
	declarations: [
		HomeComponent
	],
	exports: [
		HomeComponent
	],
})



export class HomeModule {}