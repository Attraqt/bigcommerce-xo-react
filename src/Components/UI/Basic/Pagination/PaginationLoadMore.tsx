import { PaginationProps } from "../../../Data/Pagination";

const PaginationLoadMore = (props: PaginationProps) => {
  if (props.current < props.total) {
    return (
      <div className="xo__pagination xo__pagination__loadmore">
        <button onClick={() => props.setCurrent(props.current + 1)}>
          Load Next Page
        </button>
      </div>
    );
  } else {
    return <></>;
  }
};

export default PaginationLoadMore;
