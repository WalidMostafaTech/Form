import { Button } from "../ui/button";

const OrderSummaryCard = ({ cart, onConfirm, loading }) => {
  if (!cart?.cart_items?.length) return null;

  return (
    <div className="md:w-75 lg:w-96 p-3 space-y-4 border rounded-lg h-max bg-primary-foreground sticky top-20">
      <h2 className="text-xl font-bold">Order Summary</h2>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2 mb-2">
          <p className="text-muted-foreground">Subtotal</p>
          <span className="font-bold text-primary">{cart?.sub_total} AED</span>
        </div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <p className="text-muted-foreground">Delivery Fees</p>
          <span className="font-bold text-primary">
            {cart?.shipping_price} AED
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <p className="text-muted-foreground flex items-center gap-1">
            <span>Vat</span> <strong>{cart?.tax_rate}%</strong>
          </p>
          <span className="font-bold text-primary">{cart?.tax_amount} AED</span>
        </div>
      </div>

      <p className="text-2xl font-bold text-primary pt-2 border-t-2">
        {cart?.final_total} AED
      </p>

      <Button disabled={loading} onClick={onConfirm} className={`w-full`}>
        {loading ? "confirming..." : "Confirm Order"}
      </Button>
    </div>
  );
};

export default OrderSummaryCard;
