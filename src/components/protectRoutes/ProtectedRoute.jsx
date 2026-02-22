import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import LoadingPage from "../Loading/LoadingPage";

const ProtectedRoute = () => {
  const { profile, loading } = useSelector((state) => state.profile);

  if (loading) return <LoadingPage />;

  // لو مفيش user → رجّعه لصفحة login
  if (!profile) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
