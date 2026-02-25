import image from "@/assets/images/product-img.png";
import ProductDetails from "./sections/ProductDetails";
import ProductImages from "./sections/ProductImages";
import PageBanner from "@/components/commonSections/PageBanner";
import BestSellers from "@/components/commonSections/BestSellers";

const Product = () => {
  const product = {
    id: 1,
    title: "BRAZIL, SAN ANTONIO",
    price: 240,
    currency: "AED",
    weights: ["250 GM", "1000 GM", "1500 GM"],
    description: {
      region: "Bensa, Sidama, Ethiopia",
      producer: "San Coffee",
      variety: "Catuai, Red Bourbon, Mundo Novo",
      altitude: "1993 – 2150 m.a.s.l.",
      processing: "Natural",
      roastLevel: "Light, Medium, Dark",
      availability: "In stock, Pre-order",
      offers: "Optional",
    },
    images: [image, image, image, image],
  };

  return (
    <main>
      <PageBanner
        image={image}
        title="Shop"
        description="Explore our wide range of products and find the perfect items for your needs."
      />

      <section className="container pagePadding grid grid-cols-1 lg:grid-cols-2 gap-10">
        <ProductImages images={product.images} />
        <ProductDetails product={product} />
      </section>

      <BestSellers />
    </main>
  );
};

export default Product;
