import React from "react";

const ServiceCard = ({ service }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="w-full aspect-square overflow-hidden rounded-lg">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="text-lg font-bold line-clamp-1">{service.title}</h3>

      <p className="text-xs text-muted-foreground line-clamp-2">
        {service.description}
      </p>
    </div>
  );
};

export default ServiceCard;
