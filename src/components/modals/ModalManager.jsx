import MobileNav from "./MobileNav";
import LogOutModal from "./LogOutModal";
import RequiredLoginModal from "./RequiredLoginModal";
import RequiredVerifyEmailModal from "./RequiredVerifyEmailModal";
import TermsModal from "./TermsModal";
import DeleteCartItemModal from "./DeleteCartItemModal";
import UpdateCartItemModal from "./UpdateCartItemModal";

const ModalManager = () => {
  return (
    <>
      <MobileNav />
      <LogOutModal />
      <RequiredLoginModal />
      <RequiredVerifyEmailModal />
      <TermsModal />
      <DeleteCartItemModal />
      <UpdateCartItemModal />
    </>
  );
};

export default ModalManager;
