import { useTranslation } from "react-i18next";
import { GiCoffeeBeans } from "react-icons/gi";

const Loader = ({ textWhite = false }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-75">
      <GiCoffeeBeans className="text-7xl text-primary animate-bounce" />

      <h2
        className={`text-lg font-semibold ${textWhite ? "text-white" : "text-black"}`}
      >
        {t("loading")}
      </h2>
    </div>
  );
};

export default Loader;
