import { RiEdit2Line, RiDeleteBinLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { openModal } from "@/store/modals/modalsSlice";
import UEAIcon from "@/components/common/UEAIcon";

const CartCard = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="p-3 border rounded-lg items-start flex gap-4">
      <div className="w-28 lg:w-48 aspect-square overflow-hidden rounded-lg">
        <img
          loading="lazy"
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 font-semibold flex flex-col justify-between gap-2 h-full">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold line-clamp-2">{item.name}</h3>

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
                  bg-destructive-foreground text-destructive rounded-full hover:brightness-95 transition"
            >
              <RiDeleteBinLine />
            </button>
          </div>
        </div>

        <p>
          {item.weight} {item.weight_unit}
        </p>

        <p className="font-bold text-primary text-lg flex items-center gap-1">
          {item.price} <UEAIcon />
        </p>

        <div className="flex items-center flex-wrap justify-between gap-2">
          <span className="p-1 min-w-16 text-lg text-center font-semibold text-primary bg-primary-foreground rounded-md border">
            {item.quantity}
          </span>

          <p className="text-3xl font-extrabold text-primary flex items-center gap-1">
            {item.price * item.quantity} <UEAIcon className="w-7 h-7" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
