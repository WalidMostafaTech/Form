import React from "react";

const ServiceCard = ({ service }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="w-full aspect-5/4 overflow-hidden rounded-2xl mb-2">
        <img
          loading="lazy"
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="text-lg lg:text-2xl font-semibold line-clamp-1">
        {service.title}
      </h3>

      <p className="text-sm text-muted-foreground line-clamp-2">
        {service.description}
      </p>
    </div>
  );
};

export default ServiceCard;
