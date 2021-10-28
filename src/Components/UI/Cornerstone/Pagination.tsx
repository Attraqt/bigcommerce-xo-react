import { PaginationProps } from "../../Data/Pagination";
import { range } from "lodash";

const Pagination = (props: PaginationProps) => {
  let pages = range(1, props.total + 1, 1).map((page, index) => {
    return (
      <li
        key={index}
        onClick={() => {
          props.setCurrent(page);
        }}
        className={
          page == props.current
            ? "pagination-item pagination-item--current"
            : "pagination-item"
        }
      >
        <a className="pagination-link">{page}</a>
      </li>
    );
  });

  let next = (
    <li
      key="next"
      className="pagination-item pagination-item--next"
      onClick={() => {
        props.setCurrent(props.current + 1);
      }}
    >
      <a className="pagination-link">Next</a>
    </li>
  );
  let prev = (
    <li
      key="prev"
      className="pagination-item pagination-item--previous"
      onClick={() => {
        props.setCurrent(props.current - 1);
      }}
    >
      <a className="pagination-link">Previous</a>
    </li>
  );

  if (props.current > 1) {
    pages.unshift(prev);
  }

  if (props.current < props.total) {
    pages.push(next);
  }

  return (
    <nav className="pagination" aria-label="pagination">
      <ul className="pagination-list">{pages}</ul>
    </nav>
  );
};

export default Pagination;
