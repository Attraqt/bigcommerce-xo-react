/* eslint-disable react/no-unescaped-entities */
import { withSearchProps } from "../../WithSearch";
import Facets from "./Facets";
import ItemGrid from "./ItemGrid";
import SortOrder from "./SortOrder";
import PaginationLoadMore from "./Pagination/PaginationLoadMore";
import Summary from "./Summary";
import PaginationBasic from "./Pagination/PaginationBasic";

type AllProps = {} & withSearchProps;

const Container = (props: AllProps) => {
  return (
    <div className="xo__container">
      <Summary {...props} />
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
