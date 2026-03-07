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
import { updateCart } from "@/api/cartServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FiMinus, FiPlus } from "react-icons/fi";

const UpdateCartItemModal = () => {
  const dispatch = useDispatch();
  const { modalName, modalData } = useSelector((state) => state.modals);
  const { item_id, item_quantity } = modalData || {};
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (item_quantity) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuantity(item_quantity);
    }
  }, [item_id]);

  const onClose = () => {
    setQuantity(1);
    dispatch(closeModal());
  };

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updateCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Item quantity updated.");
      onClose();
    },
  });

  const handleUpdate = () => {
    updateMutation.mutate({
      id: item_id,
      quantity,
    });
  };

  return (
    <Dialog open={modalName === "updateCartItemModal"} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Quantity</DialogTitle>
          <DialogDescription className="sr-only"></DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-center gap-4 py-4">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-10 h-10 flex items-center justify-center border rounded-md
            hover:bg-primary-foreground transition cursor-pointer"
          >
            <FiMinus />
          </button>

          <span className="text-lg font-semibold min-w-10 text-center">
            {quantity}
          </span>

          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="w-10 h-10 flex items-center justify-center border rounded-md
            hover:bg-primary-foreground transition cursor-pointer"
          >
            <FiPlus />
          </button>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button onClick={handleUpdate} disabled={updateMutation.isPending}>
            {updateMutation.isPending ? "Updating..." : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCartItemModal;
