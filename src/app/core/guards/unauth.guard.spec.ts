import { TestBed, async, inject } from '@angular/core/testing';

import { UnauthGuard } from './unauth.guard';

describe('Unauth Guard', () => {

	beforeEach(() => {

		TestBed.configureTestingModule({
			providers: [UnauthGuard]
		});
	});

	it('Should ...', inject([UnauthGuard], (guard: UnauthGuard) => {

		expect(guard).toBeTruthy();
	}));

});