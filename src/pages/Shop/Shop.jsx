import ProductsPage from "../ProductsPage/ProductsPage";
import { useTranslation } from "react-i18next";

const Shop = () => {
  const { t } = useTranslation();

  return <ProductsPage saleType="retail" title={t("productsPage.shopTitle")} />;
};

export default Shop;
