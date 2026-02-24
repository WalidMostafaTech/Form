import { Outlet, useLocation } from "react-router";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { getProfileAct } from "@/store/profile/profileSlice";
// import { fetchSetting } from "@/store/setting/setting";
import { Toaster } from "@/components/ui/sonner";
import LogOutModal from "@/components/modals/LogOutModal";
import RequiredLoginModal from "@/components/modals/RequiredLoginModal";
import RequiredVerifyEmailModal from "@/components/modals/RequiredVerifyEmailModal";

function App() {
  const { pathname } = useLocation();
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getProfileAct());
  //   dispatch(fetchSetting());
  // }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <main>
      <Header />

      <div className="min-h-[90vh]">
        <Outlet />
      </div>

      <Footer />

      <Toaster position="top-center" />

      {/* modals */}
      <LogOutModal />
      <RequiredLoginModal />
      <RequiredVerifyEmailModal />
    </main>
  );
}

export default App;
