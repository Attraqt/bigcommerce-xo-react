import { FacetProps } from "../../../Data/Facet";

const FacetBasic = (props: FacetProps) => {
  return (
    <div className="xo__facet xo__facet__basic" data-facet-id={props.facet.id}>
      <h4 className="xo__facet__title">{props.facet.title}</h4>
      <ul>
        {props.facet.values.map((value, index) => {
          return (
            <li key={index}>
              <input
                type="checkbox"
                readOnly={true}
                checked={props.selectedValues.includes(value.value)}
                onClick={() => props.toggleSelectedValue(value.value)}
              />{" "}
              <label onClick={() => props.toggleSelectedValue(value.value)}>
                {value.value} ({value.count})
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FacetBasic;
