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

const RequiredVerifyEmailModal = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { requiredVerifyEmailModal } = useSelector((state) => state.modals);

  const onClose = () => {
    dispatch(closeModal("requiredVerifyEmailModal"));
  };

  const handleCancel = () => {
    onClose();
  };

  const handleVerify = () => {
    navigate("/verify-email");
    onClose();
  };

  return (
    <Dialog open={requiredVerifyEmailModal} onOpenChange={onClose}>
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <DialogHeader>
          <img
            loading="lazy"
            src={warningIcon}
            alt="logout"
            className="mx-auto w-44"
          />
          <DialogTitle className="text-center">
            {t("requiredVerifyEmailModal.title")}
          </DialogTitle>
          <DialogDescription className="text-center">
            {t("requiredVerifyEmailModal.description")}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button className="flex-1" onClick={handleVerify}>
            {t("requiredVerifyEmailModal.goToVerify")}
          </Button>

          <Button
            variant="outline"
            className="flex-1 rounded-full"
            onClick={handleCancel}
          >
            {t("requiredVerifyEmailModal.cancel")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RequiredVerifyEmailModal;
