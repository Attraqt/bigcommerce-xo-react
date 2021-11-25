import { clone, find, reject } from "lodash";
import React from "react";

export type Facet = {
  id: string;
  title: string;
  values: FacetOption[];
};

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

  isLoading: boolean;
};

export type FacetResolver = (facet: Facet) => React.FC<FacetProps> | undefined;

export type FacetProps = {
  facet: Facet;
  selectedValues: SelectedFacetValues;

  toggleSelectedValue: (value: string) => unknown;

  isLoading: boolean;
};

export class FacetController {
  constructor(private props: FacetContainerProps) { }

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
