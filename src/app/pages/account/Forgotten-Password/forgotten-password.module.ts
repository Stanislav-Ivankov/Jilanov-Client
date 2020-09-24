import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { ForgottenPasswordComponent } from './forgotten-password.component';



const ComponentRoutes: Routes = [
	{ path: '', component: ForgottenPasswordComponent }
];



@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(ComponentRoutes)
	],
	declarations: [
		ForgottenPasswordComponent
	],
	exports: [
		ForgottenPasswordComponent
	]
})



export class ForgottenPasswordModule {}