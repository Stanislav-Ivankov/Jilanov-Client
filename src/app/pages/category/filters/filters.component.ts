import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';



@Component({
	selector: 'Filters',
	templateUrl: './filters.component.html',
	styleUrls: ['./filters.component.scss']
})



export class FiltersComponent {

	@Input() products = [];

	Filter_Form: FormGroup;

	constructor(private Form_Builder: FormBuilder) {

		  let Filter_Form_Data = {};

		  this.Categories.forEach((Category: any) => {
			  Category.Sub_Categories.forEach((Sub_Category: any) => {
				Filter_Form_Data[Sub_Category.Name] = '';
			});
		  });

		  this.Filter_Form = this.Form_Builder.group(Filter_Form_Data);
	}

	Clear_Filters() {
		this.Filter_Form.reset();
	}

	Submit() {
		console.log(this.Filter_Form);
	}

	Categories = [
		{
			Accordion_ID: 'Accordion-Price',
			Heading_ID: 'Heading-Price',
			Data_Target: '#Collapse-Price',
			Category_Name: 'Price',
			Div_ID: 'Collapse-Price',
			Data_Parent: '#Accordion-Price',
			Sub_Categories: [
				{
					Name: '350 BGN - 500 BGN'
				},
				{
					Name: '500 BGN - 1000 BGN'
				},
				{
					Name: '1000 BGN - 1500 BGN'
				},
				{
					Name: '1500 BGN - 2000 BGN'
				}
			]
		},
		{
			Accordion_ID: 'Accordion-Manufacturer',
			Heading_ID: 'Heading-Manufacturer',
			Data_Target: '#Collapse-Manufacturer',
			Category_Name: 'Manufacturer',
			Div_ID: 'Collapse-Manufacturer',
			Data_Parent: '#Accordion-Manufacturer',
			Sub_Categories: [
				{
					Name: 'ASUS'
				},
				{
					Name: 'ACER'
				},
				{
					Name: 'LENOVO'
				},
				{
					Name: 'DELL'
				}
			]
		},
		{
			Accordion_ID: 'Accordion-Screen-Size',
			Heading_ID: 'Heading-Screen-Size',
			Data_Target: '#Collapse-Screen-Size',
			Category_Name: 'Screen Size',
			Div_ID: 'Collapse-Screen-Size',
			Data_Parent: '#Accordion-Screen-Size',
			Sub_Categories: [
				{
					Name: '15.6 Inches'
				},
				{
					Name: '17.0 Inches'
				},
				{
					Name: '14.0 Inches'
				}
			]
		},
		{
			Accordion_ID: 'Accordion-Resolution',
			Heading_ID: 'Heading-Resolution',
			Data_Target: '#Collapse-Resolution',
			Category_Name: 'Resolution',
			Div_ID: 'Collapse-Resolution',
			Data_Parent: '#Accordion-Resolution',
			Sub_Categories: [
				{
					Name: 'HD Ready 1366x768'
				},
				{
					Name: 'Full HD 1920x1080'
				},
				{
					Name: 'Ultra HD 3840x2560'
				}
			]
		},
		{
			Accordion_ID: 'Accordion-Storage',
			Heading_ID: 'Heading-Storage',
			Data_Target: '#Collapse-Storage',
			Category_Name: 'Storage',
			Div_ID: 'Collapse-Storage',
			Data_Parent: '#Accordion-Storage',
			Sub_Categories: [
				{
					Name: '12O GB SSD @ 500 MBPS'
				},
				{
					Name: '240 GB SSD @ 500 MBPS'
				},
				{
					Name: '320 GB HDD @ 7200 RPM'
				},
				{
					Name: '500 GB HDD @ 5400 RPM'
				}
			]
		},
		{
			Accordion_ID: 'Accordion-RAM',
			Heading_ID: 'Heading-RAM',
			Data_Target: '#Collapse-RAM',
			Category_Name: 'RAM',
			Div_ID: 'Collapse-RAM',
			Data_Parent: '#Accordion-RAM',
			Sub_Categories: [
				{
					Name: '8 GB DDR4 @ 2333 MHz'
				},
				{
					Name: '16 GB DDR4 @ 3200 MHz'
				},
				{
					Name: '32 GB DDR4 @ 1666 MHz'
				}
			]
		},
		{
			Accordion_ID: 'Accordion-Processor',
			Heading_ID: 'Heading-Processor',
			Data_Target: '#Collapse-Processor',
			Category_Name: 'Processor',
			Div_ID: 'Collapse-Processor',
			Data_Parent: '#Accordion-Processor',
			Sub_Categories: [
				{
					Name: 'Intel Core i5'
				},
				{
					Name: 'Intel Core i7'
				},
				{
					Name: 'AMD Ryzen 3'
				},
				{
					Name: 'AMD Ryzen 5'
				},
				{
					Name: 'AMD Ryzen 7'
				}
			]
		},
		{
			Accordion_ID: 'Accordion-Video-Card',
			Heading_ID: 'Heading-Video-Card',
			Data_Target: '#Collapse-Video-Card',
			Category_Name: 'Video Card',
			Div_ID: 'Collapse-Video-Card',
			Data_Parent: '#Accordion-Video-Card',
			Sub_Categories: [
				{
					Name: 'NVIDIA GTX 1080 TI'
				},
				{
					Name: 'AMD RX VEGA'
				},
				{
					Name: 'INTEL HD Graphics'
				}
			]
		},
		{
			Accordion_ID: 'Accordion-Warranty',
			Heading_ID: 'Heading-Warranty',
			Data_Target: '#Collapse-Warranty',
			Category_Name: 'Warranty',
			Div_ID: 'Collapse-Warranty',
			Data_Parent: '#Accordion-Warranty',
			Sub_Categories: [
				{
					Type: 'radio',
					Name: '2 Years'
				},
				{
					Name: '3 Years'
				},
				{
					Name: '4 Years'
				}
			]
		}
	];
}