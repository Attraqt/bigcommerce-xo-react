/* eslint-disable lodash/prefer-lodash-method */
import { Facet, FacetContainerProps, FacetController } from "../../Data/Facet";
import { find } from "lodash";
import FacetBasic from "./Facet/FacetBasic";

const FacetContainer = (props: FacetContainerProps) => {
  const facetController = new FacetController(props);
  const componentResolver = (f: Facet) => FacetBasic;

  const facets = props.available.map((facet, index) => {
    if (!facet) return;

    const selectedFacet = find(props.active, (f) => f.id == facet.id);
    const FacetComponent = componentResolver(facet);

    return (
      <div key={index}>
        <FacetComponent
          id={facet.id}
          title={facet.title}
          selectedValues={selectedFacet ? selectedFacet.values : []}
          toggleSelectedValue={(value: string) => {
            facetController.updateSelected(facet, value);
          }}
          isFilter={false}
          isLoading={props.isLoading}
        />
      </div>
    );
  });

  return (
    <div className="xo__facets">
      <div>{facets}</div>
    </div>
  );
};

export default FacetContainer;
