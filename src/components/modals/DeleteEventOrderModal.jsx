import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { closeModal } from "@/store/modals/modalsSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { deleteEvent } from "@/api/eventServices";
import { useNavigate } from "react-router";

const DeleteEventOrderModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { modalName, modalData } = useSelector((state) => state.modals);
  const { item_id } = modalData || {};

  const onClose = () => {
    dispatch(closeModal());
  };

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      navigate("/profile/event-orders", { replace: true });
      queryClient.invalidateQueries({ queryKey: ["my_events"] });
      toast.success(t("DeleteEventOrderModal.itemRemoved"));
      onClose();
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(item_id);
  };

  return (
    <Dialog open={modalName === "DeleteEventOrderModal"} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("DeleteEventOrderModal.title")}</DialogTitle>
          <DialogDescription>
            {t("DeleteEventOrderModal.description")}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            {t("DeleteEventOrderModal.cancel")}
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending
              ? t("DeleteEventOrderModal.deleting")
              : t("DeleteEventOrderModal.delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteEventOrderModal;
