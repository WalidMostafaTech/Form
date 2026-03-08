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

const DeleteCartItemModal = () => {
  const dispatch = useDispatch();
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
      toast.success("Item removed from cart.");
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
          <DialogTitle>Delete item from cart?</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove this product from your cart?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCartItemModal;
