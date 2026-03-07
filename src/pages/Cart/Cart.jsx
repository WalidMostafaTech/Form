import PageBanner from "@/components/commonSections/PageBanner";
import CartCard from "@/components/cards/CartCard";
import OrderSummaryCard from "@/components/cards/OrderSummaryCard";
import { Textarea } from "@/components/ui/textarea";
import { confirmOrder, getCart, getCartHero } from "@/api/cartServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import EmptyDataSection from "@/components/commonSections/EmptyDataSection";
import { toast } from "sonner";
import CartPageSkeleton from "@/components/Loading/SkeletonLoading/CartSkeletonPage";

const Cart = () => {
  const textareaRef = useRef(null);

  const { data: cartHero, isLoading: isLoadingHero } = useQuery({
    queryKey: ["cartHero"],
    queryFn: getCartHero,
  });

  const { data: cart, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  const queryClient = useQueryClient();

  const { mutate: createOrder, isPending } = useMutation({
    mutationFn: confirmOrder,
    onSuccess: () => {
      toast.success("Order confirmed successfully!");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      textareaRef.current.value = "";
    },
    onError: () => {},
  });

  const isCartEmpty = !isLoading && (cart?.cart_items?.length === 0 || !cart);

  return (
    <main>
      <PageBanner
        image={cartHero?.image}
        title={"cart"}
        description={cartHero?.description}
        loading={isLoadingHero}
      />

      {isLoading ? (
        <CartPageSkeleton />
      ) : isCartEmpty ? (
        <EmptyDataSection msg={"Cart is empty"} />
      ) : (
        <section className="container pagePadding">
          <div className="flex flex-col md:flex-row gap-4 lg:gap-8">
            <div className="space-y-4 flex-1">
              {cart?.cart_items?.map((item) => (
                <CartCard key={item.id} item={item} />
              ))}
            </div>

            <OrderSummaryCard
              cart={cart}
              onConfirm={() =>
                createOrder({ comment: textareaRef.current?.value.trim() })
              }
              loading={isPending}
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="comment"
              className="inline-block mb-1 text-sm font-medium text-gray-900"
            >
              Comment
            </label>

            <Textarea
              ref={textareaRef}
              name="comment"
              id="comment"
              placeholder={`add comment`}
              className={`bg-muted`}
            />
          </div>
        </section>
      )}
    </main>
  );
};

export default Cart;
