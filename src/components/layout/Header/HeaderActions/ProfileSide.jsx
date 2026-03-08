import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaRegUser } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import UserAvatar from "@/components/common/UserAvatar";
import { Link, useNavigate } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { openModal } from "@/store/modals/modalsSlice";
import { useDispatch } from "react-redux";
import { FaRegHeart } from "react-icons/fa";

const ProfileSide = ({ user, loading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      {loading ? (
        <Skeleton className="h-9 w-9 rounded-full" />
      ) : user ? (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger>
            <UserAvatar
              name={user?.name}
              image={user?.image}
              className="cursor-pointer"
            />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className={`w-52`}>
            <DropdownMenuLabel className="flex items-center gap-2">
              <UserAvatar name={user?.name} image={user?.image} />
              <h3 className="font-semibold">{user?.name}</h3>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => navigate("/profile")}>
              <FaRegUser />
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => navigate("/profile/orders")}>
              <FiShoppingCart />
              Orders
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => navigate("/profile/favorites")}>
              <FaRegHeart />
              Favorites
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              variant="destructive"
              onClick={() => {
                dispatch(openModal({ modalName: "logOutModal" }));
              }}
            >
              <IoIosLogOut />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link
          to="/login"
          className="bg-white px-4 py-1 rounded-md text-primary 
            hover:text-white hover:bg-primary transition-all duration-300"
        >
          Login
        </Link>
      )}
    </>
  );
};

export default ProfileSide;
