import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserAvatar = ({
  name,
  image,
  size = 40, // default size
  className = "",
}) => {
  const getInitials = (fullName) => {
    if (!fullName) return "?";
    const parts = fullName.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  return (
    <Avatar
      className={className}
      style={{
        width: size,
        height: size,
        fontSize: size / 2.5,
      }}
    >
      {image && (
        <AvatarImage
          src={image}
          alt={name}
          className={`object-cover cursor-pointer`}
        />
      )}
      <AvatarFallback>{getInitials(name)}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
