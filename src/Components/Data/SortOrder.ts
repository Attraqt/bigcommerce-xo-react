export type SortOption = {
  label: string;
  attribute: string;
  order: SortDirection;
};

type SortDirection = "desc" | "asc";

export type ActiveSortOption = Omit<SortOption, "label">;

export type SortOrderProps = {
  active: ActiveSortOption | undefined;
  setActive: (active: ActiveSortOption) => unknown;
  isLoading: boolean;
};

/**
 * Given a `SortOption`, convert it into an `ActiveSortOption`.
 *
 * @param sortOption
 * @returns
 */
export const makeActive = (sortOption: SortOption): ActiveSortOption => {
  delete (sortOption as any)["label"];
  return sortOption;
};
