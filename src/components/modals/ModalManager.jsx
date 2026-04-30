import MobileNav from "./MobileNav";
import LogOutModal from "./LogOutModal";
import RequiredLoginModal from "./RequiredLoginModal";
import RequiredVerifyEmailModal from "./RequiredVerifyEmailModal";
import TermsModal from "./TermsModal";
import DeleteCartItemModal from "./DeleteCartItemModal";
import UpdateCartItemModal from "./UpdateCartItemModal";
import ChangePasswordModal from "./ChangePasswordModal";
import DeleteEventOrderModal from "./DeleteEventOrderModal";
import UpdateEventModal from "./UpdateEventModal";
import LoadingModal from "./LoadingModal";
import AddToCartModal from "./AddToCartModal";

const ModalManager = () => {
  return (
    <>
      <LoadingModal />
      <MobileNav />
      <LogOutModal />
      <RequiredLoginModal />
      <RequiredVerifyEmailModal />
      <TermsModal />
      <DeleteCartItemModal />
      <UpdateCartItemModal />
      <ChangePasswordModal />
      <DeleteEventOrderModal />
      <UpdateEventModal />
      <AddToCartModal />
    </>
  );
};

export default ModalManager;
