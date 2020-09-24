export class ArrayUtil {
	static move(arr: any[], fromIndex: number, toIndex: number): any[] {
		const result = [...arr];
		const element = result[fromIndex];
		result.splice(fromIndex, 1);
		result.splice(toIndex, 0, element);
		return result;
	}
}