import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ProductDetails = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSizeId, setSelectedSizeId] = useState(null);

  const items = product?.items ?? [];

  const selectedSize =
    items.find((item) => item.id === selectedSizeId) ?? items[0];

  return (
    <section className="space-y-6 xl:col-span-2">
      {/* Title */}
      <h2 className="text-3xl font-bold">{product?.name}</h2>

      {/* Weights */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <ul className="flex items-center flex-wrap gap-2">
          {product?.items?.map((size, index) => (
            <li
              key={index}
              className={`text-sm px-4 py-2 cursor-pointer rounded-md border transition ${
                selectedSize?.id === size.id
                  ? "bg-primary text-white"
                  : "bg-primary-foreground hover:bg-primary/10"
              }`}
              onClick={() => setSelectedSizeId(size.id)}
            >
              {size.weight} {size.weight_unit}
            </li>
          ))}
        </ul>

        <span className="text-2xl font-bold text-primary bg-primary-foreground rounded-md px-2 py-1">
          {selectedSize?.price} AED
        </span>
      </div>

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

        <div className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: product?.description }} />
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <Button className="flex-1">BUY NOW</Button>
        <Button className="flex-1" variant="outline">
          ADD TO CART
        </Button>
      </div>

      {/* Accordion */}
      <Accordion type="multiple" collapsible className="border-y">
        <AccordionItem value="shipping">
          <AccordionTrigger className={`cursor-pointer`}>
            Shipping and dispatch information
          </AccordionTrigger>
          <AccordionContent>
            <div
              className="text-sm text-muted-foreground"
              dangerouslySetInnerHTML={{
                __html: product?.shipping_and_dispatch_information,
              }}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="details">
          <AccordionTrigger className={`cursor-pointer`}>
            More details
          </AccordionTrigger>
          <AccordionContent>
            <div
              className="text-sm text-muted-foreground"
              dangerouslySetInnerHTML={{
                __html: product?.more_details,
              }}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="notes">
          <AccordionTrigger className={`cursor-pointer`}>
            Additional notes
          </AccordionTrigger>
          <AccordionContent>
            <div
              className="text-sm text-muted-foreground"
              dangerouslySetInnerHTML={{
                __html: product?.additional_notes,
              }}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default ProductDetails;
