/* eslint-disable react/no-unescaped-entities */
import { withSearchProps } from "../../WithSearch";
import { Configuration } from "./Configuration";

type ContainerProps = { config: Configuration } & withSearchProps;

const ConfigurableContainer = (props: ContainerProps) => {
  const SortOrder = props.config.componentMap.sort;
  const ItemGrid = props.config.componentMap.grid;
  const Pagination = props.config.componentMap.pagination;
  const Facets = props.config.componentMap.facets;
  const Summary = props.config.componentMap.summary;

  return (
    <div className="xo__container">
      <Summary {...props} />
      <SortOrder
        active={props.activeSortOrder}
        setActive={props.setActiveSortOrder}
        isLoading={props.loading}
      />
      <Facets
        active={props.selectedFacets}
        available={props.facets}
        setActive={props.setSelectedFacets}
        isLoading={props.loading}
      />
      <ItemGrid
        items={props.items}
        componentMap={{
          contentCard: props.config.componentMap.contentCard,
          productCard: props.config.componentMap.productCard,
        }}
        isLoading={props.loading}
      />
      <Pagination
        current={props.currentPage}
        total={props.totalPages}
        setCurrent={props.setCurrentPage}
        isLoading={props.loading}
      />
    </div>
  );
};

export default ConfigurableContainer;
