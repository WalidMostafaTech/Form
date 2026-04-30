import { Dialog, DialogContent } from "@/components/ui/dialog";
import { closeModal } from "@/store/modals/modalsSlice";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";

const AddToCartModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { modalName, modalData } = useSelector((state) => state.modals);
  const { product } = modalData || {};

  const onClose = () => {
    dispatch(closeModal());
  };

  return (
    <Dialog open={modalName === "addToCartModal"} onOpenChange={onClose}>
      <DialogContent
        className="fixed! top-0 right-0 left-auto rounded-none! translate-x-0 translate-y-0 
        w-full max-w-sm! overflow-hidden bg-white"
      >
        <div>
          {/* Header */}
          <h3 className="font-medium text-sm uppercase mb-4">
            {t("AddToCartModal.addedToCart")}
          </h3>

          {/* Content */}
          <div className="flex gap-3 items-center">
            {product?.image && (
              <img
                src={product?.image}
                alt={product?.name}
                className="w-20 aspect-square object-cover"
              />
            )}

            <div className="flex flex-col gap-1">
              <p className="font-medium">{product?.name}</p>
              <p className="text-sm">{product?.size}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Link
          to="/cart"
          onClick={onClose}
          className="w-full text-center bg-black text-white py-3 uppercase"
        >
          {t("AddToCartModal.viewCart")}
        </Link>
      </DialogContent>
    </Dialog>
  );
};

export default AddToCartModal;
