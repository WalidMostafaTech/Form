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
import { removeFromCart } from "@/api/cartServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const DeleteCartItemModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { modalName, modalData } = useSelector((state) => state.modals);
  const { item_id } = modalData || {};

  const onClose = () => {
    dispatch(closeModal());
  };

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["cart_count"] });
      toast.success(t("DeleteCartItemModal.itemRemoved"));
      onClose();
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(item_id);
  };

  return (
    <Dialog open={modalName === "deleteCartItemModal"} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("DeleteCartItemModal.title")}</DialogTitle>
          <DialogDescription>
            {t("DeleteCartItemModal.description")}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            {t("DeleteCartItemModal.cancel")}
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending
              ? t("DeleteCartItemModal.deleting")
              : t("DeleteCartItemModal.delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCartItemModal;
