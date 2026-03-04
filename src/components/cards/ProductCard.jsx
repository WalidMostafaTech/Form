import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { GoHeartFill, GoHeart } from "react-icons/go";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFavorites, toggleFavorite } from "@/api/favoritesServices";

const ProductCard = ({ product, sale_type = "retail" }) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  // جلب الـ favorites
  const { data: favorites = [] } = useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
  });

  // تحقق إذا المنتج ده في الـ favorites
  const isFavorited = favorites?.items?.some(
    (fav) => fav.id === product.id && fav.sale_type === sale_type,
  );

  // الـ mutation للـ toggle
  // const { mutate: handleToggle, isPending } = useMutation({
  //   mutationFn: toggleFavorite,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["favorites"] });
  //   },
  // });

  const { mutate: handleToggle, isPending } = useMutation({
    mutationFn: toggleFavorite,
    // تحديث مؤقت للـ cache قبل نجاح الـ mutation
    onMutate: async ({ id, sale_type }) => {
      await queryClient.cancelQueries({ queryKey: ["favorites"] });

      const previousFavorites = queryClient.getQueryData(["favorites"]);

      queryClient.setQueryData(["favorites"], (oldData) => {
        if (!oldData) return oldData;

        const alreadyFavorited = oldData.items?.some(
          (fav) => fav.id === id && fav.sale_type === sale_type,
        );

        let newItems;
        if (alreadyFavorited) {
          // لو موجود بالفعل نحذفه
          newItems = oldData.items.filter(
            (fav) => !(fav.id === id && fav.sale_type === sale_type),
          );
        } else {
          // لو مش موجود نضيفه
          newItems = [...oldData.items, { id, sale_type }];
        }

        return { ...oldData, items: newItems };
      });

      return { previousFavorites }; // علشان الرجوع لو حصل خطأ
    },
    onError: (err, variables, context) => {
      // لو حصل خطأ نرجع البيانات القديمة
      if (context?.previousFavorites) {
        queryClient.setQueryData(["favorites"], context.previousFavorites);
      }
    },
    onSettled: () => {
      // بعد الانتهاء نعمل refetch للتأكد من تحديث السيرفر
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  return (
    <div className="flex flex-col gap-1">
      <div className="w-full aspect-square overflow-hidden rounded-lg relative">
        <img
          src={product.main_image}
          alt={product.title}
          className="w-full h-full object-cover"
        />

        <button
          onClick={() => handleToggle({ id: product.id, sale_type })}
          disabled={isPending}
          className="absolute top-2 right-2 z-10 w-8 h-8 
          flex items-center justify-center bg-white text-primary text-xl 
          rounded-full cursor-pointer hover:brightness-95 transition disabled:opacity-50"
        >
          {isFavorited ? <GoHeartFill /> : <GoHeart />}
        </button>
      </div>

      <h3 className="text-lg font-bold line-clamp-1">{product.name}</h3>

      <div className="flex items-center flex-wrap justify-between gap-2">
        <span className="text-sm font-semibold">
          <span>{product.min_weight}</span> - <span>{product.max_weight}</span>
        </span>

        <span className="text-primary font-bold">
          <span>{product.min_price}</span> AED -{" "}
          <span>{product.max_price}</span> AED
        </span>
      </div>

      <p className="text-xs text-muted-foreground line-clamp-2">
        {product.description}
      </p>

      <Button
        onClick={() =>
          navigate(`/product/${product.slug}?sale_type=${sale_type}`)
        }
        className={`mt-2`}
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;
