export interface IPagination{
    currentPage:number;
    pageSize:number;
    totalCount:number;
    totalPage:number

}

export class PaginatedResult<T>{
    items:T;
    currentPage:number;
    pageSize:number;
    totalCount:number;
    totalPage:number
}