import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { ProfileComponent } from './profile.component';



const ComponentRoutes: Routes = [
	{ path: '', component: ProfileComponent }
];



@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(ComponentRoutes)
	],
	declarations: [
		ProfileComponent
	],
	exports: [
		ProfileComponent
	]
})



export class ProfileModule {}