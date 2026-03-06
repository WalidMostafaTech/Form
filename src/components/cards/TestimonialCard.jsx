const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-stone-50 p-2 rounded-md">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-white rounded-md p-1 w-10 aspect-square">
          <img
            loading="lazy"
            src={testimonial.image}
            alt={testimonial.name}
            className="w-full h-full object-contain rounded"
          />
        </div>

        <div>
          <h3 className="font-medium text-sm">{testimonial.name}</h3>
          <p className="text-muted-foreground text-xs">{testimonial.job}</p>
        </div>
      </div>

      <p className="text-xs">{testimonial.content}</p>
    </div>
  );
};

export default TestimonialCard;
