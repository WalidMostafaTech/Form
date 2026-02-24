import emptyIcon from "@/assets/icons/Empty-img.png";

const EmptyDataSection = ({ msg }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-4 py-12">
      <img
        loading="lazy"
        src={emptyIcon}
        alt="Empty data"
        className="mx-auto w-52 lg:w-72"
      />

      <p className="text-center font-semibold text-lg">
        {msg || "no data found"}
      </p>
    </div>
  );
};

export default EmptyDataSection;
