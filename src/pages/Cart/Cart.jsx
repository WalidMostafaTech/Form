import PageBanner from "@/components/commonSections/PageBanner";
import image from "@/assets/images/product-img.png";
import CartCard from "@/components/cards/CartCard";
import OrderSummaryCard from "@/components/cards/OrderSummaryCard";
import { Textarea } from "@/components/ui/textarea";
import { getCartHero } from "@/api/cartServices";
import { useQuery } from "@tanstack/react-query";

const Cart = () => {
  const cartItems = [
    {
      id: 1,
      name: "Copper Brew Kit",
      price: 200,
      weight: "250 GM - 1000 GM",
      image: image,
      quantity: 6,
    },
    {
      id: 2,
      name: "Copper Brew Kit",
      price: 200,
      weight: "250 GM - 1000 GM",
      image: image,
      quantity: 4,
    },
  ];

  const { data: cartHero, isLoading: isLoadingHero } = useQuery({
    queryKey: ["cartHero"],
    queryFn: getCartHero,
  });

  return (
    <main>
      <PageBanner
        image={cartHero?.image}
        title={"cart"}
        description={cartHero?.description}
      />

      <section className="container pagePadding">
        <div className="flex flex-col md:flex-row gap-4 lg:gap-8">
          <div className="space-y-4 flex-1">
            {cartItems.map((item) => (
              <CartCard key={item.id} item={item} />
            ))}
          </div>

          <OrderSummaryCard />
        </div>

        <div className="mt-4">
          <label
            htmlFor="comment"
            className="inline-block mb-1 text-sm font-medium text-gray-900"
          >
            Comment
          </label>

          <Textarea
            id="comment"
            placeholder={`add comment`}
            className={`bg-muted`}
          />
        </div>
      </section>
    </main>
  );
};

export default Cart;
