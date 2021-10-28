import { map, findIndex } from "lodash";
import { makeActive, SortOrderProps } from "../../Data/SortOrder";

const SortOrder = (props: SortOrderProps) => {
  const options = map(props.available, (option, key) => {
    return (
      <option key={key} value={key}>
        {option.label}
      </option>
    );
  });

  const activeKey = findIndex(props.available, (order) => {
    return (
      order.attribute == props.active?.attribute &&
      order.order == props.active?.order
    );
  });

  options.unshift(<option key={-1} value={-1}></option>);

  return (
    <form className="actionBar" method="get" data-sort-by="product">
      <fieldset className="form-fieldset actionBar-section">
        <div className="form-field">
          <label className="form-label">Sort By</label>
          <select
            className="form-select form-select--small"
            defaultValue={activeKey}
            onChange={(event) => {
              const active = props.available[Number(event.target.value)];
              if (active) {
                props.setActive(makeActive(active));
              }
            }}
          >
            {options}
          </select>
        </div>
      </fieldset>
    </form>
  );
};

export default SortOrder;
