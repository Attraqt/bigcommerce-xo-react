import {
  FacetContainerProps,
  FacetController,
  FacetProps,
  FacetResolver,
  FilterSpecification,
  FilterController,
  Filter,
} from "../../Data/Facet";
import FacetBasic from "./Facets/FacetBasic";
import {
  BigCommerceConfigurationProps,
  BigCommerceXOConfig,
} from "../../Data/WithBigCommerceConfiguration";
import FacetDataList from "../Basic/Facet/FacetDataList";
import FilterMinMax from "../Basic/Filter/FilterMinMax";

const facetResolverFactory = (config: BigCommerceXOConfig): FacetResolver => {
  return (ui: string, isFilter: boolean) => {
    if (!isFilter) {
      switch (ui) {
        case "basic": {
          return FacetBasic;
        }
        case "datalist": {
          return FacetDataList;
        }
      }
    } else {
      return FilterMinMax;
    }
  };
};

const FacetContainer = (
  props: FacetContainerProps & BigCommerceConfigurationProps
) => {
  const facetController = new FacetController(props);
  const filterController = new FilterController(props);

  const componentResolver: FacetResolver =
    props.facetComponentResolver ||
    facetResolverFactory(props?.bigCommerceConfig || {});

  const facets = props.bigCommerceConfig.customFacetConfigurations?.map(
    (customFacet, index) => {
      const isFilter = customFacet.isFilter;
      const facet = props.available.find((f) => f.id === customFacet.attribute);
      const isInResponse = facet !== undefined;

      if (!isFilter && !isInResponse) return;

      const FacetComponent = componentResolver(
        customFacet.ui,
        customFacet.isFilter
      );

      if (!FacetComponent) return;

      const componentProps: FacetProps = {
        title: facet?.title || customFacet.attribute,
        id: facet?.id || customFacet.attribute,
        isFilter,
        isLoading: props.isLoading,
      };

      if (isFilter) {
        componentProps.selectedFilter =
          props.filter.find((f) => f.id === customFacet.attribute)?.filter ??
          "";
        componentProps.updateSelectedFilter = (value: FilterSpecification) => {
          filterController.updateSelected(customFacet.attribute, value);
        };
      } else {
        componentProps.availableValues = facet?.values || [];
        componentProps.selectedValues =
          props.active.find((a) => a.id === customFacet.attribute)?.values ||
          [];
        componentProps.toggleSelectedValue = (value: string) => {
          facetController.updateSelected(facet!, value);
        };
      }

      return (
        <div
          id="facetedSearch-navList"
          className="facetedSearch-navList"
          key={index}
        >
          <div className="accordion accordion--navList"></div>
          <FacetComponent {...componentProps} />
        </div>
      );
    }
  );

  return (
    <div id="facetedSearch" className="facetedSearch sidebarBlock">
      <div>{facets}</div>
    </div>
  );
};

export default FacetContainer;
