declare const getComputedStyle;

export class ColorUtil {
	static primary(): string {
		return this.color('--primary');
	}

	static success(): string {
		return this.color('--success');
	}

	static secondary(): string {
		return this.color('--secondary');
	}

	private static color(colorType: string): string {
		// TODO: FIX THIS
		// return getComputedStyle(document.body).getPropertyValue(colorType).trim();
		return ''
	}
}