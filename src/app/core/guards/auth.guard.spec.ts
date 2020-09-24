import { TestBed, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';

describe('Auth Guard', () => {

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			providers: [AuthGuard],
		});
	});

	it('Should ...', inject([AuthGuard], (guard: AuthGuard) => {

		expect(guard).toBeTruthy();
	}));

});