/* eslint-disable lodash/prefer-lodash-method */
import clone from "lodash/clone";
import find from "lodash/find";
import reject from "lodash/reject";
import uniq from "lodash/uniq";
import React from "react";

export type Facet = {
  id: string;
  title: string;
  values: FacetOption[];
};

export type FilterSpecification = string;
export type Filter = { id: string; filter: FilterSpecification };

export type FacetOption = {
  value: string;
  count: number;
};

export type SelectedFacet = {
  id: string;
  values: SelectedFacetValues;
};

export type FilterFacet = {
  id: string;
  attribute: string;
  title: string;
  ui: string;
  toFilterQuery: (values: string[]) => string;
}

type SelectedFacetValues = string[];

export type FacetContainerProps = {
  active: SelectedFacet[];
  available: Facet[];

  setActive: (value: SelectedFacet[]) => unknown;
  facetComponentResolver?: FacetResolver;

  filter: Filter[];
  setFilter: (filter: Filter[]) => unknown;

  isLoading: boolean;
};

export type FacetResolver = (...params: any) => React.FC<FacetProps> | undefined;

export type FacetProps = {
  id: string;
  title: string;

  availableValues?: FacetOption[];
  selectedValues?: SelectedFacetValues;
  toggleSelectedValue?: (value: string) => unknown;

  selectedFilter?: string;
  updateSelectedFilter?: (value: FilterSpecification) => unknown;

  isFilter: boolean;
  isLoading: boolean;
};

/**
 * @param base 
 * @param additional 
 * @returns 
 */
export const mergeSelectedFacets = (base: SelectedFacet[], additional: SelectedFacet[]) => {
  const keys = uniq([...base.map(facet => facet.id), ...additional.map(facet => facet.id)]);

  return keys.map(key => {
    return {
      id: key,
      values: uniq([...base.find(facet => facet.id === key)?.values || [], ...additional.find(facet => facet.id === key)?.values || []])
    } as SelectedFacet
  });
}

/**
 * 
 * @param incoming 
 * @param toUnmerge 
 * @returns 
 */
export const unmergeSelectedFacets = (incoming: SelectedFacet[], toUnmerge: SelectedFacet[]) => {
  return incoming.map(f => {
    if (toUnmerge.find(a => a.id == f.id)) {
      return {
        id: f.id,
        values: reject(f.values, v => toUnmerge.find(a => a.id == f.id)?.values?.includes(v))
      } as SelectedFacet
    }

    return f;
  }).filter(f => f.values.length > 0);
}

export class FacetController {
  constructor(private props: Pick<FacetContainerProps, "active" | "setActive">) { }

  updateSelected(facet: Pick<Facet, "id">, value: string) {
    const selectedFacets = clone(this.props.active);
    const selectedFacet = find(selectedFacets, (item) => item.id == facet.id);
    const facetFound = selectedFacet !== undefined;

    if (facetFound) {
      const alreadySelected = selectedFacet.values.includes(value);

      if (alreadySelected) {
        selectedFacet.values = reject(selectedFacet.values, (v) => v == value);
      } else {
        selectedFacet.values.push(value);
      }
    } else {
      selectedFacets.push({
        id: facet.id,
        values: [value],
      });
    }

    this.props.setActive(
      reject(selectedFacets, (facet) => facet.values.length == 0)
    );
  }

  isSelected(facet: Facet, value: string): boolean {
    const selectedFacet = find(
      this.props.active,
      (item) => item.id == facet.id
    );

    if (selectedFacet === undefined) {
      return false;
    }

    return selectedFacet.values.includes(value);
  }
}

export class FilterController {
  constructor(private props: Pick<FacetContainerProps, "filter" | "setFilter">) { }

  /**
   * 
   * @param filterIdentifier A internal identifier for the filter. Doesn't affect the query.
   * @param value 
   */
  updateSelected(filterIdentifier: string, value: FilterSpecification) {
    // Existing filteres and remove the one we're going to update, if it's there.
    const existingFilters = reject(clone(this.props.filter), (f) => f.id == filterIdentifier);
    
    if (value.trim() != "") {
      existingFilters.push({ id: filterIdentifier, filter: value.trim() });
    }

    this.props.setFilter(existingFilters);
  }
}