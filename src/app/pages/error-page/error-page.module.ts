import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';



import { ErrorPageComponent } from './error-page.component';



const ComponentRoutes: Routes = [
	{ path: '', component: ErrorPageComponent }
];



@NgModule({
	imports: [
		CommonModule,
		TranslateModule,
		RouterModule.forChild(ComponentRoutes)
	],
	declarations: [
		ErrorPageComponent
	],
	exports: [
		ErrorPageComponent
	]
})



export class ErrorPageModule {}