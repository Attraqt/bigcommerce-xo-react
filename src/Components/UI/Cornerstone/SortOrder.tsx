import { map, findIndex } from "lodash";
import BigCommerceConfiguration, {
  BigCommerceConfigurationProps,
} from "../../Data/BigCommerceConfiguration";
import { makeActive, SortOption, SortOrderProps } from "../../Data/SortOrder";

const SortOrder = (
  props: SortOrderProps & Partial<BigCommerceConfigurationProps>
) => {
  const available: SortOption[] = (
    props.bigCommerceConfig?.customSortOptions ?? []
  )
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((so) => {
      return {
        attribute: so.attribute,
        label: so.label,
        order: so.direction,
      } as SortOption;
    });

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
    <form className="actionBar" method="get" data-sort-by="product">
      <fieldset className="form-fieldset actionBar-section">
        <div className="form-field">
          <label className="form-label">Sort By</label>
          <select
            className="form-select form-select--small"
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
      </fieldset>
    </form>
  );
};

export default BigCommerceConfiguration(SortOrder);
