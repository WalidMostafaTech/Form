import UEAIcon from "@/components/common/UEAIcon";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { HiCalendarDateRange } from "react-icons/hi2";
import { Button } from "../ui/button";

const OrderCard = ({ item }) => {
  const [showDetails, setShowDetails] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const { t } = useTranslation();

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

              <p className="text-primary text-lg flex items-center gap-1">
                {item?.order_items[0]?.price} <UEAIcon />
              </p>
            </div>

            <div
              className="text-muted-foreground rich_content"
              dangerouslySetInnerHTML={{
                __html: item?.order_items[0]?.description,
              }}
            />
          </>
        )}

        <div className="flex items-center flex-wrap justify-between gap-2">
          <p className="text-lg font-bold text-primary flex items-center gap-1">
            {item.final_total} <UEAIcon />
          </p>

          {showDetails && (
            <p
              className="text-primary bg-primary-foreground py-1 px-2 rounded-md 
            min-w-14 text-center text-lg font-semibold border"
            >
              {item.order_items_count}
            </p>
          )}
        </div>

        <div className="flex items-center flex-wrap justify-end gap-2">
          <Button
            size="xs"
            onClick={() => {
              window.open(item.invoice_file, "_blank");
            }}
          >
            {t("DownloadInvoice")}
          </Button>

          <Button
            size="xs"
            variant={showDetails ? "destructive" : "outline"}
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? t("HideDetails") : t("ViewDetails")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
