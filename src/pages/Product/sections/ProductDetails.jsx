import { useState } from "react";

const ProductDetails = ({ product }) => {
  const [selectedWeight, setSelectedWeight] = useState(product.weights[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <section className="space-y-6">
      {/* Title + Price */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">{product.title}</h2>
        <span className="text-xl font-semibold text-green-700">
          {product.currency} {product.price.toFixed(2)}
        </span>
      </div>

      {/* Weights */}
      <div className="flex gap-3">
        {product.weights.map((weight, index) => (
          <button
            key={index}
            onClick={() => setSelectedWeight(weight)}
            className={`px-4 py-2 rounded-lg border transition ${
              selectedWeight === weight
                ? "bg-green-800 text-white"
                : "bg-gray-100"
            }`}
          >
            {weight}
          </button>
        ))}
      </div>

      {/* Quantity */}
      <div className="flex items-center border rounded-lg w-fit">
        <button
          onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
          className="px-4 py-2"
        >
          -
        </button>
        <span className="px-6">{quantity}</span>
        <button
          onClick={() => setQuantity((prev) => prev + 1)}
          className="px-4 py-2"
        >
          +
        </button>
      </div>

      {/* Description */}
      <div>
        <h3 className="font-semibold mb-2">Description</h3>
        <ul className="space-y-1 text-gray-600">
          <li>
            <strong>Region:</strong> {product.description.region}
          </li>
          <li>
            <strong>Producer:</strong> {product.description.producer}
          </li>
          <li>
            <strong>Variety:</strong> {product.description.variety}
          </li>
          <li>
            <strong>Altitude:</strong> {product.description.altitude}
          </li>
          <li>
            <strong>Processing:</strong> {product.description.processing}
          </li>
          <li>
            <strong>Roast Level:</strong> {product.description.roastLevel}
          </li>
          <li>
            <strong>Availability:</strong> {product.description.availability}
          </li>
          <li>
            <strong>Special Offers:</strong> {product.description.offers}
          </li>
        </ul>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button className="flex-1 bg-green-800 text-white py-3 rounded-lg font-semibold">
          BUY NOW
        </button>
        <button className="flex-1 border border-green-800 text-green-800 py-3 rounded-lg font-semibold">
          ADD TO CART
        </button>
      </div>

      {/* Accordion Placeholder */}
      <div className="border-t pt-4 space-y-3">
        <details className="border-b pb-2">
          <summary className="cursor-pointer font-medium">
            Shipping and dispatch information
          </summary>
          <p className="text-sm text-gray-600 mt-2">
            Shipping within 3-5 business days.
          </p>
        </details>

        <details className="border-b pb-2">
          <summary className="cursor-pointer font-medium">More details</summary>
          <p className="text-sm text-gray-600 mt-2">
            Additional product details here.
          </p>
        </details>

        <details>
          <summary className="cursor-pointer font-medium">
            Additional notes
          </summary>
          <p className="text-sm text-gray-600 mt-2">
            Extra notes about the product.
          </p>
        </details>
      </div>
    </section>
  );
};

export default ProductDetails;
