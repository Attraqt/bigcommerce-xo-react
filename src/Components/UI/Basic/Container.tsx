/* eslint-disable react/no-unescaped-entities */
import { withSearchProps } from "../../WithSearch";
import FacetContainer from "./FacetContainer";
import ItemGrid from "./ItemGrid";
import SortOrder from "./SortOrder";
import Summary from "./Summary";
import PaginationBasic from "./Pagination/PaginationBasic";

type AllProps = {} & withSearchProps;

const Container = (props: AllProps) => {
  return (
    <div className="xo__container">
      <Summary {...props} />
      <SortOrder
        active={props.activeSortOrder}
        setActive={props.setActiveSortOrder}
        isLoading={props.loading}
      />
      <FacetContainer
        active={props.selectedFacets}
        available={props.facets}
        setActive={props.setSelectedFacets}
        isLoading={props.loading}
      />
      <ItemGrid items={props.items} isLoading={props.loading} />
      <PaginationBasic
        current={props.currentPage}
        total={props.totalPages}
        setCurrent={props.setCurrentPage}
        isLoading={props.loading}
      />
    </div>
  );
};

export default Container;
