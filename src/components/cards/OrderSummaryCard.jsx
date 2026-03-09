import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import UEAIcon from "@/components/common/UEAIcon";

const OrderSummaryCard = ({ cart, onConfirm, loading }) => {
  const { t } = useTranslation();

  if (!cart?.cart_items?.length) return null;

  return (
    <div className="md:w-75 lg:w-96 p-3 space-y-4 border rounded-lg h-max bg-primary-foreground sticky top-20">
      <h2 className="text-xl font-bold">{t("OrderSummaryCard.title")}</h2>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2 mb-2">
          <p className="text-muted-foreground">
            {t("OrderSummaryCard.subtotal")}
          </p>
          <span className="font-bold text-primary flex items-center gap-1">
            {cart?.sub_total} <UEAIcon />
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <p className="text-muted-foreground">
            {t("OrderSummaryCard.deliveryFees")}
          </p>
          <span className="font-bold text-primary flex items-center gap-1">
            {cart?.shipping_price} <UEAIcon />
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <p className="text-muted-foreground flex items-center gap-1">
            <span>{t("OrderSummaryCard.vat")}</span>{" "}
            <strong>{cart?.tax_rate}%</strong>
          </p>
          <span className="font-bold text-primary flex items-center gap-1">
            {cart?.tax_amount} <UEAIcon />
          </span>
        </div>
      </div>

      <p className="text-2xl font-bold text-primary pt-2 border-t-2 flex items-center gap-1">
        {cart?.final_total} <UEAIcon className="w-6 h-6" />
      </p>

      <Button disabled={loading} onClick={onConfirm} className="w-full">
        {loading
          ? t("OrderSummaryCard.confirming")
          : t("OrderSummaryCard.confirmOrder")}
      </Button>
    </div>
  );
};

export default OrderSummaryCard;
