import { Injectable, EventEmitter } from '@angular/core';
import { CartProductModel } from '../../models/cart-product.model'
import { ProductsService } from './products.service';

@Injectable()
export class CartService {

    items = []
    
    public itemsChange = new EventEmitter();
    
    constructor(
        private productsService: ProductsService
    ) { 
        let items = [];
        try {
            items = JSON.parse((localStorage.getItem('cart') || '[]'));
        } catch(e) {
            console.log('Items were unparsable');
        }
        if(items) {
            this.productsService.getByListOfIds(items.map((el) => el.id)).then((res: any) => {
                this.items = res.map((el) => {
                    let item = items.filter((item) => item.id === el._id)[0];
                    let amount = item.amount;
                    let extras = item.extras;
                    return {
                        ...el,
                        amount: amount,
                        totalPrice: el.price * amount,
                        selectedExtras: extras
                    }
                });
                this.itemsChange.emit(this.items);
            })
        }
        
    }

    public addCartItem(item, extras) {
        if(this.items.filter((el) => el._id === item._id)[0]) {
            return;
        }
        item.amount = 1;
        this.items.push(item);
        this.itemsChange.emit(this.items);
        localStorage.setItem('cart', JSON.stringify(this.items.map((el) => {
            return {
                id: el._id,
                amount: el.amount,
                extras: extras
            };
        })))
    }

    public removeCartItem(item) {
        this.items = this.items.filter((el) => el._id !== item._id)
        this.itemsChange.emit(this.items);
        localStorage.setItem('cart', JSON.stringify(this.items.map((el) => {
            return {
                id: el._id,
                amount: el.amount,
                extras: el.selectedExtras
            };
        })))
    }

    public changeCountCartItem(item, count) {
        this.items.push(item);
        this.itemsChange.emit(this.items);
    }

    public getCartItems() {
        return this.items;
    }

    public updateAmount(item, amount) {
        for(let counter = 0; counter < this.items.length; counter++) {
            if(this.items[counter]._id === item._id) {
                this.items[counter].amount = amount;
            }
        }
        localStorage.setItem('cart', JSON.stringify(this.items.map((el) => {
            return {
                id: el._id,
                amount: el.amount,
                extras: el.selectedExtras
            };
        })))
    }

    public empty() {
        this.items = [];
        localStorage.setItem('cart', '[]');
        this.itemsChange.emit(this.items);
    }
}