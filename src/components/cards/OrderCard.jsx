import { useState } from "react";
import { HiCalendarDateRange } from "react-icons/hi2";

const OrderCard = ({ item }) => {
  const [showDetails, setShowDetails] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div key={item.id} className="p-3 border rounded-lg flex items-start gap-4">
      <div className="w-24 md:w-32 aspect-square overflow-hidden rounded-lg">
        <img
          loading="lazy"
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 space-y-2 text-sm">
        <h3 className="text-lg font-semibold line-clamp-2">{item.name}</h3>
        <p>{item.weight}</p>

        {!showDetails && (
          <>
            <p className="py-1 px-2 w-fit text-xs text-primary bg-primary-foreground rounded-md">
              {item.status}
            </p>

            <div className="flex items-center gap-2">
              <span className="p-1 text-lg text-primary bg-primary-foreground rounded-md">
                <HiCalendarDateRange />
              </span>
              <p>{formatDate(item.created_at)}</p>
            </div>
          </>
        )}

        {showDetails && (
          <>
            <div className="flex items-center justify-between flex-wrap gap-2 font-semibold">
              <p>
                {item?.order_items[0]?.weight}{" "}
                {item?.order_items[0]?.weight_unit}
              </p>

              <p className="text-primary text-lg">
                {item?.order_items[0]?.price} AED
              </p>
            </div>

            <div
              className="text-muted-foreground"
              dangerouslySetInnerHTML={{
                __html: item?.order_items[0]?.description,
              }}
            />
          </>
        )}

        <div className="flex items-center flex-wrap justify-between gap-2">
          <p className="text-lg font-bold text-primary">
            {item.final_total} AED
          </p>

          {showDetails && (
            <p
              className="text-primary bg-primary-foreground py-1 px-2 rounded-md 
            min-w-10 text-center font-semibold border"
            >
              {item.order_items_count}
            </p>
          )}

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="py-1 px-2 rounded-md border border-primary text-primary
                      bg-white cursor-pointer hover:brightness-90 transition"
          >
            {showDetails ? "Hide Details" : "View Details"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
