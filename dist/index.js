"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = void 0;
class Pagination {
    constructor(props) {
        this.hasMore = false;
        this.maximumPagesToDisplay = 5;
        this.offset = props.offset ? props.offset : 0;
        this.take = props.take;
        this.totalItemsCount = props.totalItemsCount;
        if (props.hasMore)
            this.hasMore = props.hasMore;
        if (props.maximumPagesToDisplay) {
            this.maximumPagesToDisplay = props.maximumPagesToDisplay;
        }
        this.validateTotalItemsCount();
        this.validateHasMore();
    }
    getAll() {
        return {
            pages: this.getPages(),
            currentPageNumber: this.getCurrentPageNumber(),
            maximumPagesToDisplay: this.maximumPagesToDisplay,
            totalQuantityOfPages: this.getTotalQuantityOfPages(),
            hasMore: this.hasMore,
            take: this.take,
            offset: this.offset,
            totalItemsCount: this.totalItemsCount,
        };
    }
    goToNextPage() {
        const nextOffset = this.offset + this.take;
        this.offset = nextOffset;
    }
    getNextPage() {
        const nextOffset = this.offset + this.take;
        return new Pagination({
            take: this.take,
            hasMore: this.hasMore,
            maximumPagesToDisplay: this.maximumPagesToDisplay,
            offset: nextOffset,
            totalItemsCount: this.totalItemsCount,
        });
    }
    goToPreviousPage() {
        const nextOffset = this.offset - this.take;
        this.offset = nextOffset;
    }
    getPreviousPage() {
        const nextOffset = this.offset - this.take;
        return new Pagination({
            take: this.take,
            hasMore: this.hasMore,
            maximumPagesToDisplay: this.maximumPagesToDisplay,
            offset: nextOffset,
            totalItemsCount: this.totalItemsCount,
        });
    }
    validateHasMore() {
        if (this.totalItemsCount && this.offset >= this.totalItemsCount) {
            this.hasMore = false;
        }
        if (this.totalItemsCount &&
            this.totalItemsCount > this.offset + this.take) {
            this.hasMore = true;
        }
    }
    totalItemsCountIsValid() {
        return this.totalItemsCount && this.totalItemsCount - this.offset > 0;
    }
    validateTotalItemsCount() {
        const isValid = this.totalItemsCountIsValid();
        if (!isValid)
            this.totalItemsCount = undefined;
    }
    getPageBehindCurrent(distanceFromCurrentPage) {
        const pageNumber = this.getCurrentPageNumber() - distanceFromCurrentPage;
        if (pageNumber > 0)
            return pageNumber;
    }
    getPageAfterCurrent(distanceFromCurrentPage) {
        const pageNumber = this.getCurrentPageNumber() + distanceFromCurrentPage;
        const pageNumberIsWithingTotalPagesRange = pageNumber <= this.getTotalQuantityOfPages();
        if (pageNumberIsWithingTotalPagesRange) {
            return pageNumber;
        }
    }
    getTotalQuantityOfPages() {
        if (this.totalItemsCount) {
            return Math.ceil(this.totalItemsCount / this.take);
        }
        const quantityOfPagesBehind = Math.floor(this.offset / this.take);
        if (quantityOfPagesBehind && this.hasMore) {
            return quantityOfPagesBehind + 2;
        }
        if (quantityOfPagesBehind) {
            return quantityOfPagesBehind + 1;
        }
        if (this.hasMore) {
            return 2;
        }
        return 1;
    }
    getPages() {
        let pages = [];
        pages.push(this.getCurrentPageNumber());
        Array(this.maximumPagesToDisplay)
            .fill(undefined)
            .forEach((_, index) => {
            const distanceFromCurrentPage = index + 1;
            const pageAfterCurrent = this.getPageAfterCurrent(distanceFromCurrentPage);
            const canAddNewPageAfterCurrent = pages.length < this.maximumPagesToDisplay && pageAfterCurrent;
            if (canAddNewPageAfterCurrent) {
                pages.push(pageAfterCurrent);
            }
            const pageBehindCurrent = this.getPageBehindCurrent(distanceFromCurrentPage);
            const canAddNewPageBehindCurrent = pages.length < this.maximumPagesToDisplay && pageBehindCurrent;
            if (canAddNewPageBehindCurrent) {
                pages = [pageBehindCurrent, ...pages];
            }
        });
        return pages;
    }
    getCurrentPageNumber() {
        let currentPageNumber = Math.floor(this.offset / this.take + 1);
        if (currentPageNumber < 0) {
            currentPageNumber = 0;
        }
        return currentPageNumber;
    }
}
exports.Pagination = Pagination;
