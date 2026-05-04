import { addToCart } from "@/api/cartServices";
import UEAIcon from "@/components/common/UEAIcon";
import useRequireAuth from "@/hooks/useRequireAuth";
import { openModal } from "@/store/modals/modalsSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaSpinner } from "react-icons/fa";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import gsap from "gsap";
gsap.registerPlugin(ScrollToPlugin);

const ProductControls = ({ product, mainColor, sale_type }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSizeId, setSelectedSizeId] = useState(null);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 60);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const sizes = product?.items ?? [];

  useEffect(() => {
    if (sizes.length && !selectedSizeId) {
      setSelectedSizeId(sizes[0].id);
    }
  }, [sizes]);

  const selectedSize =
    sizes.find((item) => item.id === selectedSizeId) ?? sizes[0];

  const queryClient = useQueryClient();
  const requireAuth = useRequireAuth();

  const { mutate: addProductToCart, isPending: isPendingCart } = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      dispatch(
        openModal({
          modalName: "addToCartModal",
          modalData: {
            product: {
              name: product?.name,
              image: product?.main_image,
              size: `${selectedSize?.weight} ${selectedSize?.weight_unit}`,
            },
          },
        }),
      );

      queryClient.invalidateQueries({ queryKey: ["cart_count"] });
    },
    onError: () => {
      toast.error(t("productDetails.cartError"));
    },
  });

  const handleAddToCart = () => {
    requireAuth(() => {
      addProductToCart({
        product_item_id: selectedSize.id,
        quantity,
        sale_type,
      });
    });
  };

  const handleScrollClick = () => {
    if (isScrolled) {
      gsap.to(window, { scrollTo: 0, duration: 1.2 });
    } else {
      gsap.to(window, { scrollTo: window.scrollY + 60, duration: 1 });
    }
  };

  if (!product?.for_sale) return;

  return (
    <div className="container flex flex-col md:flex-row justify-between gap-2 lg:gap-4 mt-8 relative z-30">
      <button
        onClick={handleScrollClick}
        className="min-w-38 bg-black text-white px-4 py-2 font-bold text-sm rounded cursor-pointer
              flex items-center justify-center gap-1"
      >
        {isScrolled ? t("scrollUp") : t("scrollDown")}
        <MdKeyboardDoubleArrowDown
          className={`size-6 animate-bounce ${isScrolled ? "rotate-180 -translate-y-1" : "translate-y-1"}`}
        />
      </button>

      <select
        onChange={(e) => setSelectedSizeId(Number(e.target.value))}
        className="border rounded text-center p-1 bg-transparent outline-none"
        style={{ color: mainColor, borderColor: mainColor }}
      >
        {sizes.map((size) => (
          <option className="text-black!" key={size.id} value={size.id}>
            {size.weight} {size.weight_unit}
          </option>
        ))}
      </select>

      <div className="flex gap-2">
        <div
          className="flex items-center border rounded min-w-20"
          style={{ color: mainColor, borderColor: mainColor }}
        >
          <button
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            className="px-2 cursor-pointer text-lg font-medium"
          >
            -
          </button>
          <span className="flex-1 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity((prev) => prev + 1)}
            className="px-2 cursor-pointer text-lg font-medium"
          >
            +
          </button>
        </div>

        <button
          className="flex-1 md:flex-initial bg-black text-white px-4 py-2 font-bold text-sm rounded cursor-pointer
                    flex items-center justify-center gap-1"
          onClick={handleAddToCart}
          disabled={isPendingCart}
        >
          {isPendingCart ? (
            <>
              {t("productDetails.adding")}{" "}
              <FaSpinner className="animate-spin" />
            </>
          ) : (
            <>
              {t("productDetails.addToCart")} -
              <span className="flex items-center gap-1">
                {selectedSize?.price} <UEAIcon className="w-6 h-6 invert" />
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductControls;
