import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import UEAIcon from "@/components/common/UEAIcon";
import { useNavigate, useSearchParams } from "react-router";

const OrderSummaryCard = ({ cart, onConfirm, loading }) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const sale_type = searchParams.get("sale_type") || "retail";

  if (!cart?.cart_items?.length) return null;

  return (
    <div className="md:w-75 lg:w-96 p-3 space-y-4 border rounded-lg h-max bg-primary-foreground sticky top-32">
      <h2 className="text-xl  text-primary">{t("OrderSummaryCard.title")}</h2>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2 mb-2">
          <p className="text-muted-foreground">
            {t("OrderSummaryCard.subtotal")}
          </p>
          <span className=" text-primary flex items-center gap-1">
            {cart?.sub_total} <UEAIcon />
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <p className="text-muted-foreground">
            {t("OrderSummaryCard.deliveryFees")}
          </p>
          <span className=" text-primary flex items-center gap-1">
            {cart?.shipping_price} <UEAIcon />
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <p className="text-muted-foreground flex items-center gap-1">
            <span>{t("OrderSummaryCard.tax")}</span>{" "}
            <strong>{cart?.tax_rate}%</strong>
          </p>
          <span className=" text-primary flex items-center gap-1">
            {cart?.tax_amount} <UEAIcon />
          </span>
        </div>
      </div>

      <p className="text-2xl  text-primary pt-2 border-t-2 flex items-center gap-1">
        {cart?.final_total} <UEAIcon className="w-6 h-6" />
      </p>

      <div className="space-y-2">
        <Button disabled={loading} onClick={onConfirm} className="w-full">
          {loading
            ? t("OrderSummaryCard.confirming")
            : t("OrderSummaryCard.confirmOrder")}
        </Button>

        <Button
          variant="outline"
          onClick={() => navigate(`/shop?sale_type=${sale_type}`)}
          className="w-full"
        >
          {t("OrderSummaryCard.addMoreProducts")}
        </Button>
      </div>
    </div>
  );
};

export default OrderSummaryCard;
