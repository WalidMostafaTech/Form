const HeadSection = ({ product, mainColor }) => {
  return (
    <div className="text-center" style={{ color: mainColor }}>
      <h1 className="text-2xl lg:text-4xl uppercase tracking-tight mb-4">
        {product?.name}
      </h1>

      <div className="text-xs uppercase tracking-widest flex flex-wrap items-center justify-center">
        {[product?.category, product?.sub_category].map((value, i) => (
          <span
            key={i}
            style={{ borderColor: mainColor }}
            className="px-2 lg:px-4 not-last:border-e-2 font-medium"
          >
            {value}
          </span>
        ))}
      </div>
    </div>
  );
};

export default HeadSection;
