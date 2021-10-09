import { Facet, FacetContainerProps, FacetController } from "../../Data/Facet";
import _ from "lodash";
import FacetBasic from "./Facet/FacetBasic";

const Facets = (props: FacetContainerProps) => {
  const controller = new FacetController(props);

  const facets = props.available.map((facet, index) => {
    const selectedFacet = _.find(props.active, (f) => f.id == facet.id);

    return (
      <div key={index}>
        <h4>{facet.title}</h4>
        <FacetBasic
          facet={facet}
          selectedValues={selectedFacet ? selectedFacet.values : []}
          toggleSelectedValue={(value: string) => {
            controller.updateSelected(facet, value);
          }}
        />
      </div>
    );
  });

  return <div className="xo__facets">{facets}</div>;
};

export default Facets;
