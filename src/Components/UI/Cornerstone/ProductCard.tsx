import { ItemHandlerProps } from "../../Data/Item";

const ProductCard = (props: ItemHandlerProps) => {
  return (
    <article className="card">
      <figure className="card-figure">
        <a className="card-figure__link" href={props.item.product?.custom_url}>
          <div className="card-img-container">
            <img className="card-image" src={props.item.product.photo} />
          </div>
        </a>
      </figure>
      <div className="card-body">
        {props.item.product?.Brand && (
          <p className="card-text">{props.item.product?.Brand}</p>
        )}
        <h3 className="card-title">
          <a href={props.item.product?.custom_url}>
            {props.item.product?.title}
          </a>
        </h3>
        <div className="card-text">£{props.item.product?.price_GBP}</div>
      </div>
    </article>
  );
};

export default ProductCard;
