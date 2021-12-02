import { useEffect, useState } from "react";
import { FacetProps } from "../../../Data/Facet";

const FilterMinMax = (props: FacetProps) => {
  const [min, setMin] = useState<number | undefined>();
  const [max, setMax] = useState<number | undefined>();

  useEffect(() => {
    const minMatch = props.selectedFilter?.match(
      new RegExp(`${props.id.toLowerCase()} >= (-?\\d+)`)
    );
    const maxMatch = props.selectedFilter?.match(
      new RegExp(`${props.id.toLowerCase()} <= (-?\\d+)`)
    );

    if (minMatch) {
      setMin(Number(minMatch[1]));
    }

    if (maxMatch) {
      setMax(Number(maxMatch[1]));
    }
  }, []);

  useEffect(() => {
    const parts = [];

    if (min !== undefined) {
      parts.push(`${props.id.toLowerCase()} >= ${min}`);
    }

    if (max !== undefined) {
      parts.push(`${props.id.toLowerCase()} <= ${max}`);
    }

    props.updateSelectedFilter &&
      props.updateSelectedFilter(parts.join(" AND "));
  }, [min, max]);

  return (
    <div
      className="xo__facet xo__filter xo__filter__minmax"
      data-facet-id={props.id}
    >
      <h4 className="xo__facet__title">{props.title}</h4>
      <div>
        <input
          type="number"
          name="min"
          readOnly={props.isLoading}
          defaultValue={min}
          onChange={(e) => {
            setMin(e.target.value !== "" ? Number(e.target.value) : undefined);
          }}
        />{" "}
        to{" "}
        <input
          type="number"
          name="max"
          readOnly={props.isLoading}
          defaultValue={max}
          onChange={(e) => {
            setMax(e.target.value !== "" ? Number(e.target.value) : undefined);
          }}
        />
      </div>
    </div>
  );
};

export default FilterMinMax;
