import { RiEdit2Line, RiDeleteBinLine } from "react-icons/ri";
import { FiMinus, FiPlus } from "react-icons/fi";

const CartCard = ({ item }) => {
  return (
    <div key={item.id} className="p-3 border rounded-lg flex items-start gap-4">
      <div className="w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-lg">
        <img
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
              className="w-7 h-7 flex items-center justify-center 
                        bg-primary-foreground text-primary rounded-full cursor-pointer hover:brightness-95 transition"
            >
              <RiEdit2Line />
            </button>
            <button
              className="w-7 h-7 flex items-center justify-center 
                        bg-red-100 text-red-600 rounded-full cursor-pointer hover:brightness-95 transition"
            >
              <RiDeleteBinLine />
            </button>
          </div>
        </div>

        <p>
          {item.weight} {item.weight_unit}
        </p>

        <p className="font-bold text-primary">{item.price} AED</p>

        <div className="flex items-center flex-wrap justify-between gap-2">
          <span className="p-1 min-w-16 text-lg text-center font-semibold text-primary bg-primary-foreground rounded-md">
            {item.quantity}
          </span>

          <p className="text-lg font-bold text-primary">
            {item.price * item.quantity} AED
          </p>
        </div>

        {/* <div className="flex items-center flex-wrap justify-between gap-2">
          <div className="flex items-center gap-2 border rounded">
            <button
              className="w-8 h-8 flex items-center justify-center
                        hover:bg-gray-100 transition cursor-pointer"
            >
              <FiMinus />
            </button>
            <span className="min-w-8 text-center">{item.quantity}</span>
            <button
              className="w-8 h-8 flex items-center justify-center
                        hover:bg-gray-100 transition cursor-pointer"
            >
              <FiPlus />
            </button>
          </div>

          <p className="text-lg font-bold text-primary">
            {item.price * item.quantity} AED
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default CartCard;
