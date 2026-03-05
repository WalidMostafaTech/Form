import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { closeModal } from "@/store/modals/modalsSlice";
import { removeFromCart } from "@/api/cartServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const DeleteCartItemModal = () => {
  const dispatch = useDispatch();
  const { deleteCartItemModal } = useSelector((state) => state.modals);

  const onClose = () => {
    dispatch(closeModal("deleteCartItemModal"));
  };

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      onClose();
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(item.id);
  };

  return (
    <Dialog open={deleteCartItemModal} onOpenChange={onClose}>
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete item from cart?</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Are you sure you want to remove this product from your cart?
        </p>

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
