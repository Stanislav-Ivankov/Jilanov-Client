import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateHelperService } from 'src/app/core/services/translate-helper.service';

const maxSum = 3000;

@Component({
	selector: 'Sort',
	templateUrl: './sort.component.html',
	styleUrls: ['./sort.component.scss']
})



export class SortComponent {

	@Input() products = [];

	Available_Promotion = true;
	Available_New_Product = true;
	bgnTranslation = 'лева';
	params = window.location.search.substr(1).split('&');
	lastMinValue = '150';
	lastMaxValue = '2100';

	constructor(
		private translate: TranslateHelperService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {
		this.getCurrencyTranslation();
	}

	async getCurrencyTranslation() {
		this.bgnTranslation = await this.translate.getTranslation('global:bgn');
	}

	Sort_Products(Criteria) {
		switch (Criteria.ID) {
			case 'promotions':
				console.log('Sort By : Promotions.');
				this.addParameters({
					sortBy: 'promotions'
				  })
				break;
			case 'price-ascending':
				console.log('Sort By : Price-Ascending.');
				this.addParameters({
					sortBy: 'priceAsc'
				  })
				break;

			case 'price-descending':
				console.log('Sort By : Price-Descending.');
				this.addParameters({
					sortBy: 'priceDesc'
				  })
				break;

			case 'new-products':
				console.log('Sort By : New-Products.');
				this.addParameters({
					sortBy: 'newProducts'
				  })
				break;
		}
	}

	Clear_Filters() {
		(document.querySelector(':checked') as any).checked = false;
		this.router.navigate(
			[], 
			{
			  relativeTo: this.activatedRoute
			});
	}

	addParameters(params) {
		this.router.navigate(
			[], 
			{
			  relativeTo: this.activatedRoute,
			  queryParams: params,
			  queryParamsHandling: 'merge'
			});
	}

	onMinMove(ev) {
		ev.target.value=Math.min(ev.target.value, ev.target.parentNode.childNodes[2].value-1);
		var value=(100/(parseInt(ev.target.max)-parseInt(ev.target.min)))*parseInt(ev.target.value)-(100/(parseInt(ev.target.max)-parseInt(ev.target.min)))*parseInt(ev.target.min);
		var children = ev.target.parentNode.childNodes[0].childNodes;
		children[2].style.left = value+'%';
		children[3].style.left = value+'%';
		children[5].style.left = value+'%';
		document.getElementById('minvalue').textContent = (maxSum * (value/100) ).toFixed(0) + ' ' + this.bgnTranslation;
		this.lastMinValue = (maxSum * (value/100) ).toFixed(0);
		setTimeout(() => {
			this.router.navigate(
				[], 
				{
				  relativeTo: this.activatedRoute,
				  queryParams: {
					minPrice: this.lastMinValue,
					maxPrice: this.lastMaxValue
				  },
				  queryParamsHandling: 'merge'
				});
		}, 1000)
	}

	onMaxMove(ev) {
		ev.target.value=Math.min(ev.target.value, ev.target.parentNode.childNodes[2].value-1);
		var value=(100/(parseInt(ev.target.max)-parseInt(ev.target.min)))*parseInt(ev.target.value)-(100/(parseInt(ev.target.max)-parseInt(ev.target.min)))*parseInt(ev.target.min);
		var children = ev.target.parentNode.childNodes[0].childNodes;
		children[2].style.right = (100-value)+'%';
		children[4].style.left = value+'%';
		children[6].style.left = value+'%';
		document.getElementById('maxvalue').textContent = (maxSum * (value/100) ).toFixed(0) + ' ' + this.bgnTranslation;
		this.lastMaxValue = (maxSum * (value/100) ).toFixed(0);
		setTimeout(() => {
			this.router.navigate(
				[], 
				{
				  relativeTo: this.activatedRoute,
				  queryParams: {
					minPrice: this.lastMinValue,
					maxPrice: this.lastMaxValue
				  },
				  queryParamsHandling: 'merge'
				});
		}, 1000)
	}

	Sort_Criteria = [
		{
			ID: 'promotions',
			Label: 'Promotions'
		},
		{
			ID: 'new-products',
			Label: 'New Products'
		},
		{
			ID: 'price-ascending',
			Label: 'Price Ascending'
		},
		{
			ID: 'price-descending',
			Label: 'Price Descending'
		},
	];
}