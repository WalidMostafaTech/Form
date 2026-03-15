const EventDetailsCard = ({ item }) => {
  return (
    <div className="p-4 border rounded-2xl shadow flex flex-col gap-2">
      <div className="w-8 h-8 flex items-center justify-center bg-primary-foreground text-primary rounded-md">
        {item.icon}
      </div>

      <p className="text-sm text-muted-foreground font-medium">{item.label}</p>

      <h3 className="text-xl font-semibold text-primary">{item.value}</h3>
    </div>
  );
};

export default EventDetailsCard;
