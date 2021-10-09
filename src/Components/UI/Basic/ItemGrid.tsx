import { ItemGridProps } from "../../Data/Item";
import ContentCard from "./Item/ContentCard";
import ProductCard from "./Item/ProductCard";

const ItemGrid = (props: ItemGridProps) => {
  const productCount = props.items.length;
  return (
    <ul className="xo__item-grid">
      {productCount > 0 ? (
        props.items.map((item, index) => {
          return (
            <li key={index}>
              {item.kind == "content" ? (
                <ContentCard item={item} />
              ) : (
                <ProductCard item={item} />
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
