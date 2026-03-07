import LanguageSwitcher from "./LanguageSwitcher";
import { useDispatch, useSelector } from "react-redux";
import ProfileSide from "./ProfileSide";
import { Link } from "react-router";
import { SlHandbag } from "react-icons/sl";
import { HiMenuAlt3 } from "react-icons/hi";
import NotificationsPopUp from "./NotificationsPopUp";
import { openModal } from "@/store/modals/modalsSlice";

const HeaderActions = () => {
  const { user, loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-2 md:gap-4">
      {user && (
        <>
          <NotificationsPopUp />

          <Link to="/cart">
            <SlHandbag className="header_icon" />
          </Link>
        </>
      )}

      <LanguageSwitcher />

      <ProfileSide user={user} loading={loading} />

      <HiMenuAlt3
        className="header_icon lg:hidden text-3xl!"
        onClick={() => dispatch(openModal({ modalName: "mobileNav" }))}
      />
    </div>
  );
};

export default HeaderActions;
