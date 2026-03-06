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
  const { termsModal } = useSelector((state) => state.modals);
  const { settings } = useSelector((state) => state.settings);

  const onClose = () => {
    dispatch(closeModal("termsModal"));
  };

  return (
    <Dialog open={termsModal} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl overflow-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-center">Terms & Conditions</DialogTitle>
          <DialogDescription asChild>
            <div
              dangerouslySetInnerHTML={{
                __html: settings?.registration_form?.terms_conditions,
              }}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default TermsModal;
