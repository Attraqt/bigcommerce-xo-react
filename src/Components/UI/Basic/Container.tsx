/* eslint-disable react/no-unescaped-entities */
import { withSearchProps } from "../../WithSearch";
import Facets from "./Facets";
import ItemGrid from "./ItemGrid";
import SortOrder from "./SortOrder";
import PaginationBasic from "./Pagination/PaginationBasic";
import PaginationLoadMore from "./Pagination/PaginationLoadMore";

type ContainerProps = {} & withSearchProps;

const Container = (props: ContainerProps) => {
  return (
    <div className="xo__container">
      <p className="xo__summary">
        Showing {props.pageItemNumberStart} - {props.pageItemNumberEnd} of{" "}
        {props.totalItems} results for "{props.query}".
      </p>
      <SortOrder
        active={props.activeSortOrder}
        available={props.availableSortOrders}
        setActive={props.setActiveSortOrder}
      />
      <Facets
        active={props.selectedFacets}
        available={props.facets}
        setActive={props.setSelectedFacets}
      />
      <ItemGrid items={props.items} />
      <PaginationLoadMore
        current={props.currentPage}
        total={props.totalPages}
        setCurrent={props.setCurrentPage}
      />
    </div>
  );
};

export default Container;
