import UEAIcon from "@/components/common/UEAIcon";
import { useTranslation } from "react-i18next";
import { HiCalendarDateRange } from "react-icons/hi2";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const OrderCard = ({ item }) => {
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

        <p className="py-1 px-2 w-fit text-xs text-primary bg-primary-foreground rounded-md">
          {item.status}
        </p>

        <p className="flex flex-wrap items-center gap-2">
          {t("OrderCode")} :
          <span className="text-primary font-semibold">{item.order_code}</span>
        </p>

        <div className="flex items-center gap-2">
          <span className="p-1 text-lg text-primary bg-primary-foreground rounded-md">
            <HiCalendarDateRange />
          </span>
          <p>{formatDate(item.created_at)}</p>
        </div>

        <div className="flex items-center flex-wrap justify-between gap-2">
          <p className="text-lg  text-primary flex items-center gap-1">
            {item.final_total} <UEAIcon />
          </p>
        </div>

        <div className="flex items-center flex-wrap justify-end gap-2">
          {item.invoice_file && (
            <Button
              size="xs"
              onClick={() => {
                window.open(item.invoice_file, "_blank");
              }}
            >
              {t("DownloadInvoice")}
            </Button>
          )}

          <Dialog>
            <DialogTrigger asChild>
              <Button size="xs" variant={"outline"}>
                {t("ViewDetails")}
              </Button>
            </DialogTrigger>
            <DialogContent className="lg:max-w-xl">
              <DialogHeader>
                <DialogTitle className={`text-start`}>
                  {t("OrderDetails")}{" "}
                  <span className="text-primary text-sm">
                    ( {t("OrderCount")} {item.order_items_count})
                  </span>
                </DialogTitle>
                <DialogDescription>
                  <p className="flex flex-wrap items-center gap-2">
                    {t("OrderCode")} :
                    <span className="text-primary font-semibold">
                      {item.order_code}
                    </span>
                  </p>
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-2 custom_scrollbar max-h-[60vh] overflow-y-auto">
                {item.order_items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 border rounded-lg items-start flex gap-4"
                  >
                    <div className="w-28 aspect-square overflow-hidden rounded-lg">
                      <img
                        loading="lazy"
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 font-semibold flex flex-col justify-between gap-2 h-full">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-lg  line-clamp-2">{item.name}</h3>
                      </div>

                      <p>
                        {item.weight} {item.weight_unit}
                      </p>

                      <p className=" text-primary text-lg flex items-center gap-1">
                        {item.price} <UEAIcon />
                      </p>

                      <div
                        className="text-gray-600 text-sm"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      />

                      <div className="flex items-center flex-wrap justify-between gap-2">
                        <span className="p-1 min-w-16 text-lg text-center font-semibold text-primary bg-primary-foreground rounded-md border">
                          {item.quantity}
                        </span>

                        <p className="text-3xl font-semibold text-primary flex items-center gap-1">
                          {item.price * item.quantity}{" "}
                          <UEAIcon className="w-7 h-7" />
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button>{t("close")}</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
