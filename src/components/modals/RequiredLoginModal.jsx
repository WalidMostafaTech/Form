import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "@/store/modals/modalsSlice";
import warningIcon from "@/assets/icons/Warning-icon.png";

const RequiredLoginModal = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { requiredLoginModal } = useSelector((state) => state.modals);

  const onClose = () => {
    dispatch(closeModal("requiredLoginModal"));
  };

  const handleCreateAccount = () => {
    navigate("/register");
    onClose();
  };

  const handleLogin = () => {
    navigate("/login");
    onClose();
  };

  return (
    <Dialog open={requiredLoginModal} onOpenChange={onClose}>
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <DialogHeader>
          <img
            loading="lazy"
            src={warningIcon}
            alt="logout"
            className="mx-auto w-44"
          />
          <DialogTitle className="text-center">
            {t("requiredLoginModal.title")}
          </DialogTitle>
          <DialogDescription className="text-center">
            {t("requiredLoginModal.description")}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button className="flex-1" onClick={handleLogin}>
            {t("requiredLoginModal.login")}
          </Button>

          <Button
            variant="outline"
            className="flex-1 rounded-full"
            onClick={handleCreateAccount}
          >
            {t("requiredLoginModal.createAccount")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RequiredLoginModal;
