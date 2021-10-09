import { ItemHandlerProps } from "../../../Data/Item";
import Price from "./Price";

const ProductCard = (props: ItemHandlerProps) => {
  return (
    <div className="xo__card-product">
      <img src={props.item.product.photo} />
      <p>{props.item.product?.title}</p>
      <Price {...props} />
    </div>
  );
};

export default ProductCard;
