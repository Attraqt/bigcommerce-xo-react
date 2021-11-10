import { Facet, FacetContainerProps, FacetController } from "../../Data/Facet";
import { find } from "lodash";
import FacetBasic from "./Facet/FacetBasic";

const FacetContainer = (props: FacetContainerProps) => {
  const controller = new FacetController(props);
  const componentResolver = (f: Facet) => FacetBasic;

  const facets = props.available.map((facet, index) => {
    if (!facet) return;

    const selectedFacet = find(props.active, (f) => f.id == facet.id);
    const FacetComponent = componentResolver(facet);

    return (
      <div key={index}>
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
    <div className="xo__facets">
      <div>{facets}</div>
    </div>
  );
};

export default FacetContainer;
