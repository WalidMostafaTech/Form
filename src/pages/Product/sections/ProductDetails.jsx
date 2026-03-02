import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

const ProductDetails = ({ product }) => {
  const [selectedWeight, setSelectedWeight] = useState(product.weights[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <section className="space-y-6">
      {/* Title + Price */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">{product.title}</h2>
        <span className="text-xl font-semibold text-primary">
          {product.currency} {product.price.toFixed(2)}
        </span>
      </div>

      {/* Weights */}
      <ul className="flex items-center flex-wrap gap-2">
        {product.weights.map((weight, index) => (
          <li
            key={index}
            className={`text-sm px-4 py-2 cursor-pointer rounded-md border ${
              selectedWeight === weight
                ? "bg-primary text-white"
                : "bg-muted hover:bg-gray-200"
            }`}
            onClick={() => setSelectedWeight(weight)}
          >
            {weight}
          </li>
        ))}
      </ul>

      {/* Quantity */}
      <div className="flex items-center gap-2 border rounded w-fit">
        <button
          onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
          className="w-8 h-8 flex items-center justify-center
        hover:bg-gray-100 transition cursor-pointer"
        >
          <FiMinus />
        </button>
        <span className="min-w-8 text-center">{quantity}</span>
        <button
          onClick={() => setQuantity((prev) => prev + 1)}
          className="w-8 h-8 flex items-center justify-center
        hover:bg-gray-100 transition cursor-pointer"
        >
          <FiPlus />
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
        <Button className="flex-1">BUY NOW</Button>
        <Button className="flex-1" variant="outline">
          ADD TO CART
        </Button>
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
