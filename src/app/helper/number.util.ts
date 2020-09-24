export class NumberUtil {
	static isValidPositiveInt(n: any) {
		return NumberUtil.isNumeric(n) && 1 <= n;
	}

	static isNumeric(n: any) {
		return isFinite(Number.parseInt(n, 10));
	}

	static rangeClosed(from: number, to: number) {
		const result = [];
		for (let i = from; i <= to; i++) {
			result.push(i);
		}

		return result;
	}
}