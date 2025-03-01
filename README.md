# TS Pagination

A framework-independent pagination API. Easily implement pagination into any typescript/javascript project, regardless of it being front-end, back-end, React, Vue, Svelte, or another.

## Installation

```
npm i @eliasrrosa/pagination@latest
```

## Usage

Instantiate the pagination object. Pass it properties to modify its behavior. Then, use methods to access relevant data. Finally, move through pages.

```js
import { Pagination } from "@eliasrrosa/pagination";

const pagination = new Pagination({
  take: 10,
  offset: 10,
  maximumPagesToDisplay: 3,
  totalItemsCount: 100,
});

console.log(pagination.getPages()); //output: [1,2,3];
console.log(pagination.getCurrentPage()); //output: 2;
console.log(pagination.getTotalQuantityOfPages()); //output: 10

pagination.goToNextPage();

console.log(pagination.getPages()); //output: [2,3,4];
console.log(pagination.getCurrentPage()); //output: 3;
console.log(pagination.getTotalQuantityOfPages()); //output: 10

pagination.goToPreviousPage();

console.log(pagination.getPages()); //output: [1,2,3];
console.log(pagination.getCurrentPage()); //output: 2;
console.log(pagination.getTotalQuantityOfPages()); //output: 10
```

In this example, Pagination will:

1. Display `take` (10) items per page;
2. Skip the first `offset` (10) items.
3. Display at most `maximumPagesToDisplay` (3) pages at a time.

If immutability is necessary, like in React, you can navigate through pages immutably using:

```js
import { Pagination } from "@eliasrrosa/pagination";

const pagination = new Pagination({
  take: 10,
  offset: 10,
  maximumPagesToDisplay: 3,
  totalItemsCount: 100,
});

console.log(pagination.getNextPage()) 
/* returns a new Pagination instance with properties as if it had navigated to the next page */

console.log(pagination.getPreviousPage()) 
/* returns a new Pagination instance with properties as if it had navigated to the previous page */
```

## Default Behavior

1. The current page will tend to be in the middle, meaning there will be a balance between pages displayed after the current page, and pages displayed before the current page.

2. The number of pages after the current page will be greater than the number of pages before the current page when the maximum number of pages to be displayed is even.

3. If there are enough pages to be displayed, the maximum number of pages to be displayed will always be equal to `Pagination.maximumPagesToDisplay`. Otherwise, as many pages as can be inferred by the properties received will be displayed.

## Example implementations

1. Check out this React implementation: https://codesandbox.io/p/sandbox/ts-pagination-4f6zdv

If you use another framework, or no framework, how would you implement it?
