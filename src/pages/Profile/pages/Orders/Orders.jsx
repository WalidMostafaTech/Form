import SectionTitle from "@/components/common/SectionTitle";
import OrderCard from "@/components/cards/OrderCard";
import { getOrders } from "@/api/cartServices";
import { useQuery } from "@tanstack/react-query";
import MyOrdersSkeleton from "@/components/Loading/SkeletonLoading/MyOrdersSkeleton";
import { useState } from "react";
import OptionSelector from "@/components/common/OptionSelector";

const Orders = () => {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  const [selectedStatus, setSelectedStatus] = useState("all");

  const filterList = [
    {
      id: 1,
      name: "all",
    },
    {
      id: 2,
      name: "pending",
    },
    {
      id: 3,
      name: "completed",
    },
    {
      id: 4,
      name: "cancelled",
    },
  ];

  return (
    <div className="space-y-6">
      <SectionTitle title="My Orders" />

      <OptionSelector
        options={filterList}
        selected={selectedStatus}
        onSelect={(item) => setSelectedStatus(item.name)}
        getLabel={(item) => item.name}
        getValue={(item) => item.name}
      />

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
