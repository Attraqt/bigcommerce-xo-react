import { ItemGridProps } from "../../Data/Item";
import ContentCard from "./Item/ContentCard";
import ProductCard from "./Item/ProductCard";

const ItemGrid = (props: ItemGridProps) => {
  const productCount = props.items.length;
  const ContentCardComponent = props.componentMap?.contentCard ?? ContentCard;
  const ProductCardComponent = props.componentMap?.productCard ?? ProductCard;

  return (
    <ul className="xo__item-grid">
      {productCount > 0 ? (
        props.items.map((item, index) => {
          return (
            <li key={index}>
              {item.kind == "content" ? (
                <ContentCardComponent item={item} />
              ) : (
                <ProductCardComponent item={item} />
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
