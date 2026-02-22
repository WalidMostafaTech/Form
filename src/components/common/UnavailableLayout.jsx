import { useTranslation } from "react-i18next";

const UnavailableLayout = () => {
  const { t } = useTranslation();

  return (
    <div className="absolute inset-0 bg-primary-foreground/90 flex items-center justify-center z-10 cursor-not-allowed">
      <span className="text-white font-bold text-sm">{t("unavailable")}</span>
    </div>
  );
};

export default UnavailableLayout;
