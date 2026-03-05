import { Outlet, useLocation } from "react-router";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "@/store/user/userActions.js";
import { fetchSettings } from "@/store/settings/settingsActions.js";
import { Toaster } from "@/components/ui/sonner";
import LogOutModal from "@/components/modals/LogOutModal";
import RequiredLoginModal from "@/components/modals/RequiredLoginModal";
import RequiredVerifyEmailModal from "@/components/modals/RequiredVerifyEmailModal";
import { fetchCategories } from "./store/categories/categoriesActions";
import { fetchEmirates } from "./store/emirates/emiratesActions";
import ScrollToTopBtn from "./components/behaviors/ScrollToTopBtn";
import TermsModal from "./components/modals/TermsModal";

function App() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(fetchSettings());
    dispatch(fetchCategories());
    dispatch(fetchEmirates());
  }, [dispatch]);

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

      <ScrollToTopBtn />

      {/* modals */}
      <LogOutModal />
      <RequiredLoginModal />
      <RequiredVerifyEmailModal />
      <TermsModal />
    </main>
  );
}

export default App;
