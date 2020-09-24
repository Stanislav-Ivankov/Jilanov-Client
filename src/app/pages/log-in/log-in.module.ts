import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';



import { LoginComponent } from './log-in.component';



const ComponentRoutes: Routes = [
	{ path: '', component: LoginComponent }
];



@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forChild(ComponentRoutes)
	],
	declarations: [
		LoginComponent
	],
	exports: [
		LoginComponent
	]
})



export class LoginModule {}