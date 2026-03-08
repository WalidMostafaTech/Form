import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { GoHeartFill, GoHeart } from "react-icons/go";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleFavorite } from "@/api/favoritesServices";
import { addToCart } from "@/api/cartServices";
import { useNavigate, useSearchParams } from "react-router";
import useRequireAuth from "@/hooks/useRequireAuth";
import { toast } from "sonner";
import OptionSelector from "@/components/common/OptionSelector";

const ProductDetails = ({ product }) => {
  const navigate = useNavigate();
  const requireAuth = useRequireAuth();

  const [quantity, setQuantity] = useState(1);
  const [selectedSizeId, setSelectedSizeId] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (product?.is_favorite !== undefined) {
      setIsFavorited(product.is_favorite);
    }
  }, [product]);

  const items = product?.items ?? [];
  const selectedSize =
    items.find((item) => item.id === selectedSizeId) ?? items[0];

  const [searchParams] = useSearchParams();
  const sale_type = searchParams.get("sale_type") || "retail";

  const queryClient = useQueryClient();
  const [actionType, setActionType] = useState(null);

  // Mutation لتبديل المفضلات
  const { mutate: handleToggle, isPending } = useMutation({
    mutationFn: toggleFavorite,
    onError: () => {
      toast.error("Failed to toggle favorite!");
      setIsFavorited((prev) => !prev); // إعادة الحالة لو حصل خطأ
    },
  });

  // Mutation لإضافة المنتج للسلة
  const { mutate: addProductToCart, isPending: isPendingCart } = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      toast.success("Product added to cart successfully!");

      if (actionType === "buy") {
        navigate(`/cart?sale_type=${sale_type}`);
      }

      queryClient.invalidateQueries({ queryKey: ["cart_count"] });
    },
    onError: () => {
      toast.error("Failed to add product to cart!");
    },
    onSettled: () => {
      setActionType(null);
    },
  });

  const handleToggleFavorite = () => {
    requireAuth(() => {
      setIsFavorited((prev) => !prev); // تحديث محلي فورًا
      handleToggle({ id: product.id, sale_type }); // تحديث على السيرفر
    });
  };

  const handleAddToCart = () => {
    requireAuth(() => {
      setActionType("cart");

      addProductToCart({
        product_item_id: selectedSize.id,
        quantity,
        sale_type,
      });
    });
  };

  const handleBuyNow = () => {
    requireAuth(() => {
      setActionType("buy");

      addProductToCart({
        product_item_id: selectedSize.id,
        quantity,
        sale_type,
      });
    });
  };

  return (
    <section className="space-y-6 xl:col-span-2">
      {/* Title */}
      <h2 className="text-3xl font-bold">{product?.name}</h2>

      {/* Weights / Sizes */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <OptionSelector
          options={product?.items}
          selected={selectedSize?.id}
          onSelect={(size) => setSelectedSizeId(size.id)}
          getLabel={(size) => `${size.weight} ${size.weight_unit}`}
        />

        <span className="text-2xl font-bold text-primary bg-primary-foreground rounded-md px-2 py-1">
          {selectedSize?.price} AED
        </span>
      </div>

      {/* Quantity */}
      {product.for_sale && (
        <div className="flex items-center gap-2 border rounded w-fit">
          <button
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition cursor-pointer"
          >
            <FiMinus />
          </button>
          <span className="min-w-8 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity((prev) => prev + 1)}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition cursor-pointer"
          >
            <FiPlus />
          </button>
        </div>
      )}

      {/* Description */}
      <div>
        <h3 className="font-semibold mb-2">Description</h3>
        <div
          className="text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: product?.description }}
        />
      </div>

      {/* Buttons */}
      {product.for_sale && (
        <div className="flex flex-wrap gap-2">
          <div className="flex-1 flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleToggleFavorite}
              disabled={isPending}
            >
              {isFavorited ? <GoHeartFill /> : <GoHeart />}
            </Button>
            <Button
              onClick={handleAddToCart}
              className="flex-1"
              variant="outline"
              disabled={isPendingCart}
            >
              {actionType === "cart" && isPendingCart
                ? "Adding..."
                : "ADD TO CART"}
            </Button>
          </div>

          <Button
            onClick={handleBuyNow}
            className="flex-1"
            disabled={isPendingCart}
          >
            {actionType === "buy" && isPendingCart
              ? "Processing..."
              : "BUY NOW"}
          </Button>
        </div>
      )}

      {/* Accordion */}
      <Accordion type="multiple" collapsible="true" className="border-y">
        <AccordionItem value="shipping">
          <AccordionTrigger className={`cursor-pointer`}>
            Shipping and dispatch information
          </AccordionTrigger>
          <AccordionContent>
            <div
              className="text-sm text-muted-foreground"
              dangerouslySetInnerHTML={{
                __html: product?.shipping_and_dispatch_information,
              }}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="details">
          <AccordionTrigger className={`cursor-pointer`}>
            More details
          </AccordionTrigger>
          <AccordionContent>
            <div
              className="text-sm text-muted-foreground"
              dangerouslySetInnerHTML={{
                __html: product?.more_details,
              }}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="notes">
          <AccordionTrigger className={`cursor-pointer`}>
            Additional notes
          </AccordionTrigger>
          <AccordionContent>
            <div
              className="text-sm text-muted-foreground"
              dangerouslySetInnerHTML={{
                __html: product?.additional_notes,
              }}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default ProductDetails;
