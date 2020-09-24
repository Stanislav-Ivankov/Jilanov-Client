import { Pipe, PipeTransform } from '@angular/core';  



@Pipe ({ 
	name: 'Discount' 
})



export class DiscountPipe implements PipeTransform {

	transform(price: number, discount: number): string {
		return ( price - price * discount / 100 ).toString();
	}
}