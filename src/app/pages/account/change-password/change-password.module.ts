import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { ChangePasswordComponent } from './change-password.component';



const ComponentRoutes: Routes = [
	{ path: '', component: ChangePasswordComponent }
];



@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(ComponentRoutes)
	],
	declarations: [
		ChangePasswordComponent
	],
	exports: [
		ChangePasswordComponent
	]
})



export class ChangePasswordModule {}