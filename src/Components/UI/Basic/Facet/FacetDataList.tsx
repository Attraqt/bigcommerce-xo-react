import { useEffect, useState } from "react";
import { FacetOption, FacetProps } from "../../../Data/Facet";

const FacetDataList = (props: FacetProps) => {
  const [searchTerm, setSearchTerm] = useState<string>();
  const [values, setValues] = useState<FacetOption[]>([]);

  useEffect(() => {
    if (!searchTerm) {
      setValues(props.facet.values);
    }
  }, []);

  useEffect(() => {
    setValues(
      props.facet.values.filter((value) => {
        if (searchTerm) {
          // eslint-disable-next-line security/detect-non-literal-regexp
          return value.value.match(new RegExp(searchTerm, "i")) !== null;
        }

        return true;
      })
    );
  }, [searchTerm]);

  return (
    <div className="xo__facet xo__facet__data-list">
      <h4 className="xo__facet__title">{props.facet.title}</h4>
      <div>
        <input type="text" onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      <ul>
        {values.length > 0 ? (
          values.map((value, index) => {
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
          })
        ) : (
          <p>No Results.</p>
        )}
      </ul>
    </div>
  );
};

export default FacetDataList;