import SectionTitle from "@/components/common/SectionTitle";
import image from "@/assets/images/product-img.png";
import OrderCard from "@/components/cards/OrderCard";
import { getOrders } from "@/api/cartServices";
import { useQuery } from "@tanstack/react-query";
import MyOrdersSkeleton from "@/components/Loading/SkeletonLoading/MyOrdersSkeleton";

const Orders = () => {
  // const orders = [
  //   {
  //     id: 1,
  //     name: "Copper Brew Kit",
  //     price: 200,
  //     weight: "250 GM - 1000 GM",
  //     image: image,
  //     quantity: 6,
  //   },
  //   {
  //     id: 2,
  //     name: "Copper Brew Kit",
  //     price: 200,
  //     weight: "250 GM - 1000 GM",
  //     image: image,
  //     quantity: 4,
  //   },
  // ];

  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  return (
    <div className="space-y-6">
      <SectionTitle title="My Orders" />

      {isLoading ? (
        <MyOrdersSkeleton />
      ) : orders?.length === 0 ? (
        <p>Orders not found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {orders?.map((item) => (
            <OrderCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
