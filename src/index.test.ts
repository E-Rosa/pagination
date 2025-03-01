import { describe, expect, test } from "@jest/globals";
import { Pagination } from ".";

describe("Pagination", () => {
  test("Current page number is consistent with different offsets.", () => {
    const page1 = new Pagination({
      take: 5,
      offset: 0,
    });

    expect(page1.getCurrentPageNumber()).toBe(1);

    const page2 = new Pagination({
      take: 5,
      offset: 5,
    });

    expect(page2.getCurrentPageNumber()).toBe(2);

    const page3 = new Pagination({
      take: 5,
      offset: 10,
    });

    expect(page3.getCurrentPageNumber()).toBe(3);
  });
  test("Page numbers are consistent with offset 0.", () => {
    const pagination = new Pagination({
      take: 5,
      offset: 0,
      maximumPagesToDisplay: 3,
      totalItemsCount: 50,
    });

    expect(pagination.getPages()[0]).toBe(1);
    expect(pagination.getPages()[1]).toBe(2);
    expect(pagination.getPages()[2]).toBe(3);
    expect(pagination.getPages()[3]).toBeUndefined();

    const pagination2 = new Pagination({
      take: 10,
      offset: 0,
      maximumPagesToDisplay: 5,
      totalItemsCount: 500,
    });

    expect(pagination2.getPages()[0]).toBe(1);
    expect(pagination2.getPages()[1]).toBe(2);
    expect(pagination2.getPages()[2]).toBe(3);
    expect(pagination2.getPages()[3]).toBe(4);
    expect(pagination2.getPages()[4]).toBe(5);
    expect(pagination2.getPages()[5]).toBeUndefined();
  });

  test("Page numbers are consistent with offsets that are not multiples of take.", () => {
    const pagination = new Pagination({
      take: 5,
      offset: 3,
      maximumPagesToDisplay: 3,
      totalItemsCount: 50,
    });

    expect(pagination.getPages()[0]).toBe(1);
    expect(pagination.getPages()[1]).toBe(2);
    expect(pagination.getPages()[2]).toBe(3);
    expect(pagination.getPages()[4]).toBeUndefined();

    const pagination2 = new Pagination({
      take: 10,
      offset: 7,
      maximumPagesToDisplay: 5,
      totalItemsCount: 500,
    });

    expect(pagination2.getPages()[0]).toBe(1);
    expect(pagination2.getPages()[1]).toBe(2);
    expect(pagination2.getPages()[2]).toBe(3);
    expect(pagination2.getPages()[3]).toBe(4);
    expect(pagination2.getPages()[4]).toBe(5);
    expect(pagination2.getPages()[6]).toBeUndefined();
  });

  test("Page numbers are consistent when current page is the last or close to the last.", () => {
    const pagination = new Pagination({
      take: 5,
      offset:45,
      maximumPagesToDisplay: 3,
      totalItemsCount: 50,
    });

    expect(pagination.getPages()[0]).toBe(8);
    expect(pagination.getPages()[1]).toBe(9);
    expect(pagination.getPages()[2]).toBe(10);
    expect(pagination.getPages()[3]).toBeUndefined();

    const pagination2 = new Pagination({
      take: 5,
      offset:49,
      maximumPagesToDisplay: 3,
      totalItemsCount: 50,
    });

    expect(pagination2.getPages()[0]).toBe(8);
    expect(pagination2.getPages()[1]).toBe(9);
    expect(pagination2.getPages()[2]).toBe(10);
    expect(pagination2.getPages()[3]).toBeUndefined();
  });
  test("Page numbers are consistent when totalItemsCount is not declared.", () => {
    const pagination = new Pagination({
      take: 5,
      offset: 0
    });

    expect(pagination.getPages()[0]).toBe(1);
    expect(pagination.getPages()[1]).toBeUndefined();

    const pagination2 = new Pagination({
      take: 5,
      offset: 10
    });

    expect(pagination2.getPages()[0]).toBe(1);
    expect(pagination2.getPages()[1]).toBe(2);
    expect(pagination2.getPages()[2]).toBe(3);
    expect(pagination2.getPages()[3]).toBeUndefined();
  });
  test("Page numbers are consistent when totalItemsCount is not declared and hasMore is true.", () => {
    const pagination = new Pagination({
      take: 5,
      offset: 0,
      hasMore: true,
    });

    expect(pagination.getPages()[0]).toBe(1);
    expect(pagination.getPages()[1]).toBe(2);
    expect(pagination.getPages()[2]).toBeUndefined();

    const pagination2 = new Pagination({
      take: 5,
      offset: 10,
      hasMore: true
    });

    expect(pagination2.getPages()[0]).toBe(1);
    expect(pagination2.getPages()[1]).toBe(2);
    expect(pagination2.getPages()[2]).toBe(3);
    expect(pagination2.getPages()[3]).toBe(4);
    expect(pagination2.getPages()[4]).toBeUndefined();
  });
  test("Pages and current page react correctly to goToNextPage().", () => {
    const pagination = new Pagination({
      take: 5,
      offset: 0,
      totalItemsCount: 50,
      maximumPagesToDisplay: 4
    });
    expect(pagination.getCurrentPageNumber()).toBe(1);

    pagination.goToNextPage();

    expect(pagination.getPages()[0]).toBe(1);
    expect(pagination.getPages()[1]).toBe(2);
    expect(pagination.getPages()[2]).toBe(3);
    expect(pagination.getPages()[3]).toBe(4);
    expect(pagination.getPages()[4]).toBeUndefined();
    expect(pagination.getCurrentPageNumber()).toBe(2);

    pagination.goToNextPage();
    
    expect(pagination.getPages()[0]).toBe(2);
    expect(pagination.getPages()[1]).toBe(3);
    expect(pagination.getPages()[2]).toBe(4);
    expect(pagination.getPages()[3]).toBe(5);
    expect(pagination.getPages()[4]).toBeUndefined();
    expect(pagination.getCurrentPageNumber()).toBe(3);

  });
  test("Pages and current page react correctly to goToPreviousPage().", () => {
    const pagination = new Pagination({
      take: 5,
      offset: 10,
      totalItemsCount: 50,
      maximumPagesToDisplay: 4
    });
    expect(pagination.getPages()[0]).toBe(2);
    expect(pagination.getPages()[1]).toBe(3);
    expect(pagination.getPages()[2]).toBe(4);
    expect(pagination.getPages()[3]).toBe(5);
    expect(pagination.getPages()[4]).toBeUndefined();
    expect(pagination.getCurrentPageNumber()).toBe(3);

    pagination.goToPreviousPage();

    expect(pagination.getPages()[0]).toBe(1);
    expect(pagination.getPages()[1]).toBe(2);
    expect(pagination.getPages()[2]).toBe(3);
    expect(pagination.getPages()[3]).toBe(4);
    expect(pagination.getPages()[4]).toBeUndefined();
    expect(pagination.getCurrentPageNumber()).toBe(2);

    pagination.goToPreviousPage();

    expect(pagination.getCurrentPageNumber()).toBe(1);
  })
});
