import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Link } from "react-router";

const AddToCartModal = ({ open, setOpen, product }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="fixed! top-0 right-0 left-auto rounded-none! translate-x-0 translate-y-0 
        w-full max-w-sm! overflow-hidden bg-secondary"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm uppercase">Added to cart:</h3>
          </div>

          {/* Content */}
          <div className="flex gap-3 items-center">
            <img
              src={product?.main_image}
              alt={product?.name}
              className="w-20 aspect-square object-cover"
            />

            <div className="flex flex-col gap-1">
              <p className="font-medium">{product?.name}</p>
              <p className="text-sm">5lbs</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Link to="/cart" className="w-full text-center bg-black text-white py-3 uppercase">
          View cart
        </Link>
      </DialogContent>
    </Dialog>
  );
};

export default AddToCartModal;
