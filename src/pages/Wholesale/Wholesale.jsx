import ProductsPage from "../ProductsPage/ProductsPage";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const Wholesale = () => {
  const { t } = useTranslation();

  const { user } = useSelector((state) => state.user);

  if (!user || user?.type !== "company") return <Navigate to="/shop?type=retail" replace />;

  return (
    <ProductsPage
      saleType="wholesale"
      title={t("productsPage.wholesaleTitle")}
    />
  );
};

export default Wholesale;
