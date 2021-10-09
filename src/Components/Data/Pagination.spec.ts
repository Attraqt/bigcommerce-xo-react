import {
  calculateMaxPages,
  calculateOffset,
  calculatePage,
} from "./Pagination";

describe("Components\\Data\\Pagination::calculatePage", () => {
  test("It works", () => {
    expect(calculatePage(0, 12)).toBe(1);
    expect(calculatePage(11, 12)).toBe(1);
    expect(calculatePage(12, 12)).toBe(2);
  });
});

describe("Components\\Data\\Pagination::calculateMaxPages", () => {
  test("It works", () => {
    expect(calculateMaxPages(100, 10)).toBe(10);
    expect(calculateMaxPages(101, 10)).toBe(11);
    expect(calculateMaxPages(99, 10)).toBe(10);
    expect(calculateMaxPages(87, 10)).toBe(9);
  });
});

describe("Components\\Data\\Pagination::calculateOffset", () => {
  test("It works", () => {
    expect(calculateOffset(1, 10)).toBe(0);
    expect(calculateOffset(2, 10)).toBe(10);
  });
});
