import {
  Facet,
  FacetContainerProps,
  FacetController,
  FacetResolver,
} from "../../Data/Facet";
import { find } from "lodash";
import FacetBasic from "./Facets/FacetBasic";

const Facets = (props: FacetContainerProps) => {
  const controller = new FacetController(props);
  const componentResolver: FacetResolver =
    props.facetComponentResolver ?? ((f: Facet) => FacetBasic);

  const facets = props.available.map((facet, index) => {
    const selectedFacet = find(props.active, (f) => f.id == facet.id);
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

export default Facets;
