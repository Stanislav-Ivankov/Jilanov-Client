import { Gender } from './gender';
import { IdAware } from './id';

export interface UserList extends IdAware {
	name: string;
	email: string;
	gender: Gender;
	lastName: string;
}

export interface User extends UserList {
	phone: string;
	address: string;
	birthDate: string;
	city: string;
	state: string;
	zipCode: string;
}