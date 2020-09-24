import {
	PaginationParams,
	PageData,
	CustomQueryParamsParser,
	QueryParams,
	SortOrder,
	PageParams,
	SortParams,
	KnownQueryParams,
} from '../models/page';
import { Params } from '@angular/router';
import { NumberUtil } from './number.util';

export class PageUtil {
	private static readonly DEFAULT_SORT_ORDER = SortOrder.ASC;
	private static readonly DEFAULT_PAGE_NUM = 1;
	private static readonly DEFAULT_PAGE_SIZE = 10;

	static toPageParams<T, TF>(queryParams: QueryParams<TF>, pageData: PageData<T>): PageParams<T, TF> {
		return {
			items: pageData.items,
			filterParams: queryParams.custom,
			sortParams: PageUtil.toSortParams(queryParams, pageData),
			paginationParams: PageUtil.toPaginationParams(queryParams, pageData),
		};
	}

	private static toSortParams(queryParams: QueryParams<any>, pageData: PageData<any>): SortParams {
		return {
			sortBy: pageData.sortBy || queryParams.sortBy,
			sortOrder: pageData.sortOrder || queryParams.sortOrder,
		};
	}

	private static toPaginationParams(queryParams: QueryParams<any>, pageData: PageData<any>): PaginationParams {
		return {
			pageNumber: pageData.pageNumber || queryParams.pageNumber,
			pageSize: pageData.pageSize || queryParams.pageSize,
			totalItems: pageData.totalItems,
		};
	}

	static rawParamsToQueryParams<TF>(
		rawParams: Params,
		parser: CustomQueryParamsParser<TF>,
		customSortParams?: SortParams
	): QueryParams<TF> {
		return {
			sortBy: rawParams.sortBy || (customSortParams && customSortParams.sortBy),
			sortOrder: PageUtil.validSortOrderOrDefault(
				rawParams.sortOrder,
				(customSortParams && customSortParams.sortOrder) || PageUtil.DEFAULT_SORT_ORDER
			),
			pageNumber: PageUtil.validNumberOrDefault(rawParams.pageNumber, PageUtil.DEFAULT_PAGE_NUM),
			pageSize: PageUtil.validNumberOrDefault(rawParams.pageSize, PageUtil.DEFAULT_PAGE_SIZE),
			custom: parser(rawParams),
		};
	}

	static flattenQueryParams(queryParams: QueryParams<any>): any {
		const result = {};
		PageUtil.addIfExists(result, queryParams.pageNumber, KnownQueryParams.PAGE_NUMBER);
		PageUtil.addIfExists(result, queryParams.pageSize, KnownQueryParams.PAGE_SIZE);
		PageUtil.addIfExists(result, queryParams.sortOrder, KnownQueryParams.SORT_ORDER);
		PageUtil.addIfExists(result, queryParams.sortBy, KnownQueryParams.SORT_BY);
		if (queryParams.custom) {
			const customObjectKeys: string[] = Object.keys(queryParams.custom);
			for (const key of customObjectKeys) {
				result[key] = queryParams.custom[key];
			}
		}
		return result;
	}

	static flattenQueryParamsOrOld(oldQueryParams: any, newQueryParams: any) {
        let result = {
			pageNumber: 0
		} as any;
        try {
            result = JSON.parse(JSON.stringify(oldQueryParams));
        } catch(e) {};

		for (const name in newQueryParams) {
			if (KnownQueryParams.PAGE_NUMBER === name && newQueryParams.pageNumber) {
				result.pageNumber = PageUtil.validNumberOrOldOrDefault(result.pageNumber, newQueryParams.pageNumber, PageUtil.DEFAULT_PAGE_NUM);
			} else if (KnownQueryParams.PAGE_SIZE === name && newQueryParams.pageSize) {
				result.pageSize = PageUtil.validNumberOrOldOrDefault(result.pageSize, newQueryParams.pageSize, PageUtil.DEFAULT_PAGE_SIZE);
			} else if (KnownQueryParams.SORT_ORDER === name && newQueryParams.sortOrder) {
				result.sortOrder = PageUtil.validSortOrderOrDefault(newQueryParams.sortOrder, PageUtil.DEFAULT_SORT_ORDER);
			} else {
				result[name] = newQueryParams[name];
			}
		}

		return result;
	}

	private static validNumberOrOldOrDefault(oldNumber: number, newNumber: number, defaultNumber: number): number {
		if (NumberUtil.isValidPositiveInt(newNumber)) {
			return newNumber;
		} else {
			return NumberUtil.isValidPositiveInt(oldNumber) ? oldNumber : defaultNumber;
		}
	}

	private static validNumberOrDefault(num: number, defaultNum: number): number {
		return NumberUtil.isValidPositiveInt(num) ? num : defaultNum;
	}

	private static validSortOrderOrDefault(sortOrder: SortOrder, defaultSortOrder: SortOrder): SortOrder {
		if (SortOrder.ASC !== sortOrder && SortOrder.DESC !== sortOrder) {
			return defaultSortOrder;
		} else {
			return sortOrder;
		}
	}

	private static addIfExists(result: any, value: any, key: string): void {
		if (value) {
			result[key] = value;
		}
	}
}