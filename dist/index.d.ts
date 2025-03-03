export type PaginationConstructor = {
    take: number;
    offset?: number;
    totalItemsCount?: number;
    hasMore?: boolean;
    maximumPagesToDisplay?: number;
};
export declare class Pagination {
    take: number;
    offset: number;
    totalItemsCount?: number;
    hasMore: boolean;
    maximumPagesToDisplay: number;
    constructor(props: PaginationConstructor);
    getAll(): {
        pages: number[];
        currentPageNumber: number;
        maximumPagesToDisplay: number;
        totalQuantityOfPages: number;
        hasMore: boolean;
        take: number;
        offset: number;
        totalItemsCount: number | undefined;
    };
    goToNextPage(): void;
    getNextPage(): Pagination;
    goToPreviousPage(): void;
    getPreviousPage(): Pagination;
    getPage(pageNumber: number): Pagination;
    private validateHasMore;
    private totalItemsCountIsValid;
    private validateTotalItemsCount;
    private getPageBehindCurrent;
    private getPageAfterCurrent;
    getTotalQuantityOfPages(): number;
    getPages(): number[];
    getCurrentPageNumber(): number;
}
