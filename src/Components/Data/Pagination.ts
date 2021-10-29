export type PaginationProps = {
  current: number;
  setCurrent: (page: number) => unknown;
  total: number;
  isLoading: boolean;
};

/**
 * Calculate what page you must be on given the index of the first record in the collection
 * and the number of records per page.
 *
 * @param offset The index of the first record in a collection
 * @param recordsPerPage
 * @returns
 */
export const calculatePage = (offset: number, recordsPerPage: number) => {
  if (recordsPerPage === 0) {
    throw new Error("Tried to divide by zero with 'records per page' of zero");
  }

  return Math.floor(Math.max(offset, 0) / recordsPerPage) + 1;
};

/**
 * Calculate the maximum number of pages given the total record count and records per page.
 *
 * @param totalRecords
 * @param recordsPerPage
 * @returns
 */
export const calculateMaxPages = (
  totalRecords: number,
  recordsPerPage: number
) => {
  if (recordsPerPage === 0) {
    throw new Error("Tried to divide by zero with 'records per page' of zero");
  }

  return Math.ceil(totalRecords / recordsPerPage);
};

/**
 * Calculate what the index of the first record in a collection should be,
 * given the page size and records per page
 *
 * @param page
 * @param recordsPerPage
 * @returns
 */
export const calculateOffset = (page: number, recordsPerPage: number) => {
  if (recordsPerPage === 0)
    throw new Error("Tried to divide by zero with limit of zero");
  return (page - 1) * recordsPerPage;
};
