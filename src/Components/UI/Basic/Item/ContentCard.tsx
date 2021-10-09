import { ItemHandlerProps } from "../../../Data/Item";
import Price from "./Price";

const ContentCard = (props: ItemHandlerProps) => {
  return (
    <div className="xo__card-content">
      <img src={props.item.product.photo} />
    </div>
  );
};

export default ContentCard;
