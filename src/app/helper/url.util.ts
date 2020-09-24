export class UrlUtil {
	static getUrlParts(url: string): string[] {
		return UrlUtil.filterNonEmpty(UrlUtil.getPlainUrl(url).split('/'));
	}

	static getPlainUrl(url: string): string {
		const nonEmptyUrlParts = UrlUtil.filterNonEmpty(url.split('?'));
		return 0 < nonEmptyUrlParts.length ? nonEmptyUrlParts[0] : '';
	}

	private static filterNonEmpty(values: string[]): string[] {
		const result: string[] = [];
		for (const value of values) {
			if ('string' !== typeof value || '' === value.trim()) {
				continue;
			}
			result.push(value);
		}

		return result;
	}
}