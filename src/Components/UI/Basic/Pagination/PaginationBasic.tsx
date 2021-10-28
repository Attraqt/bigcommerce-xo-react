import { PaginationProps } from "../../../Data/Pagination";
import { range } from "lodash";

const PaginationBasic = (props: PaginationProps) => {
  let pages = range(1, props.total + 1, 1).map((page, index) => {
    return (
      <li
        key={index}
        onClick={() => {
          props.setCurrent(page);
        }}
        className={
          page == props.current
            ? "pagination__page pagination__page__current"
            : "pagination__page"
        }
      >
        {page}
      </li>
    );
  });

  let next = (
    <li
      key="next"
      className="pagination__control pagination__control__next"
      onClick={() => {
        props.setCurrent(props.current + 1);
      }}
    >
      Next &gt;
    </li>
  );
  let prev = (
    <li
      key="prev"
      className="pagination__control pagination__control__prev"
      onClick={() => {
        props.setCurrent(props.current - 1);
      }}
    >
      &lt; Prev
    </li>
  );

  if (props.current > 1) {
    pages.unshift(prev);
  }

  if (props.current < props.total) {
    pages.push(next);
  }

  return (
    <div className="xo__pagination xo__pagination__basic">
      <ul>{pages}</ul>
    </div>
  );
};

export default PaginationBasic;
