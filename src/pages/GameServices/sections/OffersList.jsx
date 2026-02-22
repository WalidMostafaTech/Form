import OffersCard from "@/components/cards/OffersCard";
import MainPagination from "@/components/common/MainPagination";

const OffersList = ({
  onOfferClick,
  currentOffer,
  offers = [],
  meta,
  currentPage,
  onPageChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-center gap-4 h-fit">
        {offers?.map((item) => (
          <OffersCard
            key={item.id}
            item={item}
            currentOffer={currentOffer}
            onOfferClick={onOfferClick}
          />
        ))}
      </div>

      <MainPagination
        totalPages={meta?.last_page || 1}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default OffersList;
