import { Button } from "../ui/button";

const OrderSummaryCard = () => {
  return (
    <div className="md:w-75 lg:w-96 p-3 space-y-4 border rounded-lg h-max bg-primary-foreground sticky top-20">
      <h2 className="text-xl font-bold">Order Summary</h2>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-bold text-primary">1200 AED</span>
        </div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-muted-foreground">Delivery Fees</span>
          <span className="font-bold text-primary">50 AED</span>
        </div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-muted-foreground">Vat 5%</span>
          <span className="font-bold text-primary">50 AED</span>
        </div>
      </div>

      <p className="text-2xl font-bold text-primary pt-2 border-t-2">
        1250 AED
      </p>
      <Button className={`w-full`}>Buy Now</Button>
    </div>
  );
};

export default OrderSummaryCard;
