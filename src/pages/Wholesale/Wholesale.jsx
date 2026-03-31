import LoadingPage from "@/components/Loading/LoadingPage";
import ProductsPage from "../ProductsPage/ProductsPage";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const Wholesale = () => {
  const { t } = useTranslation();

  const { user, loading } = useSelector((state) => state.user);

  if (loading) return <LoadingPage />;

  if (!user || user?.type !== "company")
    return <Navigate to="/shop?type=retail" replace />;

  return (
    <ProductsPage
      saleType="wholesale"
      title={t("productsPage.wholesaleTitle")}
    />
  );
};

export default Wholesale;
