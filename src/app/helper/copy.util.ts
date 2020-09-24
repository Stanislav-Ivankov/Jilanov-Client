export class CopyUtil {
	static deepCopy<T>(obj: any): T {
		return Object.assign({}, obj);
	}
}