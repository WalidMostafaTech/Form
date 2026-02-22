import SectionTitle from "@/components/common/SectionTitle";
import OrderMethodSkeleton from "@/components/Loading/SkeletonLoading/OrderMethodSkeleton";
import { useTranslation } from "react-i18next";

const OrderMethod = ({ data = [], isLoading }) => {
  const { t } = useTranslation();

  if (isLoading) {
    return <OrderMethodSkeleton />;
  }

  if (!data || data.length === 0) return null;

  return (
    <section className="container sectionPadding">
      <SectionTitle title={t("orderMethod.title")} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
        {data?.map((item, index) => (
          <div
            key={item.id}
            className="flex flex-col items-center text-center gap-2 card"
          >
            <h2
              className="bg-primary rounded-xl w-16 h-16 flex items-center justify-center
            text-4xl font-bold shadow-lg shadow-accent-foreground/20 mb-4"
            >
              {index + 1}
            </h2>

            <h3 className="text-2xl font-bold">{item.title}</h3>
            <p className="text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrderMethod;
