import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "@/store/languageSlice/languageSlice";
import LoadingModal from "@/components/Loading/LoadingModal";
import { AiOutlineGlobal } from "react-icons/ai";

const LanguageSwitcher = () => {
  const dispatch = useDispatch();
  const { lang } = useSelector((state) => state.language);

  const [openLoading, setOpenLoading] = useState(false);

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const handleToggle = () => {
    dispatch(changeLanguage(lang === "ar" ? "en" : "ar"));
    setOpenLoading(true);
  };

  return (
    <>
      <button
        onClick={handleToggle}
        className="flex items-center gap-1 text-white border-2 px-2 py-1 rounded-md cursor-pointer 
        hover:text-secondary hover:border-secondary transition-colors duration-300"
      >
        <span className="font-semibold text-sm sm:hidden">
          {lang === "en" ? "AR" : "EN"}
        </span>
        <span
          style={{
            fontFamily:
              lang === "en"
                ? "Noto Sans Arabic, sans-serif"
                : "Assistant, sans-serif",
          }}
          className="font-semibold text-sm hidden sm:inline"
        >
          {lang === "en" ? "العربية" : "English"}
        </span>
        <AiOutlineGlobal />
      </button>

      {openLoading && <LoadingModal />}
    </>
  );
};

export default LanguageSwitcher;
