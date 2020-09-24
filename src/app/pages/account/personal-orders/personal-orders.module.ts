import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { PersonalOrdersComponent } from './personal-orders.component';



const ComponentRoutes: Routes = [
	{ path: '', component: PersonalOrdersComponent }
];



@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(ComponentRoutes)
	],
	declarations: [
		PersonalOrdersComponent
	],
	exports: [
		PersonalOrdersComponent
	]
})

export class PersonalOrdersModule {}