import ProductsPage from "../ProductsPage/ProductsPage";
import { useTranslation } from "react-i18next";

const Wholesale = () => {
  const { t } = useTranslation();

  return (
    <ProductsPage
      saleType="wholesale"
      title={t("productsPage.wholesaleTitle")}
    />
  );
};

export default Wholesale;
