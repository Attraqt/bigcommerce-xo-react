export type SortOption = {
  label: string;
  attribute: string;
  order: "desc" | "asc";
};

export type ActiveSortOption = Omit<SortOption, "label">;

export type SortOrderProps = {
  available: SortOption[];
  active: ActiveSortOption | undefined;
  setActive: (active: ActiveSortOption) => unknown;
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
