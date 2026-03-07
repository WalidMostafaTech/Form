import SectionTitle from "@/components/common/SectionTitle";
import ProductCard from "@/components/cards/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getFavorites } from "@/api/favoritesServices";
import ProductsSkeleton from "@/components/Loading/SkeletonLoading/ProductsSkeleton";
import EmptyDataSection from "@/components/commonSections/EmptyDataSection";

const Favourites = () => {
  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
  });

  const isEmpty = !isLoading && (favorites?.items?.length === 0 || !favorites);

  return (
    <div className="space-y-6">
      <SectionTitle title="Favourites" />

      {isLoading ? (
        <ProductsSkeleton />
      ) : isEmpty ? (
        <EmptyDataSection msg={"no favorites found"} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {favorites?.items?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;
