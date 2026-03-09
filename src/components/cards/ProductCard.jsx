import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { GoHeartFill, GoHeart } from "react-icons/go";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleFavorite } from "@/api/favoritesServices";
import useRequireAuth from "@/hooks/useRequireAuth";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import UEAIcon from "@/components/common/UEAIcon";

const ProductCard = ({ product, sale_type = "retail", page = "" }) => {
  const navigate = useNavigate();
  const requireAuth = useRequireAuth();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  // حالة محلية للقلب
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (product?.is_favorite !== undefined) {
      setIsFavorited(product.is_favorite);
    }
  }, [product]);

  // mutation لتبديل المفضلات على السيرفر
  const { mutate: handleToggle, isPending } = useMutation({
    mutationFn: toggleFavorite,
    onSuccess: () => {
      if (page === "favorites") {
        queryClient.invalidateQueries({ queryKey: ["favorites"] });
      }
    },
    onError: () => {
      // لو حصل خطأ نرجع الحالة
      setIsFavorited((prev) => !prev);
    },
  });

  const handleToggleFavorite = () => {
    requireAuth(() => {
      setIsFavorited((prev) => !prev); // تحديث محلي فورًا
      handleToggle({ id: product.id, sale_type }); // تحديث على السيرفر
    });
  };

  return (
    <div
      className="flex flex-col gap-1 cursor-pointer"
      onClick={() =>
        navigate(`/product/${product.slug}?sale_type=${sale_type}`)
      }
    >
      <div className="w-full aspect-square overflow-hidden rounded-xl relative">
        <img
          loading="lazy"
          src={product.main_image}
          alt={product.title}
          className="w-full h-full object-cover"
        />

        {product.for_sale && (
          <button
            onClick={handleToggleFavorite}
            disabled={isPending}
            className="absolute top-2 right-2 z-10 w-8 h-8 
          flex items-center justify-center bg-white text-primary text-xl 
          rounded-full cursor-pointer hover:brightness-95 transition disabled:opacity-50"
          >
            {isFavorited ? <GoHeartFill /> : <GoHeart />}
          </button>
        )}
      </div>

      <h3 className="sm:text-lg font-bold line-clamp-1">{product.name}</h3>

      <div className="flex items-center flex-wrap justify-between gap-2">
        <span className="text-xs sm:text-sm font-semibold flex gap-1 items-center flex-wrap">
          <span>{product.min_weight}</span>
          <strong>-</strong>
          <span>{product.max_weight}</span>
        </span>

        <span className="text-sm sm:text-base text-primary font-extrabold flex gap-1 items-center flex-wrap">
          <span className="flex items-center gap-1">
            {product.min_price} <UEAIcon />
          </span>
          <strong>-</strong>
          <span className="flex items-center gap-1">
            {product.max_price} <UEAIcon />
          </span>
        </span>
      </div>

      <p className="text-xs text-muted-foreground line-clamp-2">
        {product.description}
      </p>

      {product.for_sale && (
        <Button className={`mt-2`}>{t("add_to_cart")}</Button>
      )}
    </div>
  );
};

export default ProductCard;
