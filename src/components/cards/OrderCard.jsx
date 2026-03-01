const OrderCard = ({ item }) => {
  return (
    <div
      key={item.id}
      className="p-3 border border-border rounded-lg flex items-start gap-4"
    >
      <div className="w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-lg">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 space-y-2 text-sm">
        <h3 className="text-lg font-semibold line-clamp-2">{item.name}</h3>

        <p>{item.weight}</p>

        <p className="font-bold text-primary">{item.price} AED</p>

        <div className="flex items-center flex-wrap justify-between gap-2">
          <span className="p-1 min-w-16 text-lg text-center text-primary bg-primary-foreground rounded-md">
            {item.quantity}
          </span>

          <p className="text-lg font-bold text-primary">
            {item.price * item.quantity} AED
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
