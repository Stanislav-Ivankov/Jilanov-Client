import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { AccountComponent } from './account.component';



const ComponentRoutes: Routes = [
	{ path: '', component: AccountComponent }
];



@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(ComponentRoutes)
	],
	declarations: [
		AccountComponent
	],
	exports: [
		AccountComponent
	]
})



export class AccountModule {}