import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { ContactsComponent } from './contacts.component';

const ComponentRoutes: Routes = [
	{
		path: '', component: ContactsComponent
	}
];

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		TranslateModule,
		RouterModule.forChild(ComponentRoutes)
	],
	declarations: [
		ContactsComponent
	],
	exports: [
		ContactsComponent
	]
})



export class ContactsModule {}