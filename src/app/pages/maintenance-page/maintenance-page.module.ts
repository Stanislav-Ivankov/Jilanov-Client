import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { MaintenancePageComponent } from './maintenance-page.component';



const ComponentRoutes: Routes = [
	{ path: '', component: MaintenancePageComponent }
];



@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(ComponentRoutes)
	],
	declarations: [
		MaintenancePageComponent
	],
	exports: [
		MaintenancePageComponent
	]
})



export class MaintenancePageModule {}