import { HiOutlineFolderOpen } from "react-icons/hi2";

const EmptyDataSection = ({ msg }) => {
  return (
    <div
      className="flex flex-col items-center justify-center gap-2 p-4 min-h-60
      text-primary text-center text-lg font-semibold capitalize"
    >
      <HiOutlineFolderOpen className="text-[150px] animate-pulse" />

      <p>{msg || "no data found"}</p>
    </div>
  );
};

export default EmptyDataSection;
