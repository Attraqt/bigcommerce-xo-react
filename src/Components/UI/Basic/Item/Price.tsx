import { ItemHandlerProps } from "../../../Data/Item";

const Price = (props: ItemHandlerProps) => {
  return (
    <div className="xo__card-product__price">
      &pound;{props.item.product.price_GBP}
    </div>
  );
};

export default Price;
