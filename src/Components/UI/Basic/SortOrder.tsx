import { map, findIndex } from "lodash";
import { makeActive, SortOption, SortOrderProps } from "../../Data/SortOrder";

const SortOrder = (props: SortOrderProps) => {
  const available: SortOption[] = [];
  const options = map(available, (option, key) => {
    return (
      <option key={key} value={key}>
        {option.label}
      </option>
    );
  });

  const activeKey = findIndex(available, (order) => {
    return (
      order.attribute == props.active?.attribute &&
      order.order == props.active?.order
    );
  });

  options.unshift(<option key={-1} value={-1}></option>);

  return (
    <div className="xo__sort">
      <select
        defaultValue={activeKey}
        onChange={(event) => {
          const active = available[Number(event.target.value)];
          if (active) {
            props.setActive(makeActive(active));
          }
        }}
      >
        {options}
      </select>
    </div>
  );
};

export default SortOrder;
