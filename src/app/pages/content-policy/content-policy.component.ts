import { Component } from '@angular/core';
import { TranslateHelperService } from '../../core/services/translate-helper.service';
import { TranslateService } from '@ngx-translate/core';



@Component({
	selector: 'Content-Policy',
	templateUrl: './content-policy.component.html',
	styleUrls: ['./content-policy.component.scss']
})



export class ContentPolicyComponent {

	constructor(
		private translate: TranslateHelperService,
		private translateService: TranslateService
	) {
		this.translateService.onLangChange.subscribe(() => {
			this.translateLabels()
		});
		this.translateLabels();
	}

	async translateLabels() {
		this.title = await this.translate.getTranslation('global:content-policy')
		this.tabs[0].label = await this.translate.getTranslation('global:company-info');
		this.tabs[1].label = await this.translate.getTranslation('global:general-terms');
		this.tabs[2].label = await this.translate.getTranslation('global:quality-policy');
	}

	title = '';

	// COMPONENT DATA
	tabs: ITab[] = [
		{
			control: 'COMPANY-INFO',
			link: '#COMPANY-INFO',
			label: ''
		},
		{
			control: 'GENERAL-TERMS',
			link: '#GENERAL-TERMS',
			label: ''
		},
		{
			control: 'QUALITY-POLICY',
			link: '#QUALITY-POLICY',
			label: ''
		}
	];
}



// COMPONENT INTERFACES
interface ITab {
	control: string,
	link: string,
	label: string
}