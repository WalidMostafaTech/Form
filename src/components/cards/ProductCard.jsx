import { Link } from "react-router";

const ProductCard = ({ product }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="w-full aspect-square overflow-hidden rounded-lg">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="text-lg font-bold line-clamp-1">{product.title}</h3>

      <div className="flex items-center flex-wrap justify-between gap-2">
        <span className="text-xs">
          <span className="font-bold">{product.min_weight}</span> GM -{" "}
          <span className="font-bold">{product.max_weight}</span> GM
        </span>

        <span className="text-primary font-bold">{product.price} AED</span>
      </div>

      <p className="text-xs text-muted-foreground line-clamp-2">
        {product.description}
      </p>

      <Link to={`/product/${product.id}`} className="bg-primary text-primary-foreground text-center text-sm font-bold py-2 rounded-md w-full cursor-pointer">
        Add to Cart
      </Link>
    </div>
  );
};

export default ProductCard;
