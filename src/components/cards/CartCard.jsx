import { RiEdit2Line, RiDeleteBinLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { openModal } from "@/store/modals/modalsSlice";
import { useTranslation } from "react-i18next";
import UEAIcon from "@/components/common/UEAIcon";

const CartCard = ({ item }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <div className="p-3 border rounded-lg flex items-start gap-4">
      <div className="w-24 md:w-32 aspect-square overflow-hidden rounded-lg">
        <img
          loading="lazy"
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 space-y-2 text-sm">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold line-clamp-2">{item.name}</h3>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                dispatch(
                  openModal({
                    modalName: "updateCartItemModal",
                    modalData: {
                      item_id: item.id,
                      item_quantity: item.quantity,
                    },
                  }),
                )
              }
              className="w-7 h-7 flex items-center justify-center 
                  bg-primary-foreground text-primary rounded-full hover:brightness-95 transition"
            >
              <RiEdit2Line />
            </button>

            <button
              onClick={() =>
                dispatch(
                  openModal({
                    modalName: "deleteCartItemModal",
                    modalData: { item_id: item.id },
                  }),
                )
              }
              className="w-7 h-7 flex items-center justify-center 
                  bg-red-100 text-red-600 rounded-full hover:brightness-95 transition"
            >
              <RiDeleteBinLine />
            </button>
          </div>
        </div>

        <p>
          {item.weight} {item.weight_unit}
        </p>

        <p className="font-bold text-primary flex items-center gap-1">
          {item.price} <UEAIcon />
        </p>

        <div className="flex items-center flex-wrap justify-between gap-2">
          <span className="p-1 min-w-16 text-lg text-center font-semibold text-primary bg-primary-foreground rounded-md">
            {item.quantity}
          </span>

          <p className="text-lg font-bold text-primary flex items-center gap-1">
            {item.price * item.quantity} <UEAIcon />
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
