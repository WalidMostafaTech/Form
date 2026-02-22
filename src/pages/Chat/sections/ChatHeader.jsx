import { useTranslation } from "react-i18next";
import logo from "@/assets/images/logo.png";
import { useSelector } from "react-redux";

const ChatHeader = () => {
  const { t } = useTranslation();
  const { setting } = useSelector((state) => state.setting);

  return (
    <div className="pb-3 border-b text-white flex items-center gap-2">
      <div className="w-20 h-12 overflow-hidden border-e-2 border-white pe-2">
        <img
          loading="lazy"
          src={setting?.header_logo || logo}
          alt="logo"
          className="w-full h-full object-contain"
        />
      </div>
      <p className="font-bold text-lg">{t("chatHeader.support")}</p>
    </div>
  );
};

export default ChatHeader;
