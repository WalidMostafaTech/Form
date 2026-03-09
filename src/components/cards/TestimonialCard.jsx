const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-stone-50 p-2 rounded-md">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-white rounded p-1 w-14 aspect-square">
          <img
            loading="lazy"
            src={testimonial.image}
            alt={testimonial.name}
            className="w-full h-full object-contain rounded"
          />
        </div>

        <div>
          <h3 className="font-semibold text-lg">{testimonial.name}</h3>
          <p className="text-muted-foreground text-sm">{testimonial.job}</p>
        </div>
      </div>

      <p className="leading-tight">{testimonial.content}</p>
    </div>
  );
};

export default TestimonialCard;
