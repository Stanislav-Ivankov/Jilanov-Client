import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { CartService } from '../../core/services/cart.service';
import { Router } from '@angular/router';
import { TranslateHelperService } from '../../core/services/translate-helper.service';
import { ApiService } from '../../core/services/api.service';
import { MetaService } from 'src/app/core/services/meta.service';



@Component({
	selector: 'Cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss']
})



export class CartComponent {

	// COMPONENT DATA
	items = [];
	itemsCopy = [];

	constructor(
		private router: Router,
		private metaService: MetaService,
		private apiService: ApiService,
		private location: Location,
		private cartService: CartService,
		private translateHelper: TranslateHelperService,
	) {
		this.getItems();
		cartService.itemsChange.subscribe((data) => {
			this.getItems();
		});

		metaService.setMeta({
			'title': 'Количка - Всичко за вашия компютър на най-конкурентни цени!',
			'twitter:title': 'Количка - Всичко за вашия компютър на най-конкурентни цени!',
			'og:title': 'Количка - Всичко за вашия компютър на най-конкурентни цени!',
		});
	}

	get getLanguage() {
		return this.translateHelper.getLanguageCode()
	}

	get getImageLink() {
		return this.apiService.getBaseUrl() + 'static/'
	}

	async getItems() {
		this.items = this.cartService.getCartItems();
		let aditionalExtras = [];
		this.items = this.items.map((el) => {
			let aditionalPrice = 0;
			for(let key in el.selectedExtras) {
				for(let counter = 0; counter < el.extras.length; counter++) {
					if(key === el.extras[counter]._id) {
						let extra = el.extras[counter].values.filter((val) => val._id === el.selectedExtras[key]);
						aditionalPrice += +extra[0].price;
						aditionalExtras.push(extra[0])
					}
				}
			}
			el.totalPrice = el.price + ((aditionalPrice ) * el.amount);
			return {
				...el,
				aditionalPrice,
				aditionalExtras
			}
		})
		this.itemsCopy = [...this.items];
	}

	// COMPONENT METHODS
	goBack(): void {
		this.location.back();
	}

	goOrder(): void {
		this.router.navigate(['orders']);
	}

	monitorTotalPrice(e, item): void {
		if(('Digit0' == e.code || 'Numpad0' == e.code) && 0 == e.target.value.charAt(0)) {
			e.preventDefault();
			item.totalPrice = '';
			e.target.classList.add('Form-Control-Invalid');
		}
		else if ('' == e.target.value) {
			item.totalPrice = '';
			e.target.classList.add('Form-Control-Invalid');
		}
		else {
			item.totalPrice = e.target.value * (item.price + item.aditionalPrice);
			this.cartService.updateAmount(item, e.target.value);
			e.target.classList.remove('Form-Control-Invalid');
		}
	}

	filter(event) {
		if(event.target.value.length) {
			this.itemsCopy = this.items.filter((el) => el.name.includes(event.target.value));
		} else {
			this.itemsCopy = this.items;
		}
	}

	removeItem(item) {
		this.cartService.removeCartItem(item);
	}
}