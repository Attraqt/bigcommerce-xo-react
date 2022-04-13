import { ItemGridProps } from "../../Data/Item";
import ContentCard from "../Basic/Item/ContentCard";
import ProductCard from "./ProductCard";

const ItemGrid = (props: ItemGridProps) => {
  const productCount = props.items.length;
  const ContentCardComponent = props.componentMap?.contentCard ?? ContentCard;
  const ProductCardComponent = props.componentMap?.productCard ?? ProductCard;

  return (
    <ul className="productGrid">
      {productCount > 0 ? (
        // eslint-disable-next-line lodash/prefer-lodash-method
        props.items.map((item, index) => {
          return (
            <li className="product" key={index}>
              {item.kind == "content" ? (
                <ContentCardComponent item={item} isLoading={props.isLoading} />
              ) : (
                <ProductCardComponent item={item} isLoading={props.isLoading} />
              )}
            </li>
          );
        })
      ) : (
        <li>No items found.</li>
      )}
    </ul>
  );
};

export default ItemGrid;
