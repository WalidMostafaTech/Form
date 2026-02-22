import { useTranslation } from "react-i18next";

const Loader = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-[300px]">
      <div className="relative flex items-center justify-center mb-10">
        <div className="w-24 h-24 rounded-full bg-primary/20 animate-ping absolute"></div>
        <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white font-bold text-2xl">
          KMG
        </div>
      </div>

      <h2 className="text-lg font-semibold">{t("loading")}</h2>
    </div>
  );
};

export default Loader;
