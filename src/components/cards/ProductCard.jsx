import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { GoHeartFill, GoHeart } from "react-icons/go";

const ProductCard = ({ product, sale_type = "retail" }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-2">
      <div className="w-full aspect-square overflow-hidden rounded-lg relative">
        <img
          src={product.main_image}
          alt={product.title}
          className="w-full h-full object-cover"
        />

        <button
          className="absolute top-2 right-2 z-10 w-8 h-8 
          flex items-center justify-center bg-white text-primary text-xl 
          rounded-full cursor-pointer hover:brightness-95 transition"
        >
          <GoHeartFill />
        </button>
      </div>

      <h3 className="text-lg font-bold line-clamp-1">{product.title}</h3>

      <div className="flex items-center flex-wrap justify-between gap-2">
        <span className="text-sm font-semibold">
          <span>{product.min_weight}</span> - <span>{product.max_weight}</span>
        </span>

        <span className="text-primary font-bold">
          <span>{product.min_price}</span> AED -{" "}
          <span>{product.max_price}</span> AED
        </span>
      </div>

      <p className="text-xs text-muted-foreground line-clamp-2">
        {product.description}
      </p>

      <Button
        onClick={() =>
          navigate(`/product/${product.slug}?sale_type=${sale_type}`)
        }
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;
