import AuthContainer from "@/components/form/AuthContainer";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { t } = useTranslation();

  return (
    <AuthContainer
      title={t("registerPage.title")}
      description={t("registerPage.description")}
      coffeeIcon
    >
      <div className="grid grid-cols-2 gap-4">
        <Link
          to="/register/customer"
          className="flex flex-col items-center gap-2 border p-4 rounded-lg hover:bg-primary/10 transition"
        >
          <div
            className="text-2xl text-primary bg-primary-foreground w-16 h-16 
            flex items-center justify-center rounded-lg mx-auto"
          >
            <FaRegUser />
          </div>
          <p>{t("registerPage.customer")}</p>
        </Link>

        <Link
          to="/register/company"
          className="flex flex-col items-center gap-2 border p-4 rounded-lg hover:bg-primary/10 transition"
        >
          <div
            className="text-2xl text-primary bg-primary-foreground w-16 h-16 
            flex items-center justify-center rounded-lg mx-auto"
          >
            <HiOutlineBuildingOffice2 />
          </div>
          <p>{t("registerPage.company")}</p>
        </Link>
      </div>

      <hr />

      <div className="text-center text-xs text-muted-foreground">
        {t("registerPage.alreadyHaveAccount")}
        <Link to="/login" className="text-primary hover:underline ms-1">
          {t("registerPage.signInHere")}
        </Link>
      </div>
    </AuthContainer>
  );
};

export default Register;
