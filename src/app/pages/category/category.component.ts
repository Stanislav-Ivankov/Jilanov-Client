import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { MetaService } from 'src/app/core/services/meta.service';
import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { TranslateHelperService } from 'src/app/core/services/translate-helper.service';

declare var $;

@Component({
	selector: 'Category',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.scss']
})

export class CategoryComponent {
	mobile = window.innerHeight + window.innerWidth < 2000;
	category: any = '';
	products: any = [];
	loading = true;

	constructor(
		private router: Router,
		private metaService: MetaService,
		private translate: TranslateHelperService,
		private categoryService: CategoriesService,
		private productsService: ProductsService
	) {
		router.events.subscribe((val) => {
			if(val instanceof NavigationEnd) {
				this.getCategory(this.router.url.split('/')[2].split('?')[0]);
				this.getProducts(this.router.url.split('/')[2]);
				let title = this.router.getCurrentNavigation().extras.state ? this.router.getCurrentNavigation().extras.state.title : this.getTitle();
				metaService.setMeta({
					'title': title + ' - Всичко за вашия компютър на най-конкурентни цени!',
					'twitter:title': title + ' - Всичко за вашия компютър на най-конкурентни цени!',
					'og:title': title + ' - Всичко за вашия компютър на най-конкурентни цени!',
				});
			}
		});
	}

	async getCategory(category) {
		await this.categoryService.getAll();
		this.category = this.categoryService.categories.filter((el) => el.products === category)[0].title[this.translate.getLanguageCode()];
	}

	async getProducts(category) {
		this.loading = true;
		this.products = (await this.productsService.getByCategory(category) as any);
		this.products = this.products.filter((el) => !el.hidden);
		for(let counter = 0; counter < this.products.length; counter++) {
			this.products[counter].statusContent = await this.getContent(this.products[counter].status);
		}
		if(!this.mobile) {
			setTimeout(() => {
				// Init popovers
				// TODO: FIX THIS
				// $('[data-toggle="popover"]').popover()
			}, 1000)
		}
		this.loading = false;
	}

	async getContent(status) {
		return await this.productsService.getContent(status);
	}

	getTitle() {
		let parts = this.router.url.split('/');
		switch(parts[parts.length - 1]) {
			case 'laptops':
				return 'Лаптопи';
			case 'computers':
				return 'Компютри';
			case 'security-cameras':
				return 'Видеонаблюдение';
			case 'hardware-components':
				return 'Хардуерни компоненти';
			case 'laptop-components':
				return 'Компоненти за лаптоп';
			case 'consumables':
				return 'Консумативи';
			case 'software-development':
				return 'Разработка на софтуер';	
			default:
				return 'Продукти'	
		}
	}
}