import { NgForm, FormGroup, AbstractControl, FormControl, FormArray } from '@angular/forms';
import { IdAware } from '../models/id';

export class FormUtil {
	static isValid(form: NgForm | FormGroup): boolean {
		if (form.valid) {
			return true;
		} else {
			Object.keys(form.controls).forEach(key => form.controls[key].markAsTouched());
			return false;
		}
	}

	static isInvalidControl(form: FormGroup): (controlName: string) => boolean {
		return (controlName: string) => {
			const control: AbstractControl = form.get(controlName);
			return (control.dirty || control.touched) && !control.valid;
		};
	}

	static extractSelectedCheckboxValues<T>(formValues: any, actualValues: T[]): T[] {
		const chosen = [];
		for (let i = 0; i < formValues.length; i++) {
			if (formValues[i]) {
				chosen.push(actualValues[i]);
			}
		}
		return chosen;
	}

	static toBooleanFormControls(items: string[], selected: string[]): FormControl[] {
		const result: FormControl[] = [];
		for (const item of items) {
			const control = new FormControl(selected.indexOf(item) !== -1);
			result.push(control);
		}
		return result;
	}

	static control(form: FormGroup, name: string[] | string): AbstractControl {
		return form.get(name);
	}

	static showErrorFor(form: FormGroup, name: string[] | string, other?: boolean): boolean {
		const ctrl: AbstractControl = FormUtil.control(form, name);
		return ctrl.invalid && (ctrl.touched || ctrl.dirty || other);
	}

	static addCheckboxes(selected: string[], items: IdAware[], formArray: FormArray): void {
		for (const item of items) {
			const control = new FormControl(selected.indexOf(item.id) !== -1);
			formArray.push(control);
		}
	}
}