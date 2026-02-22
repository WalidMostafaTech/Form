const NotificationsBadge = ({ count }) => {
  if (!count || count == 0) return null;

  return (
    <span
      className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1
      text-[10px] rounded-full bg-red-500 text-white flex items-center justify-center"
    >
      {count > 99 ? "99+" : count}
    </span>
  );
};

export default NotificationsBadge;
