import {
  Facet,
  FacetContainerProps,
  FacetController,
  FacetResolver,
} from "../../Data/Facet";
import { find } from "lodash";
import FacetBasic from "./Facets/FacetBasic";
import BigCommerceConfiguration, {
  BigCommerceConfigurationProps,
  BigCommerceXOConfig,
} from "../../Data/WithBigCommerceConfiguration";

const facetResolverFactory = (config: BigCommerceXOConfig): FacetResolver => {
  return (f: Facet) => FacetBasic;
};

const FacetContainer = (
  props: FacetContainerProps & Partial<BigCommerceConfigurationProps>
) => {
  const controller = new FacetController(props);
  const componentResolver: FacetResolver = facetResolverFactory(
    props?.bigCommerceConfig || {}
  );

  const facets = props.available.map((facet, index) => {
    if (!facet) return;

    const selectedFacet = find(props.active, (f) => f?.id == facet.id);
    const FacetComponent = componentResolver(facet);

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

export default BigCommerceConfiguration(FacetContainer);
