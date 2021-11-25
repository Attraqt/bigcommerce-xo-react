import {
  Facet,
  FacetContainerProps,
  FacetController,
  FacetResolver,
} from "../../Data/Facet";
import { find } from "lodash";
import FacetBasic from "./Facets/FacetBasic";
import {
  BigCommerceConfigurationProps,
  BigCommerceXOConfig,
} from "../../Data/WithBigCommerceConfiguration";
import FacetDataList from "../Basic/Facet/FacetDataList";

const facetResolverFactory = (config: BigCommerceXOConfig): FacetResolver => {
  return (f: Facet) => {
    const facetConfig = config.customFacetConfigurations?.find(
      (a) => a.attribute === f.id.replace(/^facet-/, "")
    );

    if (!facetConfig) return;

    switch (facetConfig.ui) {
      case "basic": {
        return FacetBasic;
      }
      case "datalist": {
        return FacetDataList;
      }
    }
  };
};

const FacetContainer = (
  props: FacetContainerProps & BigCommerceConfigurationProps
) => {
  const controller = new FacetController(props);
  const componentResolver: FacetResolver =
    props.facetComponentResolver ||
    facetResolverFactory(props?.bigCommerceConfig || {});

  const getFacetConfig = (attribute: string) =>
    props.bigCommerceConfig.customFacetConfigurations?.find(
      (a) => a.attribute === attribute.replace(/^facet-/, "")
    );

  const facets = props.available.map((facet, index) => {
    if (!facet) return;

    const config = getFacetConfig(facet.id);

    if (!config) return;

    const selectedFacet = find(props.active, (f) => f?.id == facet.id);
    const FacetComponent = componentResolver(facet);

    if (!FacetComponent) return;

    return (
      <div
        id="facetedSearch-navList"
        className="facetedSearch-navList"
        key={index}
      >
        <div className="accordion accordion--navList"></div>
        <FacetComponent
          facet={facet}
          selectedValues={selectedFacet ? selectedFacet.values : []}
          toggleSelectedValue={(value: string) => {
            controller.updateSelected(facet, value);
          }}
          isLoading={props.isLoading}
        />
      </div>
    );
  });

  return (
    <div id="facetedSearch" className="facetedSearch sidebarBlock">
      <div>{facets}</div>
    </div>
  );
};

export default FacetContainer;
