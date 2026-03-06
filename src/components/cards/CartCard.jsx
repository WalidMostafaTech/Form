import { RiEdit2Line, RiDeleteBinLine } from "react-icons/ri";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFromCart, updateCart } from "@/api/cartServices";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { FiMinus, FiPlus } from "react-icons/fi";
import { toast } from "sonner";

const CartCard = ({ item }) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      setOpen(false);
      toast.success("Item removed from cart.");
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(item.id);
  };

  const [openEdit, setOpenEdit] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity);

  const updateMutation = useMutation({
    mutationFn: updateCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      setOpenEdit(false);
      toast.success("Item quantity updated.");
    },
  });

  const handleUpdate = () => {
    updateMutation.mutate({
      id: item.id,
      quantity,
    });
  };

  return (
    <div className="p-3 border rounded-lg flex items-start gap-4">
      <div className="w-24 md:w-32 aspect-square overflow-hidden rounded-lg">
        <img
          loading="lazy"
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 space-y-2 text-sm">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold line-clamp-2">{item.name}</h3>

          <div className="flex items-center gap-2">
            <Dialog open={openEdit} onOpenChange={setOpenEdit}>
              <DialogTrigger asChild>
                <button
                  className="w-7 h-7 flex items-center justify-center 
                  bg-primary-foreground text-primary rounded-full hover:brightness-95 transition"
                >
                  <RiEdit2Line />
                </button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Update Quantity</DialogTitle>
                </DialogHeader>

                <div className="flex items-center justify-center gap-4 py-4">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center border rounded-md"
                  >
                    <FiMinus />
                  </button>

                  <span className="text-lg font-semibold min-w-10 text-center">
                    {quantity}
                  </span>

                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 flex items-center justify-center border rounded-md"
                  >
                    <FiPlus />
                  </button>
                </div>

                <DialogFooter className="gap-2">
                  <Button variant="outline" onClick={() => setOpenEdit(false)}>
                    Cancel
                  </Button>

                  <Button
                    onClick={handleUpdate}
                    disabled={updateMutation.isPending}
                  >
                    {updateMutation.isPending ? "Updating..." : "Update"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <button
                  className="w-7 h-7 flex items-center justify-center 
                  bg-red-100 text-red-600 rounded-full hover:brightness-95 transition"
                >
                  <RiDeleteBinLine />
                </button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Delete item from cart?</DialogTitle>
                </DialogHeader>

                <p className="text-sm text-muted-foreground">
                  Are you sure you want to remove this product from your cart?
                </p>

                <DialogFooter className="gap-2">
                  <Button variant="outline" onClick={() => setOpen(false)}>
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
          </div>
        </div>

        <p>
          {item.weight} {item.weight_unit}
        </p>

        <p className="font-bold text-primary">{item.price} AED</p>

        <div className="flex items-center flex-wrap justify-between gap-2">
          <span className="p-1 min-w-16 text-lg text-center font-semibold text-primary bg-primary-foreground rounded-md">
            {item.quantity}
          </span>

          <p className="text-lg font-bold text-primary">
            {item.price * item.quantity} AED
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
