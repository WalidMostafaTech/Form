import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { GoHeartFill, GoHeart } from "react-icons/go";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleFavorite } from "@/api/favoritesServices";
import useRequireAuth from "@/hooks/useRequireAuth";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import UEAIcon from "@/components/common/UEAIcon";
import AddToCartModal from "../modals/AddToCartModal";

const ProductCard = ({ product, sale_type = "retail", page = "" }) => {
  const navigate = useNavigate();
  const requireAuth = useRequireAuth();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const [showSize, setShowSize] = useState(false);
  const [openModal, setOpenModal] = useState(false);

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

  const handleToggleFavorite = (e) => {
    e.stopPropagation(); // لمنع التنقل عند الضغط على القلب
    requireAuth(() => {
      setIsFavorited((prev) => !prev); // تحديث محلي فورًا
      handleToggle({ id: product.id, sale_type }); // تحديث على السيرفر
    });
  };

  const handleShowSize = (e) => {
    e.stopPropagation();
    setShowSize(true);
  };

  return (
    <>
      <div
        className="flex flex-col gap-2 cursor-pointer group"
        onClick={() =>
          navigate(`/product/${product.slug}?sale_type=${sale_type}`)
        }
      >
        <div className="w-full aspect-square overflow-hidden relative mb-2">
          <img
            loading="lazy"
            src={product.main_image}
            alt={product.title}
            className="w-full h-full object-cover"
          />

          {product?.for_sale && (
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

          {product?.for_sale && (
            <div className="absolute bottom-0 left-0 z-10 w-full p-2 opacity-0 group-hover:opacity-100 transition">
              {showSize ? (
                <div className="w-full flex items-center justify-center">
                  {Array.from({ length: 4 }, (_, i) => (
                    <span
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenModal(true);
                      }}
                      className="flex-1 text-center p-2 bg-secondary text-black not-last:border-e border-primary
                      hover:bg-primary hover:text-white transition cursor-pointer"
                    >
                      15 KG
                    </span>
                  ))}
                </div>
              ) : (
                <button
                  onClick={handleShowSize}
                  className={`w-full bg-primary cursor-pointer text-white p-2 text-center uppercase
                hover:bg-primary/90 transition`}
                >
                  + {t("quick_add")}
                </button>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-2">
          <h3 className="line-clamp-1">{product.name}</h3>
          <span className="flex items-center gap-1">
            {product.min_price} <UEAIcon />
          </span>
        </div>

        <p className="text-xs line-clamp-2">{product.description}</p>
      </div>

      <AddToCartModal
        open={openModal}
        setOpen={setOpenModal}
        product={product}
      />
    </>
  );
};

export default ProductCard;
