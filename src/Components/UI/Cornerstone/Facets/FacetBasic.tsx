import { FacetProps } from "../../../Data/Facet";

const FacetBasic = (props: FacetProps) => {
  return (
    <div className="accordion-nav-clear-holder" data-facet-id={props.id}>
      <span className="accordion-title">{props.title}</span>
      <div>
        <ul className="navList">
          {props.availableValues?.map((value, index) => {
            return (
              <li className="navList-item" key={index}>
                <input
                  type="checkbox"
                  readOnly={true}
                  checked={props.selectedValues?.includes(value.value)}
                  onClick={() =>
                    props.toggleSelectedValue &&
                    props.toggleSelectedValue(value.value)
                  }
                />{" "}
                <label
                  onClick={() =>
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
    </div>
  );
};

export default FacetBasic;
