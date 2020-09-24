import { Location } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
	selector: 'Log-In',
	templateUrl: './log-in.component.html',
	styleUrls: ['./log-in.component.scss']
})



export class LoginComponent implements OnInit {

	constructor(private _formBuilderService: FormBuilder, private _locationService: Location) {}

	ngOnInit() {
		this.initializeLogInForm();
	}



	// COMPONENT METHODS
	goBack(): void {
		this._locationService.back();
	}

	submitLogInForm(): void {
		this.validateLogInForm();

		if(true == this.logInCredentials.isValid)
			console.log('Logged In !!!');
	}



	// COMPONENT DATA
	formFields: IFormField[] = [
		{
			class: 'E-Mail-Input input-group',
			icon: './assets/images/LoginComponent/Username.svg',
			type: 'email',
			autocomplete: 'email',
			placeholder: 'E - Mail',
			['Error-Class']: 'Error-E-Mail',
			['Error-Label']: ''
		},
		{
			class: 'Password-Input input-group',
			icon: './assets/images/LoginComponent/Password.svg',
			type: 'password',
			autocomplete: 'Current-Password',
			placeholder: 'Password',
			['Error-Class']: 'Error-Password',
			['Error-Label']: ''
		}
	];

	logInCredentials: ILogInCredential = {
		isValid: false,
		username: '',
		password: ''
	};

	logInOptions: ILogInOption[] = [
		{
			route: '#',
			icon: './assets/images/LoginComponent/Facebook.svg',
			class: 'Log-In-Options__Container__Facebook'
		},
		{
			route: '#',
			icon: './assets/images/LoginComponent/Google.svg',
			class: 'Log-In-Options__Container__Google'
		}
	];

	tabs: ITab[] = [
		{
			class: 'Tabs__Log-In',
			link: '#LOG-IN',
			icon: './assets/images/Log In.svg',
			label: 'Log In'
		},
		{
			class: 'Tabs__Sign-Up',
			link: '#SIGN-UP',
			icon: './assets/images/Sign Up.svg',
			label: 'Sign Up'
		}
	];

	logInForm: FormGroup;
	logInFormData: object = {};



	// UTILITY METHODS
	clearErrorLabel(field: string): void {
		field == 'E - Mail' ? this.formFields[0]["Error-Label"] = '' : this.formFields[1]["Error-Label"] = '';
	}

	getStatusOf(field: string): string {
		return this.logInForm.controls[field].status;
	}

	getValueOf(field: string): string | null {
		return this.logInForm.value[field];
	}

	initializeLogInForm(): void {

		this.formFields.forEach(( field, index ) => {
			if ( 0 == index )
				this.logInFormData[field.placeholder] = ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.email])];
			else
				this.logInFormData[field.placeholder] = ['', Validators.compose([Validators.required, Validators.minLength(7)])];
		});

		this.logInForm = this._formBuilderService.group(this.logInFormData);
	}

	setErrorLabel(field: string, label: string): void {
		field == 'E - Mail' ? this.formFields[0]["Error-Label"] = label : this.formFields[1]["Error-Label"] = label;
	}

	validateLogInForm(): boolean {
		if('VALID' == this.logInForm.status) {
			this.clearErrorLabel('E - Mail');
			this.clearErrorLabel('Password');
			this.logInCredentials.username = this.getValueOf('E - Mail');
			this.logInCredentials.password = this.getValueOf('Password');
			this.logInForm.reset();

			return this.logInCredentials.isValid = true;
		}
		else {
			if ('' == this.getValueOf('E - Mail') || null == this.getValueOf('E - Mail'))
				this.setErrorLabel('E - Mail', 'Please, Enter E - Mail');
			else if ('INVALID' == this.getStatusOf('E - Mail'))
				this.setErrorLabel('E - Mail', 'Please, Enter Valid E - Mail');
			else if ('VALID' == this.getStatusOf('E - Mail'))
				this.clearErrorLabel('E - Mail');

			if ('' == this.getValueOf('Password') || null == this.getValueOf('Password'))
				this.setErrorLabel('Password', 'Please, Enter Password');
			else if ('INVALID' == this.getStatusOf('Password'))
				this.setErrorLabel('Password', 'Please, Enter Longer Password');
			else if ('VALID' == this.getStatusOf('Password'))
				this.clearErrorLabel('Password');
		}

		this.logInCredentials.isValid = false;
		this.logInCredentials.username = this.logInCredentials.password = '';
	}
}



// COMPONENT INTERFACES
interface IFormField {
	class: string,
	icon: string,
	type: string,
	autocomplete: string,
	placeholder: string,
	['Error-Class']: string,
	['Error-Label']: string
}

interface ILogInCredential {
	isValid: boolean,
	username: string,
	password: string
}

interface ILogInOption {
	route: string,
	icon: string,
	class: string
}

interface ITab {
	class: string,
	link: string,
	icon: string,
	label: string
}