import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CaroselService } from '../../core/services/carousel.service';
import { TranslateHelperService } from '../../core/services/translate-helper.service';
import { ApiService } from '../../core/services/api.service';
import { Router } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { MetaService } from 'src/app/core/services/meta.service';



@Component({
	selector: 'Home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})



export class HomeComponent {

	slides: any = [];
	products: any = [];
	mobile = window.innerHeight + window.innerWidth < 2000;

	constructor(
		private metaService: MetaService,
		private carouselService: CaroselService,
		private productsService: ProductsService,
		private translateHelper: TranslateHelperService,
		private apiService: ApiService,
		private router: Router
	) {
		this.getSlides();

		metaService.setMeta({
			'title': 'Всичко за вашия компютър на най-конкурентни цени!',
			'twitter:title': 'Всичко за вашия компютър на най-конкурентни цени!',
			'og:title': 'Всичко за вашия компютър на най-конкурентни цени!',
		});
	}

	async getSlides() {
		this.slides = await this.carouselService.getSlides();
		this.productsService.getByListOfIds(this.slides.map((el) => el.productId)).then((el: any) => {
			this.slides = this.slides.map((slide) => {
				return {
					...slide,
					url: el.filter((product) => product._id === slide.productId)[0]?.url
				}
			})
		})
	}

	get getLanguage() {
		return this.translateHelper.getLanguageCode()
	}

	get getImageLink() {
		return this.apiService.getBaseUrl() + 'static/'
	}

	// COMPONENT DATA
	arrows: IArrow[] = [
		{
			slide: 'prev',
			class: 'Carousel-Control-Previous carousel-control-prev',
			icon: './assets/images/HomeComponent/Previous.svg'
		},
		{
			slide: 'next',
			class: 'Carousel-Control-Next carousel-control-next',
			icon: './assets/images/HomeComponent/Next.svg'
		}
	];

	categories: ICategory[] = [
		{
			accordion: 'inventory',
			heading: 'inventory',
			target: `#collapse-${ 'inventory' }`,
			label: 'inventory',
			parent: `#${ 'inventory' }`,
			collapse: `collapse-${ 'inventory' }`,
			subCategories: [
				{
					route: 'category/desktop-computers',
					icon: './assets/images/HomeComponent/Desktop Computers.svg',
					label: 'desktop computers'
				},
				{	route: 'category/workstation-computers',
					icon: './assets/images/HomeComponent/Workstation Computers.svg',
					label: 'workstation computers'
				},
				{
					route: 'category/laptops',
					icon: './assets/images/HomeComponent/Laptops.svg',
					label: 'laptops'
				},
				{
					route: 'category/security-cameras',
					icon: './assets/images/HomeComponent/Security Cameras.svg',
					label: 'security cameras'
				}
			]
		},
		{
			accordion: 'components',
			heading: 'components',
			target: `#collapse-${ 'components' }`,
			label: 'components',
			parent: `#${ 'components' }`,
			collapse: `collapse-${ 'components' }`,
			subCategories: [
				{
					route: 'category/processors',
					icon: './assets/images/HomeComponent/Processors.svg',
					label: 'processors'
				},
				{
					route: 'category/memories',
					icon: './assets/images/HomeComponent/Memories.svg',
					label: 'memories'
				},
				{
					route: 'category/storage-drives',
					icon: './assets/images/HomeComponent/Storage Drives.svg',
					label: 'storage drives'
				},
				{
					route: 'category/video-cards',
					icon: './assets/images/HomeComponent/Video Cards.svg',
					label: 'video cards'
				},
				{
					route: 'category/motherboards',
					icon: './assets/images/HomeComponent/Motherboards.svg',
					label: 'motherboards'
				}
			]
		},
		{
			accordion: 'laptop-spare-parts',
			heading: 'laptop-spare-parts',
			target: `#collapse-${ 'laptop-spare-parts' }`,
			label: 'laptop spare parts',
			parent: `#${ 'laptop-spare-parts' }`,
			collapse: `collapse-${ 'laptop-spare-parts' }`,
			subCategories: [
				{
					route: 'category/keyboards',
					icon: './assets/images/HomeComponent/Keyboards.svg',
					label: 'keyboards'
				},
				{
					route: 'category/spare-parts',
					icon: './assets/images/HomeComponent/Spare Parts.svg',
					label: 'spare Parts'
				}
			]
		},
		{
			accordion: 'consumables',
			heading: 'consumables',
			target: `#collapse-${ 'consumables' }`,
			label: 'consumables',
			parent: `#${ 'consumables' }`,
			collapse: `collapse-${ 'consumables' }`,
			subCategories: [
				{
					route: 'category/printers',
					icon: './assets/images/HomeComponent/Printers.svg',
					label: 'printers'
				},
				{
					route: 'category/inks',
					icon: './assets/images/HomeComponent/Inks.svg',
					label: 'inks'
				}
			]
		},
		{
			accordion: 'software',
			heading: 'software',
			target: `#collapse-${ 'software' }`,
			label: 'software',
			parent: `#${ 'software' }`,
			collapse: `collapse-${ 'software' }`,
			subCategories: [
				{
					route: 'category/operating-systems',
					icon: './assets/images/HomeComponent/Operating Systems.svg',
					label: 'operating systems'
				},
				{
					route: 'category/office-packages',
					icon: './assets/images/HomeComponent/Office Packages.svg',
					label: 'office packages'
				},
				{
					route: 'category/antivirus-software',
					icon: './assets/images/HomeComponent/Antivirus Software.svg',
					label: 'antivirus software'
				}
			]
		},
		{
			accordion: 'specialized-services',
			heading: 'specialized-services',
			target: `#collapse-${ 'specialized-services' }`,
			label: 'specialized services',
			parent: `#${ 'specialized-services' }`,
			collapse: `collapse-${ 'specialized-services' }`,
			subCategories: [
				{
					route: 'category/servers-administration',
					icon: './assets/images/HomeComponent/Servers.svg',
					label: 'servers administration'
				},
				{
					route: 'category/surveillance-systems',
					icon: './assets/images/HomeComponent/Surveillance Systems.svg',
					label: 'surveillance systems'
				},
				{
					route: 'category/networks',
					icon: './assets/images/HomeComponent/Networks.svg',
					label: 'networks'
				}
			]
		}
	];
}



// COMPONENT INTERFACES
interface IArrow {
	slide: string,
	class: string,
	icon: string
}

interface ICategory {
	accordion: string,
	heading: string,
	target: string,
	label: string,
	parent: string,
	collapse: string,
	subCategories: Array<ISubCategory>
}

interface ISlide {
	image: string,
	title: string,
	description: string,
	category: string,
	productId: string
}

interface ISubCategory{
	route: string,
	icon: string,
	label: string
}