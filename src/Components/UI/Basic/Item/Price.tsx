import { ItemHandlerProps } from "../../../Data/Item";

const Price = (props: ItemHandlerProps) => {
  return (
    <div className="xo__card-product__price">
      &pound;{props.item.product.price}
    </div>
  );
};

export default Price;
