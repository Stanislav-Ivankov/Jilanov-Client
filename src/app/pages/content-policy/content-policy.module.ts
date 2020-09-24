import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ContentPolicyComponent } from './content-policy.component';

const ComponentRoutes: Routes = [
	{ path: '', component: ContentPolicyComponent }
];

@NgModule({
	imports: [
		CommonModule,
		TranslateModule,
		RouterModule.forChild(ComponentRoutes)],
	declarations: [
		ContentPolicyComponent
	],
	exports: [
		ContentPolicyComponent
	]
})



export class ContentPolicyModule {}