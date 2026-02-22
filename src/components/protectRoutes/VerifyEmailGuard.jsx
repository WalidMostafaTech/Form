import { useSelector } from "react-redux";
import LoadingPage from "../Loading/LoadingPage";
import { Navigate } from "react-router";

const VerifyEmailGuard = ({ children }) => {
  const { profile, loading } = useSelector((state) => state.profile);

  if (loading) return <LoadingPage />;

  if (!profile) {
    return <Navigate to="/login" replace />;
  }

  if (profile?.is_verified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default VerifyEmailGuard;
