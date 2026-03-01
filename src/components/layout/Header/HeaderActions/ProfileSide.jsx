import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaRegUser } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import UserAvatar from "@/components/common/UserAvatar";
import { Link, useNavigate } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { openModal } from "@/store/modals/modalsSlice";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";

const ProfileSide = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { lang } = useSelector((state) => state.language);
  const { profile, loading } = useSelector((state) => state.profile);

  return (
    <>
      {loading ? (
        <Skeleton className="h-9 w-9 rounded-full" />
      ) : profile ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <UserAvatar
              name={profile?.name}
              image={profile?.image}
              className="cursor-pointer"
            />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            dir={lang === "ar" ? "rtl" : "ltr"}
            className={`w-52`}
          >
            <DropdownMenuLabel className="flex items-center gap-2">
              <UserAvatar name={profile?.name} image={profile?.image} />
              <h3 className="font-semibold">{profile?.name}</h3>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => navigate("/profile")}
              className="justify-start"
            >
              <FaRegUser />
              {t("profileSide.profile")}
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => navigate("/profile/orders")}>
              <FiShoppingCart />
              {t("profileSide.orders")}
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => {
                dispatch(openModal("logoutModal"));
              }}
              className="bg-red-800/50 hover:bg-red-800/30!"
            >
              <IoIosLogOut />
              {t("profileSide.logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link to="/login">
          <Button>{t("profileSide.login")}</Button>
        </Link>
      )}
    </>
  );
};

export default ProfileSide;
