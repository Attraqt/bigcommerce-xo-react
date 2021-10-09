/* eslint-disable security/detect-object-injection */
import React from "react";

export enum UIComponent {
  ProductGrid,
  ProductCard,
  Pagination,
  SortOrder,
  FacetContainer,
}

type ComponentMap = {
  [key in UIComponent]?: React.FC;
};

class UIDefinition {
  private components: ComponentMap = {};

  setComponent = (name: UIComponent, component: React.FC) => {
    this.components[name] = component;
  };

  getComponent = (name: UIComponent): React.FC => {
    const blankComponent = () => {
      return React.createElement(
        "div",
        {},
        `[UIDefinition] No default component found for ${UIComponent[name]}.`
      );
    };

    return this.components[name] ?? blankComponent;
  };
}

export default UIDefinition;
