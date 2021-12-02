import { FacetProps } from "../../../Data/Facet";

const FacetBasic = (props: FacetProps) => {
  if (props.isFilter) {
    return <div>This UI does not support a filter-based facet.</div>;
  }

  return (
    <div className="xo__facet xo__facet__basic" data-facet-id={props.id}>
      <h4 className="xo__facet__title">{props.title}</h4>
      <ul>
        {props.availableValues?.map((value, index) => {
          return (
            <li key={index}>
              <input
                type="checkbox"
                readOnly={true}
                checked={props.selectedValues?.includes(value.value)}
                onClick={() =>
                  !props.isLoading &&
                  props.toggleSelectedValue &&
                  props.toggleSelectedValue(value.value)
                }
                disabled={props.isLoading}
              />{" "}
              <label
                onClick={() =>
                  !props.isLoading &&
                  props.toggleSelectedValue &&
                  props.toggleSelectedValue(value.value)
                }
              >
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
