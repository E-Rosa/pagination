export type PaginationConstructor = {
  take: number;
  offset?: number;
  totalItemsCount?: number;
  hasMore?: boolean;
  maximumPagesToDisplay?: number;
};

export class Pagination {
  take: number;
  offset: number;
  totalItemsCount?: number;
  hasMore: boolean = false;
  maximumPagesToDisplay: number = 5;

  constructor(props: PaginationConstructor) {
    this.offset = props.offset ? props.offset : 0;
    this.take = props.take;
    this.totalItemsCount = props.totalItemsCount;
    if (props.hasMore) this.hasMore = props.hasMore;
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

  getNextPage(): Pagination {
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

  getPreviousPage(): Pagination {
    const nextOffset = this.offset - this.take;
    return new Pagination({
      take: this.take,
      hasMore: this.hasMore,
      maximumPagesToDisplay: this.maximumPagesToDisplay,
      offset: nextOffset,
      totalItemsCount: this.totalItemsCount,
    });
  }

  getPage(pageNumber: number): Pagination {
    if (
      pageNumber > this.getTotalQuantityOfPages() ||
      pageNumber < 1 ||
      pageNumber == this.getCurrentPageNumber()
    ) {
      return new Pagination({ ...this });
    }
    if (pageNumber > this.getCurrentPageNumber()) {
      const distance = pageNumber - this.getCurrentPageNumber();
      const newOffset = distance * this.take + this.offset;
      return new Pagination({
        take: this.take,
        hasMore: this.hasMore,
        maximumPagesToDisplay: this.maximumPagesToDisplay,
        offset: newOffset,
        totalItemsCount: this.totalItemsCount,
      });
    }
    const distance = this.getCurrentPageNumber() - pageNumber;
    const newOffset = distance * this.take - this.offset;
    return new Pagination({
      take: this.take,
      hasMore: this.hasMore,
      maximumPagesToDisplay: this.maximumPagesToDisplay,
      offset: newOffset,
      totalItemsCount: this.totalItemsCount,
    });
  }

  private validateHasMore() {
    if (this.totalItemsCount && this.offset >= this.totalItemsCount) {
      this.hasMore = false;
    }
    if (
      this.totalItemsCount &&
      this.totalItemsCount > this.offset + this.take
    ) {
      this.hasMore = true;
    }
  }

  private totalItemsCountIsValid() {
    return this.totalItemsCount && this.totalItemsCount - this.offset > 0;
  }

  private validateTotalItemsCount() {
    const isValid = this.totalItemsCountIsValid();
    if (!isValid) this.totalItemsCount = undefined;
  }

  private getPageBehindCurrent(distanceFromCurrentPage: number) {
    const pageNumber = this.getCurrentPageNumber() - distanceFromCurrentPage;
    if (pageNumber > 0) return pageNumber;
  }

  private getPageAfterCurrent(distanceFromCurrentPage: number) {
    const pageNumber = this.getCurrentPageNumber() + distanceFromCurrentPage;
    const pageNumberIsWithingTotalPagesRange =
      pageNumber <= this.getTotalQuantityOfPages();
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
    let pages: number[] = [];
    pages.push(this.getCurrentPageNumber());

    Array(this.maximumPagesToDisplay)
      .fill(undefined)
      .forEach((_, index) => {
        const distanceFromCurrentPage = index + 1;
        const pageAfterCurrent = this.getPageAfterCurrent(
          distanceFromCurrentPage
        );
        const canAddNewPageAfterCurrent =
          pages.length < this.maximumPagesToDisplay && pageAfterCurrent;
        if (canAddNewPageAfterCurrent) {
          pages.push(pageAfterCurrent);
        }

        const pageBehindCurrent = this.getPageBehindCurrent(
          distanceFromCurrentPage
        );
        const canAddNewPageBehindCurrent =
          pages.length < this.maximumPagesToDisplay && pageBehindCurrent;
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
