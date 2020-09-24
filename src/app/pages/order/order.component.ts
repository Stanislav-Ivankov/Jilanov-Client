import { Component } from '@angular/core';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { TranslateHelperService } from '../../core/services/translate-helper.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { OrdersService } from '../../core/services/orders.service';
import { ApiService } from '../../core/services/api.service';
import { MetaService } from 'src/app/core/services/meta.service';


@Component({
	selector: 'Order',
	templateUrl: './order.component.html',
	styleUrls: ['./order.component.scss']
})

export class OrderComponent {

	constructor(
		private metaService: MetaService,
		private apiService: ApiService,
		private location: Location,
		private router: Router,
		private cartService: CartService,
		private orderService: OrdersService,
		private translate: TranslateHelperService, 
		private translateHelper: TranslateHelperService,
	) {
		this.form = new FormGroup({
			name: new FormControl('', [Validators.required]),
			email: new FormControl('', [Validators.required, Validators.email]),
			phone: new FormControl('', [Validators.required, Validators.pattern("[0-9 ]{11}")]),
			city: new FormControl('', [Validators.required]),
			neighbourhood: new FormControl('', [Validators.required]),
			street: new FormControl('', [Validators.required]),
			address: new FormControl('', [Validators.required]),
			message: new FormControl(''),
		});

		this.setItems();
		cartService.itemsChange.subscribe((data) => {
			this.setItems();
		});

		metaService.setMeta({
			'title': 'Поръчка - Всичко за вашия компютър на най-конкурентни цени!',
			'twitter:title': 'Поръчка - Всичко за вашия компютър на най-конкурентни цени!',
			'og:title': 'Поръчка - Всичко за вашия компютър на най-конкурентни цени!',
		});
		
	}

	get getImageLink() {
		return this.apiService.getBaseUrl() + 'static/'
	}

	setItems() {
		this.items = this.cartService.getCartItems();
		let aditionalExtras = [];
		this.items = this.items.map((el) => {
			let aditionalPrice = 0;
			for(let key in el.selectedExtras) {
				for(let counter = 0; counter < el.extras.length; counter++) {
					if(key === el.extras[counter]._id) {
						aditionalExtras.push( el.extras[counter].values.filter((val) => val._id === el.selectedExtras[key])[0])
					}
				}
			}
			return {
				...el,
				aditionalExtras
			}
		})
		this.totalPrice = this.items.reduce(this.add, 0);
	}

	get getLanguage() {
		return this.translateHelper.getLanguageCode()
	}
	
	// COMPONENT METHODS
	goBack(): void {
		this.location.back();
	}

	async order() {
		let response: any = await this.orderService.post({
			...(this.form as FormGroup).value,
			items: this.items.map((el) => {
				return {
					count: el.amount,
					id: el._id,
					total: el.totalPrice,
					extras: el.aditionalExtras.map((extr) => {
						return {
							id: extr._id,
							price: extr.price
						};
					})
				}
			})
		})

		if (response._id) {
			let text = await this.translate.getTranslation('global:order-success');
			Swal.fire(
				'',
				text,
				'success'
			);
			this.router.navigate(['']);
			this.cartService.empty();
		} else {
			let text = await this.translate.getTranslation('global:order-failed');
			Swal.fire(
				'',
				text,
				'error'
			);
		}
	}
	
	add(accumulator, a) {
		return accumulator + a.totalPrice;
	}

	items = [];
	form: any = {};
	totalPrice = 0;
}