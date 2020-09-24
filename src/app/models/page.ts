import { Params } from '@angular/router';
import { Observable } from 'rxjs';

export class PageState {
	loading = false;
	texts: any;

	static withLoading(loading: boolean): PageState {
		const pageState = new PageState();
		pageState.loading = loading;
		return pageState;
	}
}

export enum SortOrder {
	DESC = 'DESC',
	ASC = 'ASC',
}

export enum KnownQueryParams {
	SORT_BY = 'sortBy',
	SORT_ORDER = 'sortOrder',
	PAGE_NUMBER = 'pageNumber',
	PAGE_SIZE = 'pageSize',
}

export interface PageData<T> {
	items: T[];
	totalItems: number;
	pageNumber: number;
	pageSize: number;
	sortBy: string;
	sortOrder: SortOrder;
}

export interface QueryParams<TF> {
	sortBy: string;
	sortOrder: SortOrder;
	pageNumber: number;
	pageSize: number;
	custom: TF;
}

export interface PaginationParams {
	pageNumber: number;
	pageSize: number;
	totalItems: number;
}

export interface SortParams {
	sortBy: string;
	sortOrder: SortOrder;
}

export interface PageParams<T, TF> {
	items: T[];
	filterParams: TF;
	sortParams: SortParams;
	paginationParams: PaginationParams;
}

export type CustomQueryParamsParser<TF> = (rawParams: Params) => TF;

export type PageDataLoader<T> = (flatParams: any) => Observable<PageData<T>>;

export type LoadingConsumer = (loading: boolean) => void;