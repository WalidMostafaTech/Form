import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "@/store/modals/modalsSlice";

const TermsModal = () => {
  const dispatch = useDispatch();
  const { modalName } = useSelector((state) => state.modals);
  const { settings } = useSelector((state) => state.settings);

  const onClose = () => {
    dispatch(closeModal());
  };

  return (
    <Dialog open={modalName === "termsModal"} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className={`text-center`}>
            Terms & Conditions
          </DialogTitle>
          <DialogDescription className="sr-only"></DialogDescription>
        </DialogHeader>

        <div
          className="-mx-4 no-scrollbar max-h-[60vh] overflow-y-auto px-4"
          dangerouslySetInnerHTML={{
            __html: settings?.registration_form?.terms_conditions,
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TermsModal;
