import { withSearchProps } from "../../WithSearch";

const Summary = (props: withSearchProps) => {
  return (
    <p className="xo__summary">
      Showing {props.pageItemNumberStart} - {props.pageItemNumberEnd} of{" "}
      {props.totalItems} results for "{props.query}".
    </p>
  );
};

export default Summary;
